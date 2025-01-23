import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// src: "https://i.imgur.com/r92HRnX.png",
// src: "https://i.imgur.com/ywjElmy.png",
// src: "https://i.imgur.com/vvj9Eos.png",
// 尺寸 1440*768 , 去背PNG檔 , 將視覺重點在中間800*500的位子

interface NoiseProps {
  noiseStrength?: number;
  noiseSpeed?: number;
  backgroundImage?: string;
}

/** 主要動態 */
const NoiseEffect: React.FC<NoiseProps> = ({
  noiseStrength = 0.5,
  noiseSpeed = 0.5,
  backgroundImage = "https://i.imgur.com/r92HRnX.png",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<WebGLSketch | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize sketch
    sketchRef.current = new WebGLSketch(containerRef.current, {
      noiseStrength,
      noiseSpeed,
      backgroundImage,
    });

    // Cleanup
    return () => {
      if (sketchRef.current) {
        sketchRef.current.destroy();
      }
    };
  }, [noiseStrength, noiseSpeed, backgroundImage]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

// WebGLSketch class
class WebGLSketch {
  private el: HTMLElement;
  private reqRenders: ((delta: number, elapsed: number) => void)[] = [];
  private resizes: (() => void)[] = [];
  private resources: any[] = [];
  private events: { event: any; object: any; type: string }[] = [];
  private clock: THREE.Clock;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private reqID: number = 0;
  private loadStatus = {
    total: 0,
    progress: 0,
    isDone: false,
  };
  private loaderManager: THREE.LoadingManager;
  private textureLoader: THREE.TextureLoader;
  private config: {
    noiseStrength: number;
    noiseSpeed: number;
    backgroundImage: string;
  };

  constructor(
    el: HTMLElement,
    config: {
      noiseStrength: number;
      noiseSpeed: number;
      backgroundImage: string;
    }
  ) {
    this.el = el;
    this.config = config;
    this.clock = new THREE.Clock();
    this.loaderManager = new THREE.LoadingManager();

    this.loaderManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.loadStatus.total = itemsTotal;
      this.loadStatus.progress = itemsLoaded / this.loadStatus.total;
    };

    this.loaderManager.onLoad = () => {
      this.loadStatus.isDone = true;
    };

    this.textureLoader = new THREE.TextureLoader(this.loaderManager);
    this.init();
  }

  private async init() {
    await this.loadTexture(this.config.backgroundImage);
    const { width, height, aspect, dpr } = this.getViewport();

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: dpr <= 1,
      alpha: true,
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(dpr);
    this.el.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.01, 100);
    this.camera.position.set(0, 0, 3);

    this.addEvent(this.resize.bind(this), window, "resize");
    this.createShaderSketch();
    this.render();

    this.resizes.push(() => {
      if (!this.renderer || !this.camera) return;
      const { width, height, aspect } = this.getViewport();
      this.renderer.setSize(width, height);
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
    });
  }

  private async loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve) => {
      this.textureLoader.load(url, (texture) => {
        this.resources.push({
          type: "texture",
          name: "bg",
          resource: texture,
        });
        resolve(texture);
      });
    });
  }

  private createShaderSketch() {
    if (!this.scene || !this.camera) return;

    const { width: vpWidth, height: vpHeight } = this.getViewport();
    const { width, height } = this.getViewSize();
    const texture = this.resources.find((r) => r.name === "bg")?.resource;

    if (!texture) return;

    const uniforms = {
      uResolution: new THREE.Uniform(new THREE.Vector2(vpWidth, vpHeight)),
      uTime: new THREE.Uniform(0),
      uTexture: new THREE.Uniform(texture),
      uTextureRatio: new THREE.Uniform(
        texture.image.width / texture.image.height
      ),
      uStrength: new THREE.Uniform(this.config.noiseStrength),
      uSpeed: new THREE.Uniform(this.config.noiseSpeed),
    };

    const geometry = new THREE.PlaneGeometry(1, 1, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uTime;
        uniform float uStrength;
        uniform float uSpeed;

        varying vec2 vUv;

        //	Simplex 3D Noise 
        //	by Ian McEwan, Ashima Arts
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){ 
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 =   v - i + dot(i, C.xxx) ;

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );

          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1. + 3.0 * C.xxx;

          i = mod(i, 289.0 ); 
          vec4 p = permute( permute( permute( 
                      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

          float n_ = 1.0/7.0;
          vec3  ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );

          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );

          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                          dot(p2,x2), dot(p3,x3) ) );
        }

        void main(){
          vec3 pos = position.xyz;
          float n = snoise(vec3(pos.xy * 3., uTime / 2. * uSpeed)) * 0.02 * uStrength;
          pos += n;
          vec4 modelPosition = modelMatrix * vec4(pos, 1.);
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

        vec2 containUv(vec2 uv, float aspectRatio, float ratio){
          vec2 scale = vec2(1.);
          
          if(ratio > aspectRatio) {
            scale = vec2(1., ratio / aspectRatio);
          } else {
            scale = vec2(aspectRatio / ratio, 1.);
          }

          if(aspectRatio < 0.75) {
            scale *= aspectRatio;
          }

          return (uv - vec2(0.5)) * scale + vec2(0.5);
        }
        
        void main(){
          vec2 uv = containUv(vUv, uResolution.x / uResolution.y, uTextureRatio);
          vec4 final = texture2D(uTexture, uv);
          gl_FragColor = final;
        }
      `,
      uniforms,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const planeSketch = new THREE.Mesh(geometry, material);
    planeSketch.scale.set(width, height, 1);
    this.scene.add(planeSketch);

    this.reqRenders.push((d, t) => {
      uniforms.uTime.value = t;
    });

    this.resizes.push(() => {
      const { width: vpWidth, height: vpHeight } = this.getViewport();
      const { width, height } = this.getViewSize();
      uniforms.uResolution.value = new THREE.Vector2(vpWidth, vpHeight);
      planeSketch.scale.set(width, height, 1);
    });
  }

  private render = () => {
    if (!this.scene || !this.camera || !this.renderer) return;

    this.reqID = requestAnimationFrame(this.render);
    const delta = this.clock.getDelta();
    const elapsed = this.clock.elapsedTime;

    for (const render of this.reqRenders) {
      render(delta, elapsed);
    }

    this.renderer.render(this.scene, this.camera);
  };

  private resize() {
    for (const resize of this.resizes) {
      resize();
    }
  }

  private getViewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      aspect: window.innerWidth / window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    };
  }

  private getViewSize() {
    if (!this.camera) return { width: 0, height: 0, vFov: 0 };

    const distance = this.camera.position.z;
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * this.getViewport().aspect;

    return { width, height, vFov };
  }

  private addEvent(
    event: EventListener,
    object: Window | HTMLElement,
    type: string
  ) {
    const instance = { event, object, type };
    this.events.push(instance);
    object.addEventListener(type, event);
    return instance;
  }

  private removeEvents() {
    for (const { event, object, type } of this.events) {
      object.removeEventListener(type, event as EventListener);
    }
    this.events = [];
  }

  public destroy() {
    cancelAnimationFrame(this.reqID);
    this.removeEvents();

    if (this.scene) {
      this.disposeObject(this.scene);
      this.scene = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer.domElement.remove();
      this.renderer = null;
    }

    this.camera = null;
  }

  private disposeObject(obj: THREE.Object3D) {
    while (obj.children.length > 0) {
      this.disposeObject(obj.children[0]);
      obj.remove(obj.children[0]);
    }

    if (obj instanceof THREE.Mesh) {
      if (obj.geometry) {
        obj.geometry.dispose();
      }

      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => this.disposeMaterial(material));
        } else {
          this.disposeMaterial(obj.material);
        }
      }
    }
  }

  private disposeMaterial(material: THREE.Material) {
    Object.keys(material).forEach((prop) => {
      if (!(material as any)[prop]) return;
      if (
        (material as any)[prop] &&
        typeof (material as any)[prop].dispose === "function"
      ) {
        (material as any)[prop].dispose();
      }
    });
    material.dispose();
  }
}

export default NoiseEffect;
