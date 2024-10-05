import React, { useEffect } from "react";

interface TimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ({ timer, setTimer }) => {
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, setTimer]);

  return (
    <div className="text-xl font-semibold text-center">Time Left: {timer}s</div>
  );
};

export default Timer;
