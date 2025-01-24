import { useEffect, useRef, useState } from "react";
import "./Header.css";

interface HeaderProps {
  mode: "underline" | "block";
}

// React Header 元件 + 回饋動態
const Header = ({ mode }: HeaderProps) => {
  const [className, setClassName] = useState(`-${mode}`);
  const layoutRef = useRef<HTMLDivElement>(null);

  const handleToggleClass = () => {
    const colors = ["#40587c", "#e2ae4a", "#5a7c40"];
    if (layoutRef.current) {
      colors.forEach((color, i) => {
        layoutRef.current?.style.setProperty(`--color-${i + 1}`, color);
      });
    }
    setClassName(`-${mode}`);
  };

  useEffect(() => {
    handleToggleClass();
  }, []);

  return (
    <div className={className} ref={layoutRef}>
      <header className="o-header">
        <a href="/" className="o-header__logo">
          <img src="./src/assets/img/logo.svg" alt="logo" />
        </a>
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
    </div>
  );
};

export default Header;
