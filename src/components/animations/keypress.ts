import { useEffect, useState } from "react";

type KeypressProps = {
  allowKeys: (string | string[])[];
};

const useKeypress = ({ allowKeys }: KeypressProps) => {
  const [pressKeys, setPressKeys] = useState<Set<string>>(new Set());

  const keypressHandler = (e: KeyboardEvent) => {
    const pressKey = e.key.toLowerCase();
    setPressKeys((prev) => new Set(prev.add(pressKey)));
  };

  const keyupHandler = (e: KeyboardEvent) => {
    const pressKey = e.key.toLowerCase();
    setPressKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(pressKey);
      return newSet;
    });
  };

  const checkActive = (): boolean => {
    return allowKeys.some((key) => {
      if (Array.isArray(key)) {
        return key.every((k) => pressKeys.has(k.toLowerCase()));
      }
      return pressKeys.has(key.toLowerCase());
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", keypressHandler);
    window.addEventListener("keyup", keyupHandler);

    return () => {
      window.removeEventListener("keydown", keypressHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return { isActive: checkActive() };
};

/** 設備動態 */
const KeypressComponent: React.FC<KeypressProps> = ({ allowKeys }) => {
  const { isActive } = useKeypress({ allowKeys });

  useEffect(() => {
    const el = document.querySelector(".page-layout") as HTMLElement;
    if (el) {
      el.style.filter = isActive ? "grayscale(1) brightness(0.4)" : "none";
    }
  }, [isActive]);

  return null;
};

export default KeypressComponent;
