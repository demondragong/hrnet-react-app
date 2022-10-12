import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const DateInput = ({ control, label, id, dateState, setDateState }) => (
  <>
    <label htmlFor={id} className="mt-5">
      {label}
    </label>
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ReactDatePicker
          id={id}
          autoComplete="off"
          className="block w-full border border-gray-300 h-11 py-2.5 px-3.5 rounded-lg"
          onChange={(date) => {
            setDateState(date);
            return onChange(date.toLocaleDateString("en-US"));
          }}
          onBlur={onBlur}
          selected={dateState}
        />
      )}
    />
  </>
);

export default DateInput;
