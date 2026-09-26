import React, { useEffect, useRef } from 'react';

interface SnowEffectProps {
  enabled: boolean;
}

export const SnowEffect: React.FC<SnowEffectProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const flakeCount = Math.min(65, Math.floor(width / 22));
    const flakes: Array<{
      x: number;
      y: number;
      radius: number;
      density: number;
      speed: number;
      opacity: number;
      swing: number;
      swingSpeed: number;
    }> = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1,
        density: Math.random() * flakeCount,
        speed: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.6 + 0.25,
        swing: 0,
        swingSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        // Update movement
        f.swing += f.swingSpeed;
        f.y += f.speed;
        f.x += Math.sin(f.swing) * 0.6;

        // Reset if reached bottom or edges
        if (f.y > height + 5) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) f.x = -5;
        if (f.x < -5) f.x = width + 5;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
      aria-hidden="true"
    />
  );
};
