/**
 * n8n Integration Utility
 * 
 * Used to send registration data and alerts to n8n workflows
 * as specified in the Master Prompt Section 3 & 4.
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

export const submitToN8N = async (type, data) => {
    if (!N8N_WEBHOOK_URL) {
        console.warn('n8n Webhook URL not configured. Submitting locally (mock).');
        return { success: true, message: 'Mock submission successful' };
    }

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type, // 'registration', 'match_found', 'admin_alert'
                timestamp: new Date().toISOString(),
                payload: data
            })
        });

        return await response.json();
    } catch (error) {
        console.error('n8n Submission Error:', error);
        return { success: false, error };
    }
};
