import { useEffect } from 'react';
import { sendHeartbeat } from './api';

export function useHeartbeat(intervalMs = 60000) {
    useEffect(() => {
        const startHeartbeat = async () => {
            try {
                await sendHeartbeat();

            } catch (error) {               
                console.error('Send heartbeat request failed:', error.message);
            }
        };

        startHeartbeat();

        const intervalId = setInterval(startHeartbeat, intervalMs);

        return () => clearInterval(intervalId);
    }, [intervalMs]);
}