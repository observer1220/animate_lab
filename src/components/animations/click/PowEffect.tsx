import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Particle {
  p: THREE.Vector2;
  v: THREE.Vector2;
  a: THREE.Vector2;
  s: number;
  t: number;
  tt: number;
  ts: number;
  c: string;
}

interface Circle {
  p: THREE.Vector2;
  v: number;
  a: number;
  s: number;
  t: number;
  tt: number;
  ts: number;
  c: string;
}

interface PowOptions {
  counts?: number;
  velocity?: number;
  acceleration?: number;
  life?: number;
  colors?: string[];
}

/** 點擊動態 */
const PowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const options: PowOptions = {
    counts: 30,
    velocity: 1,
    acceleration: 2,
    life: 200,
    colors: ["#40587c", "#5a7c40", "#e2ae4a", "#dddddd"],
  };
  const particles: Particle[] = [];
  const circles: Circle[] = [];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createParticles = (x: number, y: number) => {
      const {
        counts = 30,
        velocity = 1,
        acceleration = 2,
        life = 200,
        colors = ["#40587c", "#5a7c40", "#e2ae4a", "#dddddd"],
      } = options;

      for (let i = 0; i < counts; i++) {
        particles.push({
          p: new THREE.Vector2(x, y),
          v: new THREE.Vector2(
            (Math.random() - 0.5) * velocity,
            (Math.random() - 0.5) * velocity
          ),
          a: new THREE.Vector2(
            (Math.random() - 0.5) * acceleration,
            (Math.random() - 0.5) * acceleration
          ),
          s: Math.random() * 40,
          t: life,
          tt: life,
          ts: Math.random() * 5 + 5,
          c: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const createCircle = (x: number, y: number) => {
      const {
        velocity = 1,
        acceleration = 2,
        life = 200,
        colors = ["#40587c", "#5a7c40", "#e2ae4a", "#dddddd"],
      } = options;

      circles.push({
        p: new THREE.Vector2(x, y),
        v: Math.random() * 6 + velocity,
        a: Math.random() * 6 + acceleration,
        s: 0,
        t: life,
        tt: life,
        ts: Math.random() * 5 + 7,
        c: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const { p, v, a, s, t, tt, ts, c } = particle;
        v.add(a);
        p.add(v);
        v.multiplyScalar(0.97);
        a.multiplyScalar(0.97);

        const size = s * (t / tt);

        ctx.fillStyle = `${c}cc`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, 2 * Math.PI);
        ctx.fill();

        particle.t -= ts;

        if (particle.t < ts) {
          particles.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        const { p, s, t, tt, ts, c } = circle;
        circle.v += circle.a;
        circle.s += circle.v;
        circle.v *= 0.97;
        circle.a *= 0.97;

        ctx.globalAlpha = t / tt;
        ctx.strokeStyle = c;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, 2 * Math.PI);
        ctx.stroke();

        circle.t -= ts;

        if (circle.t < ts) {
          circles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(render);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      createParticles(e.clientX - rect.left, e.clientY - rect.top);
      createCircle(e.clientX - rect.left, e.clientY - rect.top);
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

export default PowEffect;
