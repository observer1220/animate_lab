import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface LineOptions {
  counts: number;
  life: number;
  colors: string[];
}

interface Line {
  p: THREE.Vector2;
  s: number;
  t: number;
  tt: number;
  ts: number;
  c: CanvasGradient;
  angle: number;
}

interface Circle {
  p: THREE.Vector2;
  s: number;
  t: number;
  tt: number;
  ts: number;
  c: string;
}

const LineEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const options: LineOptions = {
    counts: 4,
    life: 200,
    colors: ["#dddddd"],
  };
  const lines: Line[] = [];
  const circles: Circle[] = [];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createLines = (x: number, y: number) => {
      const { counts, life, colors } = options;

      for (let i = 0; i < counts; i++) {
        const angle = i * ((Math.PI * 2) / counts);
        const gradient = ctx.createLinearGradient(0, 0, 80, 0);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, colors[(Math.random() * colors.length) >> 0]);

        lines.push({
          p: new THREE.Vector2(x, y),
          s: 100,
          t: life,
          tt: life,
          ts: 15,
          c: gradient,
          angle,
        });
      }
    };

    const createCircle = (x: number, y: number) => {
      const { life, colors } = options;

      circles.push({
        p: new THREE.Vector2(x, y),
        s: 40,
        t: life,
        tt: life,
        ts: 25,
        c: colors[(Math.random() * colors.length) >> 0],
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < lines.length; i++) {
        const { p, s, t, tt, ts, c, angle } = lines[i];

        const progress = 1 - t / tt;
        const size = s * progress;
        lines[i].angle += 0.03;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.fillStyle = c;
        if (progress > 0.5) {
          ctx.fillRect(s / 2, 0, -s + size, 0.5);
        } else {
          ctx.fillRect(0, 0, size, 0.5);
        }
        ctx.restore();

        lines[i].t = t - ts;

        if (t < ts) {
          lines.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < circles.length; i++) {
        const { p, s, t, tt, ts, c } = circles[i];

        const progress = t / tt;
        const size = s * progress;

        ctx.strokeStyle = c + "66";
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.arc(p.x, p.y, s - size / 2, 0, 2 * Math.PI);
        ctx.stroke();

        circles[i].t = t - ts;

        if (t < ts) {
          circles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(render);
    };

    const handleClick = (e: MouseEvent) => {
      createLines(e.clientX, e.clientY);
      // createCircle(e.clientX, e.clientY);
    };

    canvas.addEventListener("click", handleClick);
    render();

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
    />
  );
};

export default LineEffect;
