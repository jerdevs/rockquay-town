import React from "react";
import { gsap } from "gsap";

interface ScreenCoverProps {
  repeat?: number;
  duration?: number;
  yoyo?: boolean;
  onComplete?: () => void;
}

const ScreenCover: React.FC<ScreenCoverProps> = (
  props: ScreenCoverProps
): React.ReactElement => {
  const { repeat = 0, yoyo = false, duration = 0.4, onComplete } = props;
  const screenCoverRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  React.useEffect((): void => {
    gsap.to(screenCoverRef.current, {
      opacity: 1,
      repeat,
      yoyo,
      duration,
      onComplete: (): void => {
        gsap.to(screenCoverRef.current, {
          opacity: 1,
          duration: 0.4,
        });
        onComplete && onComplete();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={screenCoverRef}
      className="inset-0 absolute pointer-events-none opacity-0 bg-black z-10"
    />
  );
};

export default ScreenCover;
