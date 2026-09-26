import { useEffect } from 'react';
import { sendHeartbeat } from './api';

export function useHeartbeat(intervalMs = 60000) {
    useEffect(() => {
        const runHeartbeat = async () => {
            try {
                await sendHeartbeat();

            } catch (error) {
                console.error('Send heartbeat request failed:', error.message);
            }
        };

        runHeartbeat();

        const intervalId = setInterval(runHeartbeat, intervalMs);

        return () => clearInterval(intervalId);
    }, [intervalMs]);
}