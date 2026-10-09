import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import styles from "./Drawer.module.css";

export default function Drawer({ isOpen, onClose, title, side = "right", footer, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={`${styles.drawer} ${styles[side]}`}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </dialog>
  );
}