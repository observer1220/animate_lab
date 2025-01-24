import "./Footer.css";

const Footer = () => {
  return (
    <footer className="o-footer">
      <div className="o-footer-main">
        <p>Block Studio©2021 Copyright. All Rights Reserved.</p>
        <p>Contact Us - info@blockstudio.tw</p>
        <div className="o-footer-line">
          <svg
            viewBox="0 0 594 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              data-stroke
              x1="594"
              y1="5.25"
              x2="233"
              y2="5.25"
              stroke="#40587C"
              strokeWidth="0.5"
            />
            <line
              data-stroke
              x1="114"
              y1="5.25"
              y2="5.25"
              stroke="#40587C"
              strokeWidth="0.5"
            />
            <circle cx="178" cy="5" r="5" fill="#40587C" />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
