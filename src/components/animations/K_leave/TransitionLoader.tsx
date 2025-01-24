import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import WaveTransition from "./WaveTransition";
import RectTransition from "./RectTransition";
import "./Leave.css";

interface TransitionLoaderProps {
  mode: "wave" | "rect";
}

const TransitionLoader: React.FC<TransitionLoaderProps> = ({ mode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 啟動動畫
    setIsAnimating(true);

    // 模擬動畫結束 (設定延遲，與動畫時間一致)
    const timeout = setTimeout(() => setIsAnimating(false), 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <AnimatePresence>
      {isAnimating && mode == "wave" ? <WaveTransition /> : <RectTransition />}
    </AnimatePresence>
  );
};

export default TransitionLoader;
