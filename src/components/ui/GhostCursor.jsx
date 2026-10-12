import React, { useEffect, useRef } from "react";
import styles from "./GhostCursor.module.css";

export default function GhostCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("has-ghost-cursor");

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (cursorRef.current) {
        const target = e.target;

        const isTextInput = 
          target.tagName === "INPUT" || 
          target.tagName === "TEXTAREA" || 
          target.isContentEditable || 
          window.getComputedStyle(target).cursor === "text";

        if (isTextInput) {
          cursorRef.current.classList.remove(styles.visible);
        } else {
          cursorRef.current.classList.add(styles.visible);
        }

        const isClickable = 
          target.closest('a, button, [role="button"], label, select') || 
          window.getComputedStyle(target).cursor === "pointer";

        if (isClickable && !isTextInput) {
          cursorRef.current.classList.add(styles.hovering);
        } else {
          cursorRef.current.classList.remove(styles.hovering);
        }
      }
    };

    const onMouseLeave = () => cursorRef.current?.classList.remove(styles.visible);
    const onMouseEnter = () => cursorRef.current?.classList.add(styles.visible);
    const onMouseDown = () => cursorRef.current?.classList.add(styles.clicking);
    const onMouseUp = () => cursorRef.current?.classList.remove(styles.clicking);

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.2;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(loop);
    };

    // Attach listeners globally
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.classList.remove("has-ghost-cursor");
    };
  }, []);

  if (!window.matchMedia("(pointer: fine)").matches) return null;

  return (
    <div ref={cursorRef} className={styles.cursorContainer}>
      <div ref={ringRef} className={styles.ringWrapper}>
        <div className={styles.ringInner} />
      </div>
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}