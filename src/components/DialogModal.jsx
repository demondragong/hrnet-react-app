import { useEffect, useRef } from "react";

export default function DialogModal({ isModalVisible, children, closeModal }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isModalVisible) {
      dialog.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      dialog.close();
      document.body.classList.remove("modal-open");
    }
  }, [isModalVisible]);

  const preventAutoClose = (e) => e.stopPropagation();

  return (
    <dialog ref={dialogRef} onCancel={closeModal} onClick={closeModal} >
      <div onClick={preventAutoClose}>
        <button onClick={closeModal}>X</button>
        {children}
      </div>
    </dialog>
  );
}
