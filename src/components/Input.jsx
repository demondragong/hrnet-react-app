const Input = ({ label, id, type, register, required }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      className="block w-full border border-gray-300 h-11 py-2.5 px-3.5 rounded-lg mb-4"
      autoComplete="off"
      {...register(id, { required })}
    />
  </>
);

export default Input;
