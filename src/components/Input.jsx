const Input = ({ label, id, type, register, required, pattern, min, max, errors }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      className="block w-full border border-gray-300 h-11 py-2.5 px-3.5 rounded-lg mb-4"
      autoComplete="off"
      {...register(id, {required})}
    />
    {errors && errors[id] && <p className="-mt-4 text-red-800 text-end" role="alert">{errors[id]?.message}</p>}
  </>
);

export default Input;
