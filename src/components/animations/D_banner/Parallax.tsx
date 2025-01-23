import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Parallax.css";

interface ParallaxPartOptions {
  strength: number;
}

class ParallaxPart {
  private el: HTMLElement;
  private options: ParallaxPartOptions;

  constructor(el: HTMLElement, options: Partial<ParallaxPartOptions> = {}) {
    this.el = el;
    this.options = {
      strength: parseFloat(el.dataset.parallaxStrength || "10"),
      ...options,
    };
  }

  update(x: number, y: number) {
    const { strength } = this.options;
    this.el.style.transform = `translate3d(${-x * strength}px, ${
      -y * strength
    }px, 0)`;
  }
}

/** 主要動態 */
const Parallax: React.FC = () => {
  const partsRef = useRef<ParallaxPart[]>([]);
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

    partsRef.current.forEach((part) => {
      part.update(lerpMouse.current.x, lerpMouse.current.y);
    });
  };

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-parallax]");

    elements.forEach((el) => {
      el.style.display = "block";
      partsRef.current.push(new ParallaxPart(el));
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
      <div>
        <img
          src="./src/assets/img/banner-1.png"
          alt="b"
          data-parallax
          data-parallax-strength="25"
        />
      </div>
      <div>
        <img
          src="./src/assets/img/banner-2.png"
          alt="a"
          data-parallax
          data-parallax-strength="15"
        />
      </div>
      <div>
        <img
          src="./src/assets/img/banner-3.png"
          alt="c"
          data-parallax
          data-parallax-strength="-25"
        />
      </div>
    </div>
  );
};

export default Parallax;
