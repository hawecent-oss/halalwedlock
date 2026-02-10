/**
 * Hawescent AI Agent Service Hook
 * 
 * Encapsulates the logic for:
 * 1. Matching & Sorting (Religious practice, age, location)
 * 2. Registration Handling (Validation & Sorting)
 * 3. Communication Guidelines (Islamic language, polite responses)
 */

import { useState } from 'react';

export const useHawescentAI = () => {
    const [matchingResults, setMatchingResults] = useState([]);

    // Detailed scoring for UI transparency
    const calculateScore = (user, other) => {
        if (user.gender === other.gender) return { total: 0 };

        const sectMatch = user.sect === other.sect;
        const practiceMatch = user.level_of_practice === other.level_of_practice;
        const maritalMatch = user.marital_status === 'single' ? other.marital_status === 'single' : true;
        const ageDiff = Math.abs(user.age - other.age);
        const ageMatch = ageDiff <= 7;

        let totalScore = 0;
        const breakdown = {
            sect: sectMatch ? 40 : 0,
            practice: practiceMatch ? 30 : 0,
            status: maritalMatch ? 20 : 0,
            age: ageMatch ? 10 : 0
        };

        totalScore = breakdown.sect + breakdown.practice + breakdown.status + breakdown.age;

        return { total: totalScore, breakdown };
    };

    const suggestMatches = (userProfile, potentialMatches) => {
        return potentialMatches
            .map(other => ({
                ...other,
                matchData: calculateScore(userProfile, other)
            }))
            .filter(item => item.matchData.total >= 70)
            .sort((a, b) => b.matchData.total - a.matchData.total);
    };

    const validateRegistration = (data) => {
        // Flag incomplete or suspicious entries (Master Prompt Section 1)
        if (data.age < 18) return { valid: false, message: "Users must be at least 18 years old." };
        if (!data.fullName || !data.levelOfPractice) return { valid: false, message: "Required fields missing." };
        return { valid: true };
    };

    const getIslamicResponse = (type) => {
        const responses = {
            welcome: "Assalamualaikum. Welcome to Hawescent. We are honored to assist you on this sacred journey.",
            pending: "JazakAllah Khair for your patience. Our admin team is currently reviewing your profile to ensure Shariah compliance.",
            match_found: "InshaAllah, we have found a potential compatible match that aligns with your religious values."
        };
        return responses[type] || "";
    };

    return {
        suggestMatches,
        validateRegistration,
        getIslamicResponse,
        matchingResults
    };
};
