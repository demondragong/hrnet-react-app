export default function Modal({ content, closeModal }) {
  return (
    <dialog open>
      <p>{content}</p>
      <button onClick={closeModal}>Close modal</button>
    </dialog>
  );
}
