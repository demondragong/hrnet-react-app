import { useEffect, useRef } from "react";

export default function DialogModal({ isModalVisible, children, closeModal, dialogClassName, divClassName }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isModalVisible) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isModalVisible]);

  const preventAutoClose = (e) => e.stopPropagation();

  return (
    <dialog
      className={dialogClassName}
      ref={dialogRef}
      onCancel={closeModal}
      onClick={closeModal}
    >
      <div
        className={divClassName}
        onClick={preventAutoClose}
      >
        {children}
      </div>
    </dialog>
  );
}
