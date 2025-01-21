import { getDeviceType } from "../../../utils/helper";
import { Cursor } from "./Cursor";
import gsap from "gsap";

interface ScaleOptions {
  size?: number;
  activeScale?: number;
}

class Scale extends Cursor {
  private options: ScaleOptions;
  private cursorSize: number;

  constructor(el: Element, options: ScaleOptions = {}) {
    super(el);

    if (el instanceof Element) {
      this.options = {
        size: 10,
        activeScale: 4,
        ...options,
      };
      this.cursorSize = this.options.size!; // 使用非空斷言運算子

      const deviceType = getDeviceType(navigator.userAgent);
      if (deviceType === "Desktop") {
        this.createCursor();
      }
    } else {
      throw new Error("Invalid element provided");
    }
  }

  scaleTransitionCursor(): void {
    const { size, activeScale } = this.options;

    if (this.isHover) {
      gsap.to(this, {
        cursorSize: size! * activeScale!,
      });
      return;
    }
    gsap.to(this, {
      cursorSize: size!,
    });
  }

  private createCursor(): void {
    this.reqRenders.push((t: number) => {
      const { width, height } = this.viewport;
      const { x, y } = this.mouse;

      this.ctx.fillStyle = "#dddddd99";
      this.ctx.beginPath();
      this.ctx.arc(
        (x * width) / 2,
        (y * height) / 2,
        this.cursorSize,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    });
  }
}

export default Scale;
