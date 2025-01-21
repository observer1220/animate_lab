import * as THREE from "three";

interface Viewport {
  width: number;
  height: number;
}

interface Effect {
  addEffect: (x: number, y: number) => void;
  update?: () => void;
}

abstract class Sketch {
  protected ctx: any;
  protected viewport: Viewport;
  protected reqRenders: ((t: number) => void)[];

  constructor(el: any) {
    // Initialize base class properties
    this.ctx = el.getContext("2d") as CanvasRenderingContext2D;
    this.viewport = { width: el.clientWidth, height: el.clientHeight };
    this.reqRenders = [];
  }
}

class Cursor extends Sketch {
  public mouse: THREE.Vector2;
  public isHover: boolean;
  private effect?: Effect;
  private transitionCursor?: () => void;

  constructor(el: Element) {
    super(el);
    this.mouse = new THREE.Vector2();
    this.isHover = false;

    this.mousemove = this.mousemove.bind(this);
    window.addEventListener("mousemove", this.mousemove);

    this.update();
  }

  addClickEffect(
    EffectClass?: new (ctx: CanvasRenderingContext2D) => Effect
  ): void {

    if (EffectClass) {
      this.click = this.click.bind(this);
      window.addEventListener("click", this.click);

      this.effect = new EffectClass(this.ctx);
    }
  }

  private mousemove(event: MouseEvent): void {
    const { clientX, clientY } = event;
    const { width, height } = this.viewport;
    const x = (clientX / width) * 2 - 1;
    const y = (clientY / height) * 2 - 1;
    this.mouse.set(x, y);

    const pointEl = document.elementFromPoint(clientX, clientY);
    if (pointEl) {
      const { tagName, dataset } = pointEl as HTMLElement;
      if (tagName === "A" || dataset.href) {
        if (!this.isHover) {
          this.isHover = true;
          this.transitionCursor?.();
        }
        return;
      }
    }
    if (this.isHover) {
      this.isHover = false;
      this.transitionCursor?.();
    }
  }

  private click(): void {
    if (!this.effect) return;

    const { width, height } = this.viewport;
    const { x: mx, y: my } = this.mouse;

    this.effect.addEffect((mx * width) / 2, (my * height) / 2);
  }

  private update(): void {
    this.reqRenders.push((t: number) => {
      this.effect?.update?.();
    });
  }
}

export { Cursor, Sketch };
