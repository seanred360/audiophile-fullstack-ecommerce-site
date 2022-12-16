import { useState, useEffect } from "react";

const FadeAnimator = ({ children }) => {
  const fadeOutClass = "opacity-0 transition ease delay-300";
  const fadeInClass = "opacity-1 transition ease delay-300";
  const [fadeState, setFadeState] = useState(fadeOutClass);

  useEffect(() => {
    if (fadeState === fadeOutClass) {
      setFadeState(fadeOutClass);
    } else {
      setFadeState(fadeInClass);
    }
  }, [fadeState]);
  return <div className={fadeState}>{children}</div>;
};

export default FadeAnimator;
