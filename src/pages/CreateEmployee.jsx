import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { states } from "../data/usStates";

export default function CreateEmployee() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => dispatch(addEmployee(data));

  const stateOptions = states.map(state =>
    <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
  )

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
          <input id="startDate" type="date" {...register("startDate")} />
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
            <input id="zipCode" type="number" {...register("zipCode")} />
          </div>
        </fieldset>

        <div>
          <label htmlFor="department">Department</label>
          <select id="department" {...register("department")}>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </div>

        <input type="submit" />
      </form>
    </>
  );
}
