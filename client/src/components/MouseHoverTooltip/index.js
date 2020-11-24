import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MouseHoverTooltip = ({ children }) => {
  const targetDiv = document.getElementById("hover-tooltip-layer");
  const overlayRef = React.createRef();
  const [selfCoordinates, setSelfCoordinates] = useState({
    x: -1000,
    y: -1000,
  });

  const handleMouseMove = (event) => {
    setSelfCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return function cleanup() {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return createPortal(
    <div
      ref={overlayRef}
      className="hover-tooltip"
      style={{
        position: "fixed",
        top: `${selfCoordinates.y + 10}px`,
        left: `${selfCoordinates.x + 15}px`,
        zIndex: "10000",
      }}
    >
      <div className="tooltip-content">{children}</div>
    </div>,
    targetDiv
  );
};

export default MouseHoverTooltip;
