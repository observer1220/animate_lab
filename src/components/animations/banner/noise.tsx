import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import banner1 from "../../../assets/img/banner-1.png";
import banner2 from "../../../assets/img/banner-2.png";
import banner3 from "../../../assets/img/banner-3.png";

// interface NoiseProps {
//   el: HTMLElement;
// }

const Noise: React.FC = () => {
  const el = document.querySelector(".m-banner");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const reqRendersRef = useRef<(() => void)[]>([]);
  const resizesRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    const init = async () => {
      if (!containerRef.current) return;

      // Initialize WebGL renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Initialize scene and camera
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const aspect = window.innerWidth / window.innerHeight;
      const camera = new THREE.OrthographicCamera(
        -aspect,
        aspect,
        1,
        -1,
        0.1,
        1000
      );
      camera.position.z = 2;
      cameraRef.current = camera;

      createShaderSketch();

      const animate = (time: number) => {
        reqRendersRef.current.forEach((fn) => fn());
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    const createShaderSketch = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const { width: vpWidth, height: vpHeight } =
        rendererRef.current.domElement;
      // console.log(el.dataset);

      const { noiseStrength, noiseSpeed } = (
        document.querySelector(".m-banner") as HTMLElement
      ).dataset;

      const texture = new THREE.Texture(); // Replace with actual texture resource

      const uniforms = {
        uResolution: { value: new THREE.Vector2(vpWidth, vpHeight) },
        uTime: { value: 0 },
        uTexture: { value: texture },
        uTextureRatio: {
          value: texture.image ? texture.image.width / texture.image.height : 1,
        },
        uStrength: { value: Number(noiseStrength) || 1 },
        uSpeed: { value: Number(noiseSpeed) || 1 },
      };

      // const geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64);
      const geometry = new THREE.BufferGeometry();

      const material = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float uTime;
          uniform float uStrength;
          uniform float uSpeed;

          varying vec2 vUv;

          vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);

            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);

            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

            i = mod(i, 289.0);
            vec4 p = permute(
              permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
              i.x + vec4(0.0, i1.x, i2.x, 1.0)
            );

            vec4 j = p - 49.0 * floor(p * (1.0 / 7.0) * (1.0 / 7.0));
            vec4 x_ = floor(j * (1.0 / 7.0));
            vec4 y_ = floor(j - 7.0 * x_);

            vec4 x = x_ * (1.0 / 7.0) + (1.0 / 14.0);
            vec4 y = y_ * (1.0 / 7.0) + (1.0 / 14.0);
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);

            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);

            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }

          void main() {
            vec3 pos = position.xyz;
            float n = snoise(vec3(pos.xy * 3.0, uTime / 2.0 * uSpeed)) * 0.02 * uStrength;
            pos += n;
            vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
            vec4 modelViewPosition = viewMatrix * modelPosition;
            vec4 projectionPosition = projectionMatrix * modelViewPosition;

            gl_Position = projectionPosition;
            vUv = uv;
          }
        `,
        fragmentShader: `
          uniform float uTextureRatio;
          uniform vec2 uResolution;
          uniform sampler2D uTexture;

          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            vec4 finalColor = texture2D(uTexture, uv);
            gl_FragColor = finalColor;
          }
        `,
        uniforms,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });

      const planeSketch = new THREE.Mesh(geometry, material);
      planeSketch.scale.set(1, 1, 1);
      sceneRef.current.add(planeSketch);

      reqRendersRef.current.push(() => {
        uniforms.uTime.value += 0.05;
      });

      resizesRef.current.push(() => {
        const { width: vpWidth, height: vpHeight } =
          rendererRef.current!.domElement;
        uniforms.uResolution.value = new THREE.Vector2(vpWidth, vpHeight);
        planeSketch.scale.set(1, 1, 1);
      });
    };

    init();

    const handleResize = () => {
      if (!rendererRef.current) return;
      const renderer = rendererRef.current;
      renderer.setSize(window.innerWidth, window.innerHeight);
      resizesRef.current.forEach((fn) => fn());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [el]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <div
        className="m-banner"
        data-noise-strength="0.5"
        data-noise-speed="0.5"
      >
        <div>
          <img
            src={banner1}
            alt="b"
            data-parallax
            data-parallax-strength="25"
          />
        </div>
        <div>
          <img
            src={banner2}
            alt="a"
            data-parallax
            data-parallax-strength="15"
          />
        </div>
        <div>
          <img
            src={banner3}
            alt="c"
            data-parallax
            data-parallax-strength="-25"
          />
        </div>
      </div>
    </div>
  );
};

export default Noise;
