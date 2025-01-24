import NoiseEffect from "./NoiseEffect";
import Parallax from "./Parallax";

interface BannerComponentProps {
  mode: "prallax" | "noise";
}

const BannerComponent = ({ mode }: BannerComponentProps) => {
  if (mode === "prallax") {
    return <Parallax />;
  } else if (mode === "noise") {
    return <NoiseEffect />;
  }
};

export default BannerComponent;
