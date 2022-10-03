import { useEffect, useRef } from "react";

export default function DialogModal({ showModal, content, closeModal }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (showModal) {
      dialog.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      dialog.close();
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  const preventAutoClose = (e) => e.stopPropagation();

  return (
    <dialog ref={dialogRef} onCancel={closeModal} onClick={closeModal} >
      <div onClick={preventAutoClose}>
        <button onClick={closeModal}>X</button>
        <p>{content}</p>
      </div>
    </dialog>
  );
}
