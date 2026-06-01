import React, { useEffect, useRef } from "react";
import { useAudio } from "../hooks/useAudio";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const { playSound } = useAudio();
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const lastInteractiveRef = useRef(null);

  useEffect(() => {
    // Hide mouse cursor on body on mount
    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveEl = target.closest("a, button, input, textarea, select, .interactive-hover, .floating-input");
      
      if (interactiveEl) {
        dotRef.current?.classList.add("hovered");
        ringRef.current?.classList.add("hovered");
        
        if (interactiveEl !== lastInteractiveRef.current) {
          lastInteractiveRef.current = interactiveEl;
          // Play basic hover tick sound
          playSound("hover");
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const related = e.relatedTarget;
      
      // If we are leaving the interactive element entirely
      if (lastInteractiveRef.current && (!related || !lastInteractiveRef.current.contains(related))) {
        dotRef.current?.classList.remove("hovered");
        ringRef.current?.classList.remove("hovered");
        lastInteractiveRef.current = null;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    let animationFrameId;

    const update = () => {
      dotPos.current.x += (mouseRef.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (mouseRef.current.y - dotPos.current.y) * 0.25;

      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [playSound]);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
