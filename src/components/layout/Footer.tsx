import styled from "styled-components";

const FooterContainer = styled.footer`
  position: absolute;
  left: 65px;
  right: 65px;
  bottom: 0;
  padding: 30px 0;
  pointer-events: none;

  &::before {
    width: 135vmax;
    height: 47.5vmax;
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -45px);
    background-image: linear-gradient(
      180deg,
      #eaeaea 0%,
      rgba(234, 234, 234, 0) 18.13%
    );
    border-radius: 50%;
    z-index: -1;
    transition: opacity 0.6s 0.5s, transform 0.6s 0.5s;
  }

  > * {
    pointer-events: all;
  }

  @media (max-width: 1199.98px) {
    padding: 10px 0;
    left: 25px;
    right: 25px;
  }
`;

const FooterMain = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 50px;

    &:last-of-type {
      @media (max-width: 1199.98px) {
        display: none;
      }
    }
  }

  > * {
    transition: opacity 0.6s, transform 0.6s;

    &:nth-of-type(1) {
      transition-delay: 0.9s;
    }
    &:nth-of-type(2) {
      transition-delay: 1s;
    }
    &:nth-of-type(3) {
      transition-delay: 1.1s;
    }
  }

  @media (max-width: 1199.98px) {
    justify-content: center;

    p {
      margin-right: 0;
    }
  }
`;

const FooterLine = styled.div`
  position: absolute;
  right: 90px;
  top: 50%;
  transform: translate(0, -50%);
  width: 40vmax;
  pointer-events: none;

  &::before {
    content: "";
    display: block;
    padding-bottom: 59.4%;
  }

  > svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 1199.98px) {
    display: none;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterMain>
        <p>Block Studio©2021 Copyright. All Rights Reserved.</p>
        <p>Contact Us - info@blockstudio.tw</p>
        <FooterLine>
          <svg
            viewBox="0 0 594 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="594"
              y1="5.25"
              x2="233"
              y2="5.25"
              stroke="#40587C"
              strokeWidth="0.5"
            />
            <line
              x1="114"
              y1="5.25"
              y2="5.25"
              stroke="#40587C"
              strokeWidth="0.5"
            />
            <circle cx="178" cy="5" r="5" fill="#40587C" />
          </svg>
        </FooterLine>
      </FooterMain>
    </FooterContainer>
  );
};

export default Footer;
