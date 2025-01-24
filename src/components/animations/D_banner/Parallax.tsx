import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Parallax.css";
import parallaxList from "../../../data/parallax";

const updateParallax = (
  el: HTMLElement,
  strength: number,
  x: number,
  y: number
) => {
  el.style.transform = `translate3d(${-x * strength}px, ${-y * strength}px, 0)`;
};

const Parallax: React.FC = () => {
  const partsRef = useRef<HTMLElement[]>([]);
  const position = useRef(new THREE.Vector2());
  const lerpMouse = useRef(new THREE.Vector2());
  const reqID = useRef<number | null>(null);

  const move = (e: MouseEvent | TouchEvent) => {
    let clientX: number, clientY: number;

    if (e.type === "touchmove" && "touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    position.current.set(x, y);
  };

  const render = () => {
    reqID.current = window.requestAnimationFrame(render);
    lerpMouse.current.lerp(position.current, 0.1);

    partsRef.current.forEach((el) => {
      const strength = parseFloat(el.dataset.parallaxStrength || "10");
      updateParallax(el, strength, lerpMouse.current.x, lerpMouse.current.y);
    });
  };

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-parallax]");

    elements.forEach((el) => {
      el.style.display = "block";
      partsRef.current.push(el);
    });

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);

    render();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      if (reqID.current) {
        window.cancelAnimationFrame(reqID.current);
      }
    };
  }, []);

  return (
    <div className="m-banner" data-noise-strength="0.5" data-noise-speed="0.5">
      {parallaxList.map((item) => (
        <div key={item.alt}>
          <img
            key={item.alt}
            src={item.src}
            alt={item.alt}
            data-parallax
            data-parallax-strength={item.strength}
          />
        </div>
      ))}
    </div>
  );
};

export default Parallax;
