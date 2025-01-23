import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

// 模擬 Route 類別和相關方法
class Route {
  private beforeRouteChangeCallbacks: Array<
    (from: string, to: string, next: () => void) => void
  > = [];
  private afterRouteChangeCallbacks: Array<(from: string, to: string) => void> =
    [];

  on(event: "beforeRouteChange" | "afterRouteChange", callback: any) {
    if (event === "beforeRouteChange")
      this.beforeRouteChangeCallbacks.push(callback);
    if (event === "afterRouteChange")
      this.afterRouteChangeCallbacks.push(callback);
  }

  async to(href: string, navigate: (path: string) => void) {
    const from = window.location.pathname;
    let nextCalled = false;
    const next = () => (nextCalled = true);

    for (const callback of this.beforeRouteChangeCallbacks) {
      await callback(from, href, next);
      if (!nextCalled) return; // 如果 next 未被呼叫，中止導航
    }

    navigate(href);

    for (const callback of this.afterRouteChangeCallbacks) {
      callback(from, href);
    }
  }
}

// 建立 route 實例
const route = new Route();

// 模擬 banner 和 leave 邏輯
const banner = {
  stop: () => console.log("Banner stopped"),
  render: () => console.log("Banner rendered"),
};

const leave = {
  startTransition: async () => {
    console.log("Transition started");
    return new Promise((resolve) => setTimeout(resolve, 500)); // 模擬動畫效果
  },
  endTransition: () => console.log("Transition ended"),
};

const scrollEffect = {
  refresh: () => console.log("Scroll effect refreshed"),
};

// React Header 元件
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 註冊 Route 事件
    route.on(
      "beforeRouteChange",
      async (from: any, to: any, next: () => void) => {
        console.log(`Before route change: from ${from} to ${to}`);
        banner.stop();
        await leave.startTransition();
        next();
      }
    );

    route.on("afterRouteChange", (from: any, to: string) => {
      console.log(`After route change: from ${from} to ${to}`);
      if (to === "index") {
        banner.render();
      }
      scrollEffect.refresh();
      leave.endTransition();
    });
  }, []);

  useEffect(() => {
    // 監聽自定義 data-href 的點擊事件
    const elements = document.querySelectorAll("[data-href]");
    elements.forEach((el) => {
      const { href } = (el as HTMLElement).dataset;
      if (href) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          route.to(href, navigate);
        });
      }
    });

    return () => {
      // 清除事件監聽器
      elements.forEach((el) => {
        const { href } = (el as HTMLElement).dataset;
        if (href) {
          el.removeEventListener("click", (e) => {
            e.preventDefault();
            route.to(href, navigate);
          });
        }
      });
    };
  }, [navigate]);

  return (
    <header className="o-header">
      <div data-href="/" className="o-header__logo">
        <img src="./src/assets/img/logo.svg" alt="logo" />
      </div>
      <nav className="o-header__nav">
        <ul className="o-header__nav-list">
          <li>
            <a href="/" rel="noopener noreferrer nofollow">
              Location
            </a>
          </li>
          <li>
            <a href="program" rel="noopener noreferrer nofollow">
              Program
            </a>
          </li>
          <li>
            <a href="/" rel="noopener noreferrer nofollow">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
