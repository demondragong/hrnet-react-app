import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { states } from "../data/usStates";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function CreateEmployee() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => dispatch(addEmployee(data));

  const stateOptions = states.map((state) => (
    <option value={state.abbreviation} key={state.abbreviation}>
      {state.name}
    </option>
  ));

  return (
    <>
      <h1>Create Employee</h1>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register("firstName")} />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register("lastName")} />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
        </div>

        <div>
          <label htmlFor="startDate">Start date</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                id="startDate"
                selected={value}
                onChange={onChange}
                dateFormat="yyyy/MM/dd"
              />
            )}
          />
        </div>

        <fieldset>
          <legend>Address</legend>

          <div>
            <label htmlFor="street">Street</label>
            <input id="street" {...register("street")} />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input id="city" {...register("city")} />
          </div>

          <div>
            <label htmlFor="state">State</label>
            <select id="state" {...register("state")}>
              {stateOptions}
            </select>
          </div>

          <div>
            <label htmlFor="zipCode">Zip code</label>
            <input
              id="zipCode"
              type="text"
              pattern="[0-9]{5}"
              {...register("zipCode")}
            />
          </div>
        </fieldset>

        <div>
          <label htmlFor="department">Department</label>
          <Controller
            name="select"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "Sales", label: "Sales" },
                  { value: "Marketing", label: "Marketing" },
                  { value: "Engineering", label: "Engineering" },
                  { value: "Human Resources", label: "Human Resources" },
                  { value: "Legal", label: "Legal" },
                ]}
              />
            )}
          />
        </div>

        <input type="submit" />
      </form>
    </>
  );
}
