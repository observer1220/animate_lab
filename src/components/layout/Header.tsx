import { useEffect, useRef, useState } from "react";
import logoSVG from "../../assets/img/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";

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
        <Link to="/" className="o-header__logo">
          <img src={logoSVG} alt="logo" />
        </Link>
        <nav className="o-header__nav">
          <ul className="o-header__nav-list">
            <li>
              <Link to="/" rel="noopener noreferrer nofollow">
                Location
              </Link>
            </li>
            <li>
              <Link to="program" rel="noopener noreferrer nofollow">
                Program
              </Link>
            </li>
            <li>
              <Link to="/" rel="noopener noreferrer nofollow">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
