import React, { useEffect, useRef } from "react";

export default function Timer({ onTick }) {
  const start = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      onTick((Date.now() - start.current) / 1000);
    }, 100);
    return () => clearInterval(interval);
  }, [onTick]);

  return null;
}
