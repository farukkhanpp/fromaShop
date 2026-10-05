import { useEffect, useState } from "react";


export default function SplashScreen({ onDone, duration = 2200 }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const hide = setTimeout(() => setLeaving(true), duration);
    const done = setTimeout(() => onDone?.(), duration + 500);
    return () => {
      clearTimeout(hide);
      clearTimeout(done);
    };
  }, [duration, onDone]);

  return (
    <div
      className={`splash ${leaving ? "splash-leave" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="splash-inner">
        <div className="splash-logo">
          <span className="splash-mark">f.</span>
          <span className="splash-word">forma</span>
          <span className="splash-dot">.</span>
        </div>
        <p className="splash-tag">Everyday</p>
        <div className="splash-bar">
          <span style={{ animationDuration: `${duration}ms` }} />
        </div>
        <div className="splash-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
