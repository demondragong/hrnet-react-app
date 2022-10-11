import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { usStates } from "../data/usStates";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import React, { useState } from "react";
import ModalDialog from "../components/ModalDialog";
import { companyDepartments } from "../data/companyDepartments";

export default function CreateEmployee() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    setIsModalVisible(true);
  };

  const Input = ({ label, id, register, required }) => (
    <>
      <label htmlFor={id} className="mt-5">
        {label}
      </label>
      <input
        id={id}
        className="block w-full border border-gray-300 h-11 py-2.5 px-3.5 rounded-lg"
        autoComplete="off"
        {...register(id, { required })}
      />
    </>
  );

  const ExternalInput = ({ label, id, dateState, setDateState }) => (
    <>
      <label htmlFor={id} className="mt-5">
        {label}
      </label>
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DatePicker
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

  return (
    <main className="max-w-sm m-auto">
      <h1 className="text-2xl font-medium">Create an employee</h1>
      <p className="text-gray-700">
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
        <ExternalInput
          label="Date of birth"
          id="dateOfBirth"
          dateState={dateOfBirth}
          setDateState={setDateOfBirth}
        />
        <ExternalInput
          label="Start date"
          id="startDate"
          dateState={startDate}
          setDateState={setStartDate}
        />

        <fieldset>
          <legend>Address</legend>
          <Input label="Street" id="street" register={register} />
          <Input label="City" id="city" register={register} />
          <div>
            <label htmlFor="state">State</label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select inputId="state" {...field} options={usStates} />
              )}
            />
          </div>
          <Input label="Zipcode" id="zipCode" register={register} />
        </fieldset>

        <div>
          <label htmlFor="department">Department</label>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Select inputId="department" {...field} options={companyDepartments} />
            )}
          />
        </div>

        <input
          className="w-full bg-gray-600 text-white font-semibold p-2.5 mt-4 rounded-lg"
          type="submit"
        />
        <button className="w-full bg-gray-600 text-white font-semibold p-2.5 mt-4 rounded-lg">
          Clear fields
        </button>
      </form>
      <ModalDialog
        isModalVisible={isModalVisible}
        closeModal={closeModal}
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
          onClick={closeModal}
        >
          Close
        </button>
      </ModalDialog>
    </main>
  );
}
