import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingLogo from "./LoadingLogo";
import LoadingProgress from "./LoadingProgress";

interface LoadingEffectProps {
  mode: "logo" | "progress";
  children: React.ReactNode;
}

const LoadingEffect = ({ mode, children }: LoadingEffectProps) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // 模擬 0.5 秒載入
    return () => clearTimeout(timeout);
  }, [location]);

  return loading ? (
    <div className="loading-overlay">
      {mode === "logo" ? (
        <LoadingLogo minTime={1000} fakeProgress={80}>
          {children}
        </LoadingLogo>
      ) : (
        <LoadingProgress minTime={1000} fakeProgress={80}>
          {children}
        </LoadingProgress>
      )}
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingEffect;
