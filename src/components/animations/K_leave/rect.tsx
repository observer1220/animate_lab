import LeaveTransition from "./leave";

export const RectTransition: React.FC = () => {
  const rectPaths = ["M0 300h300v-0H0z", "M0 0h300v336H0z"];

  return <LeaveTransition svgId="rect" svgPaths={rectPaths} />;
};
