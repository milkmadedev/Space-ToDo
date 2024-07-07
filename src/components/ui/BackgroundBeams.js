import React, { useEffect, useRef } from "react";

export const BackgroundBeams = React.memo(() => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
        });
      }
      return stars;
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.size / 2})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateStars = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      starsRef.current.forEach(star => {
        // Subtle movement based on mouse position
        const dx = (mouseX - centerX) * 0.0001;
        const dy = (mouseY - centerY) * 0.0001;

        star.x += dx;
        star.y += dy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.size = Math.max(0.5, Math.min(2, star.size + (Math.random() - 0.5) * 0.05));
      });
    };

    const animate = () => {
      updateStars();
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    starsRef.current = createStars();
    animate();

    const handleMouseMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
});

BackgroundBeams.displayName = "BackgroundBeams";