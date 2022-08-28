import React from "react";
import { gsap } from "gsap";

interface ScreenCoverProps {
  onComplete?: () => void;
}

const ScreenCover: React.FC<ScreenCoverProps> = (
  props: ScreenCoverProps
): React.ReactElement => {
  const { onComplete } = props;
  const screenCoverRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  React.useEffect((): void => {
    gsap.to(screenCoverRef.current, {
      opacity: 1,
      repeat: 3,
      yoyo: true,
      duration: 0.4,
      onComplete: (): void => {
        gsap.to(screenCoverRef.current, {
          opacity: 1,
          duration: 0.4,
        });
        onComplete && onComplete();
      },
    });
  }, []);

  return (
    <div
      ref={screenCoverRef}
      className="inset-0 absolute pointer-events-none opacity-0 bg-black"
    />
  );
};

export default ScreenCover;
