import * as THREE from "three";

interface Resource {
  type: string;
  name: string;
  src: string;
  options?: Record<string, any>;
}

interface LoadedResource {
  type: string;
  name: string;
  resource: any;
}

const defaultResources: Resource[] = [
  {
    type: "texture",
    name: "bg",
    src: "https://i.imgur.com/r92HRnX.png",
    // src: "https://i.imgur.com/ywjElmy.png",
    // src: "https://i.imgur.com/vvj9Eos.png",
    // 尺寸 1440*768 , 去背PNG檔 , 將視覺重點在中間800*500的位子
  },
];

class WebGLSketch {
  private el: HTMLElement;
  private reqRenders: Array<(delta: number, elapsedTime: number) => void> = [];
  private resizes: Array<() => void> = [];
  private resources: LoadedResource[] = [];
  private events: Array<{
    event: EventListener;
    object: EventTarget;
    type: string;
  }> = [];
  private clock: THREE.Clock = new THREE.Clock();
  private loaderManager: THREE.LoadingManager;
  private textureLoader: THREE.TextureLoader;
  private loadStatus = {
    total: 0,
    progress: 0,
    isDone: false,
  };
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private reqID?: number;

  constructor(el: HTMLElement) {
    this.el = el;
    this.loaderManager = new THREE.LoadingManager();
    this.loaderManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.loadStatus.total = itemsTotal;
      this.loadStatus.progress = itemsLoaded / this.loadStatus.total;
    };
    this.loaderManager.onLoad = () => {
      this.loadStatus.isDone = true;
    };
    this.textureLoader = new THREE.TextureLoader(this.loaderManager);
    this.render = this.render.bind(this);
  }

  async init(): Promise<void> {
    await this.loadDefaultResources();
    const { width, height, aspect, dpr } = this.viewport;

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
    this.render();

    this.resizes.push(() => {
      const { width, height, aspect } = this.viewport;
      this.renderer.setSize(width, height);
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
    });
  }

  private resize(): void {
    for (const resizeCallback of this.resizes) {
      resizeCallback();
    }
  }

  private render(): void {
    this.reqID = requestAnimationFrame(this.render);
    const delta = this.clock.getDelta();
    for (const renderCallback of this.reqRenders) {
      renderCallback(delta, this.clock.elapsedTime);
    }
  }

  stop(): void {
    if (this.reqID !== undefined) {
      cancelAnimationFrame(this.reqID);
    }
  }

  destroy(): void {
    this.stop();
    this.renderer.domElement.removeEventListener(
      "dblclick",
      null as any,
      false
    );
    this.removeEvents();
    this.disposeObject(this.scene);
    this.renderer.forceContextLoss();

    this.scene = null!;
    this.camera = null!;
    this.renderer = null!;
    while (this.el.lastChild) {
      this.el.removeChild(this.el.lastChild);
    }
  }

  private async loadDefaultResources(): Promise<void> {
    await this.addResources(defaultResources);
  }

  private async addResource(payload: Resource): Promise<any> {
    const { type, src, name, options } = payload;
    let resource: any;

    if (type === "texture") {
      resource = await this.loadTexture(src, options);
    }

    if (resource) {
      this.resources.push({ type, name: name || src, resource });
    }

    return resource;
  }

  private async addResources(payload: Resource[]): Promise<any[]> {
    const promises = payload.map((resource) => this.addResource(resource));
    return Promise.all(promises);
  }

  getResource = (() => {
    const memo: Record<string, LoadedResource | undefined> = {};
    return (
      key: string,
      type: keyof LoadedResource = "name"
    ): LoadedResource | undefined => {
      if (memo[key]) return memo[key];
      const resource = this.resources.find((r) => r[type] === key);
      memo[key] = resource;
      return resource;
    };
  })();

  getResources(
    payload: string | ((resource: LoadedResource) => boolean),
    type: keyof LoadedResource = "name"
  ): LoadedResource[] {
    if (typeof payload === "function") {
      return this.resources.filter(payload);
    }
    return this.resources.filter((resource) => resource[type] === payload);
  }

  private loadTexture(
    url: string,
    options?: Record<string, any>
  ): Promise<THREE.Texture> {
    return new Promise((resolve) => {
      this.textureLoader.load(url, (texture) => {
        if (options) {
          Object.assign(texture, options);
        }
        resolve(texture);
      });
    });
  }

  private disposeObject(obj: THREE.Object3D): void {
    while (obj.children.length > 0) {
      this.disposeObject(obj.children[0]);
      obj.remove(obj.children[0]);
    }

    if ((obj as any).geometry) {
      (obj as any).geometry.dispose();
    }

    if ((obj as any).material) {
      const material = (obj as any).material;
      if (Array.isArray(material)) {
        material.forEach((mat) => mat.dispose());
      } else {
        material.dispose();
      }
    }
  }

  private addEvent(
    event: EventListener,
    object: EventTarget,
    type: string
  ): void {
    const instance = { event, object, type };
    this.events.push(instance);
    object.addEventListener(type, event);
  }

  private removeEvent(instance: {
    event: EventListener;
    object: EventTarget;
    type: string;
  }): void {
    const { event, object, type } = instance;
    const index = this.events.indexOf(instance);
    if (index !== -1) {
      object.removeEventListener(type, event);
      this.events.splice(index, 1);
    }
  }

  private removeEvents(): void {
    while (this.events.length > 0) {
      const instance = this.events.pop()!;
      instance.object.removeEventListener(instance.type, instance.event);
    }
  }

  get viewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      aspect: window.innerWidth / window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    };
  }

  get viewSize() {
    const distance = this.camera.position.z;
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * this.viewport.aspect;
    return { width, height, vFov };
  }
}

export default WebGLSketch;
