import { PerformanceMonitor } from "@react-three/drei";

export const SceneConfig = ({ setDpr, setQuality }) => (
  <PerformanceMonitor
    onIncline={() => {
      setDpr(2);
      setQuality("ultra");
    }}
    onDecline={() => {
      setDpr(1);
      setQuality("low");
    }}
    flipflops={3}
    onFallback={() => {
      setDpr(1);
      setQuality("baseline");
    }}
  />
);
