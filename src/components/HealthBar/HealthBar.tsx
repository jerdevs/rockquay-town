import React from "react";
import { gsap } from "gsap";

interface HealthBarProps {
  name: string;
  positionClassName?: string;
  health: number;
}

const HealthBar: React.FC<HealthBarProps> = (
  props: HealthBarProps
): React.ReactElement => {
  const { name, positionClassName, health } = props;
  const healthBarRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  React.useEffect((): void => {
    gsap.to(healthBarRef.current, {
      width: `${health}%`,
    });
  }, [health]);

  return (
    <div
      className={`p-3 absolute bg-white w-64 ${positionClassName} border-solid border-4 border-black`}
    >
      <div>{name}</div>
      <div className="relative">
        <div className="h-1.5 bg-slate-300 mt-2.5" />
        <div
          ref={healthBarRef}
          className="h-1.5 bg-green-700 top-0 left-0 right-0 absolute"
        />
      </div>
    </div>
  );
};

export default HealthBar;
