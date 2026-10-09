import { useEffect, useState } from 'react';

export function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(
        () => window.matchMedia('(min-width: 768px)').matches,
    );

    useEffect(() => {
        const media = window.matchMedia('(min-width: 768px)');

        const handleChange = (event) => {
            setIsDesktop(event.matches);
        };

        media.addEventListener('change', handleChange);

        return () => {
            media.removeEventListener('change', handleChange);
        };
    }, []);

    return isDesktop;
}