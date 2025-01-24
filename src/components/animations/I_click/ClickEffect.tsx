import LineEffect from "./LineEffect";
import PowEffect from "./PowEffect";

interface ClickEffectProps {
  mode: "line" | "pow";
}
const ClickEffect = ({ mode }: ClickEffectProps) => {
  if (mode === "line") {
    return <LineEffect />;
  } else if (mode === "pow") {
    return <PowEffect />;
  }
};

export default ClickEffect;
