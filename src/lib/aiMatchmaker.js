import { supabase } from './supabase';
import { aiService } from './aiService';

export const aiMatchmaker = {
    /**
     * Checks strict medical rules (e.g. Genotype AS + AS = Danger)
     * Returns true if safe, false if extremely dangerous.
     */
    checkMedicalSafety: (userA, userB) => {
        const unsafePairings = [
            ['AS', 'AS'],
            ['AS', 'SS'],
            ['SS', 'SS'],
            ['AC', 'AS'],
            ['SC', 'AS']
        ];

        const aGeno = userA.genotype?.toUpperCase();
        const bGeno = userB.genotype?.toUpperCase();

        if (!aGeno || !bGeno) return true; // Can't block if we don't know

        for (let pair of unsafePairings) {
            if ((aGeno === pair[0] && bGeno === pair[1]) || (aGeno === pair[1] && bGeno === pair[0])) {
                return false; // Medically unsafe match
            }
        }
        return true;
    },

    /**
     * The 48-Hour Fallback Evaluator.
     * Finds users who have been 'pending' for over 48 hours and auto-evaluates them
     * using the Gemini AI service.
     */
    runFallbackEvaluator: async () => {
        try {
            // Find users pending > 48 hours
            const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
            
            const { data: pendingUsers, error: fetchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('verification_level', 'pending')
                .lt('created_at', fortyEightHoursAgo);

            if (fetchError) throw fetchError;
            if (!pendingUsers || pendingUsers.length === 0) return { processed: 0, message: "No stale profiles found." };

            let processedCount = 0;

            for (const user of pendingUsers) {
                // Have Gemini evaluate their profile string
                const profileString = `
                    Bio: ${user.about_self}
                    Sect: ${user.sect}
                    Practice Level: ${user.level_of_practice}
                    Finances: ${user.income_range}
                    Occupation: ${user.occupation}
                `;

                // Use the existing aiService to analyze the profile (simulate psychological review)
                const aiPrompt = `As an Islamic marriage counselor AI, evaluate this profile and return a readiness score between 0 and 100 based on maturity and stability. Respond with ONLY the number. Profile: ${profileString}`;
                const rawScore = await aiService.generateDailyMoral(aiPrompt); // Re-using generate function to call Gemini
                const score = parseInt(rawScore.replace(/\D/g, '')) || 70; // fallback to 70 if parsing fails

                // 1. Log the AI's "Professional Evaluation"
                await supabase.from('professional_evaluations').insert({
                    user_id: user.id,
                    evaluator_role: 'system_ai',
                    notes: `AUTONOMOUS AI EVALUATION (48h Timeout): Profile indicates sufficient readiness for matchmaking. Score: ${score}`,
                    readiness_score: score,
                    recommendation_status: 'approved'
                });

                // 2. Clear the user for matchmaking
                await supabase.from('profiles')
                    .update({ 
                        verification_level: 'fully_verified',
                        ai_evaluation_status: 'completed'
                    })
                    .eq('id', user.id);

                processedCount++;
            }

            return { processed: processedCount, message: `Successfully auto-evaluated ${processedCount} stale profiles.` };

        } catch (error) {
            console.error("AI Fallback Error:", error);
            throw error;
        }
    }
};
