import { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
}

export function ThreadCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const points = useRef<Point[]>([]);
    const mouse = useRef<Point>({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if ('touches' in e) {
                mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else {
                mouse.current = { x: e.clientX, y: e.clientY };
            }
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);

        // Initialize points
        for (let i = 0; i < 20; i++) {
            points.current.push({ x: 0, y: 0 });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update points (smooth trail)
            // Leader point follows mouse
            const leader = points.current[0];
            leader.x += (mouse.current.x - leader.x) * 0.2;
            leader.y += (mouse.current.y - leader.y) * 0.2;

            // Followers follow previous point
            for (let i = 1; i < points.current.length; i++) {
                const prev = points.current[i - 1];
                const curr = points.current[i];

                // Simple spring/follow
                curr.x += (prev.x - curr.x) * 0.4;
                curr.y += (prev.y - curr.y) * 0.4;
            }

            // Draw thread
            ctx.beginPath();
            ctx.moveTo(points.current[0].x, points.current[0].y);

            // Quadratic Bezier for smoothness
            for (let i = 1; i < points.current.length - 1; i++) {
                const xc = (points.current[i].x + points.current[i + 1].x) / 2;
                const yc = (points.current[i].y + points.current[i + 1].y) / 2;
                ctx.quadraticCurveTo(points.current[i].x, points.current[i].y, xc, yc);
            }
            // Connect to last point
            if (points.current.length > 2) {
                const last = points.current[points.current.length - 1];
                ctx.lineTo(last.x, last.y);
            }

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 2.5;
            // Premium light-theme indigo-purple thread trail
            ctx.strokeStyle = 'rgba(124, 58, 237, 0.45)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(124, 58, 237, 0.6)';
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
        />
    );
}
