import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { usStates } from "../data/usStates";
import React, { useState } from "react";
import ModalDialog from "react-basic-modal-dialog";
import { companyDepartments } from "../data/companyDepartments";
import Input from "../components/Input";

export default function CreateEmployee() {
  const { register, handleSubmit, reset, formState } = useForm();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const openDialog = () => setIsDialogVisible(true);
  const closeDialog = () => setIsDialogVisible(false);

  const dispatch = useDispatch();
  
  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    openDialog();
  };

  // reset (empty) form fields on sucessful form submission
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <main className="max-w-sm m-auto">
      <h1 className="text-2xl font-medium">Create an employee</h1>
      <p className="text-gray-700 mb-5">
        Fields marked with an asterisk are mandatory.
      </p>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="First name*"
          id="firstName"
          register={register}
          required
        />
        <Input label="Last name*" id="lastName" register={register} required />
        <Input label="Date of birth" id="dateOfBirth" type="date" register={register} />
        <Input label="Start date" id="startDate" type="date" register={register} />
        <div>
          <label htmlFor="department">Department</label>
          <select
            id="department"
            className="block w-full border border-gray-300 h-11 py-2.5 px-3.5 rounded-lg mb-4"
            {...register("department")}
          >
            <option value=""></option>
            {companyDepartments.map((department) => (
              <option value={department.value} key={department.value}>
                {department.label}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="border-t border-gray-300">
          <legend className="text-center">Address</legend>
          <Input
            label="Street"
            id="street"
            className="mb-2"
            register={register}
          />
          <Input label="City" id="city" register={register} />
          <div>
            <label htmlFor="state">State</label>
            <select
              id="state"
              className="block w-full border border-gray-300 h-11 py-2.5 px-3.5 rounded-lg mb-4"
              {...register("state")}
            >
              <option value=""></option>
              {usStates.map((state) => (
                <option value={state.value} key={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
          <Input label="Zipcode" id="zipCode" register={register} />
        </fieldset>

        <input
          className="w-full bg-gray-600 text-white font-semibold p-2.5 mt-4 rounded-lg"
          type="submit"
        />
        <input
          className="w-full bg-gray-600 text-white font-semibold p-2.5 mt-4 rounded-lg"
          type="button"
          value="Clear fields"
          onClick={() => {
            reset({
              firstName: "",
              lastName: "",
              dateOfBirth: "",
              startDate: "",
              department: "",
              street: "",
              city: "",
              state: "",
              zipCode: "",
            });
          }}
        />
      </form>
      <ModalDialog
        isDialogVisible={isDialogVisible}
        closeDialog={closeDialog}
        dialogClassName="max-w-md rounded-xl p-0 backdrop:bg-black/60"
        divClassName="flex flex-col p-6 gap-2 justify-between items-center"
      >
        <h2 className="text-lg font-semibold">Employee created</h2>
        <p className="text-sm text-gray-600	text-center">
          This employee has been added to the database. You can view them in the
          Employee list page.
        </p>
        <button
          className="w-full bg-gray-600 text-white font-semibold p-2.5 mt-4 rounded-lg"
          onClick={closeDialog}
        >
          Close
        </button>
      </ModalDialog>
    </main>
  );
}
