import { getDeviceType } from "../../../utils/helper";
import { Cursor } from "./Cursor";
import gsap from "gsap";

type ColorOptions = {
  size?: number;
  color?: string;
  activeColor?: string;
};

class Color extends Cursor {
  private options: Required<ColorOptions>;
  private cursorColor: string;

  constructor(el: HTMLElement, options?: ColorOptions) {
    super(el);

    if (el instanceof HTMLElement) {
      this.options = {
        size: 10,
        color: "#dddddd99",
        activeColor: "#5a7c40cc",
        ...options,
      };
      this.cursorColor = this.options.color;

      const deviceType = getDeviceType(navigator.userAgent);
      if (deviceType === "Desktop") {
        this.createCursor();
      }
    } else {
      throw new Error("Invalid element provided to Color class.");
    }
  }

  public changeCursorColor(): void {
    const { color, activeColor } = this.options;

    if (this.isHover) {
      gsap.to(this, {
        cursorColor: activeColor,
      });
      return;
    }
    gsap.to(this, {
      cursorColor: color,
    });
  }

  private createCursor(): void {
    this.reqRenders.push((t: number) => {
      const { width, height } = this.viewport;
      const { x, y } = this.mouse;

      if (this.ctx) {
        this.ctx.fillStyle = this.cursorColor;
        this.ctx.beginPath();
        this.ctx.arc(
          (x * width) / 2,
          (y * height) / 2,
          this.options.size,
          0,
          2 * Math.PI
        );
        this.ctx.fill();
      }
    });
  }
}

export default Color;
