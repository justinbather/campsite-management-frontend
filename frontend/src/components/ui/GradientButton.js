import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const GradientButton = (props) => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      navigate(props.clickDestination);
    }
  };

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--gradient-x", `${(x / rect.width) * 100}%`);
    button.style.setProperty("--gradient-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    button.style.setProperty("--gradient-x", "50%");
    button.style.setProperty("--gradient-y", "50%");
  };

  return (
    <button
      ref={buttonRef}
      className="btn btn-wide btn-active relative overflow-hidden bg-gradient-to-r text-base-100 border-0 hover:ring-4 ring-neutral-300"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="absolute inset-0 bg-gradient-from-mouse"
        style={{
          background: `linear-gradient(to right, ${
            props.fromColor || "#fec051"
          }, ${props.toColor || "#fd4b31"})`,
          backgroundPosition: `var(--gradient-x, 50%) var(--gradient-y, 50%)`,
          backgroundSize: "200% 200%",
          transition: "background-position 0.4s ease-out",
        }}
      />
      <span className="relative z-10">{props.buttonText}</span>
    </button>
  );
};

export default GradientButton;
