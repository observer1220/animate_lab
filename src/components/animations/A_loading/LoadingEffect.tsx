import LoadingLogo from "./LoadingLogo";
import LoadingProgress from "./LoadingProgress";

interface LoadingEffectProps {
  mode: "logo" | "progress";
  children: React.ReactNode;
}

const LoadingEffect = ({ mode, children }: LoadingEffectProps) => {
  return mode === "logo" ? (
    <LoadingLogo minTime={1000} fakeProgress={80}>
      {children}
    </LoadingLogo>
  ) : (
    <LoadingProgress minTime={1000} fakeProgress={80}>
      {children}
    </LoadingProgress>
  );
};

export default LoadingEffect;
