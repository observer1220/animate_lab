import BlockText from "./blockText";
import TypingText from "./typingText";

interface RunInProps {
  mode: "blockText" | "typingText";
}

/** 進場動態 */
const RunInEffect = ({ mode }: RunInProps) => {
  if (mode === "blockText") {
    return <BlockText />;
  } else if (mode === "typingText") {
    return <TypingText />;
  }
  return null;
};

export default RunInEffect;
