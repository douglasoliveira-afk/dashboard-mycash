import { useEffect, useState } from 'react';

interface CountUpProps {
    value: number;
    duration?: number;
    className?: string;
    formatter?: (value: number) => string;
}

export function CountUp({ value, duration = 800, className, formatter = (v) => v.toString() }: CountUpProps) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const startValue = 0;

        // Simple Easing (Ease Out Quad)
        const easeOutQuad = (t: number) => t * (2 - t);

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            const easedProgress = easeOutQuad(percentage);
            const currentValue = startValue + (value - startValue) * easedProgress;

            setDisplayValue(currentValue);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span className={className}>{formatter(displayValue)}</span>;
}
