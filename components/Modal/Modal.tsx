import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../../interface";
import styles from "../../styles/Modal.module.css";

const Modal = ({ children, onClose, show }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const portalContainer = document.getElementById("modal-root");

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <div className={styles.header} />
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser && portalContainer) {
    return createPortal(modalContent, portalContainer);
  } else {
    return null;
  }
};

export default Modal;
