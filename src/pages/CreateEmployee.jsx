import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import { usStates } from "../data/usStates";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import DialogModal from "../components/DialogModal";
import { companyDepartments } from "../data/companyDepartments";

export default function CreateEmployee() {
  const {
    control,
    register,
    handleSubmit,
    watch,
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
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="block w-full bg-slate-100 h-8 rounded-md"
        {...register(id, { required })}
      />
    </>
  );

  return (
    <>
      <h1 className="text-3xl font-bold">Create a new employee</h1>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form className="max-w-sm m-auto p-2 bg-white flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="First name" id="firstName" register={register} required />
        <Input label="Last name" id="lastName" register={register} required />

        <div>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                id="dateOfBirth"
                onChange={(date) => {
                  setDateOfBirth(date);
                  return onChange(date.toLocaleDateString("en-US"));
                }}
                onBlur={onBlur}
                selected={dateOfBirth}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="startDate">Start date</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                id="startDate"
                onChange={(date) => {
                  setStartDate(date);
                  return onChange(date.toLocaleDateString("en-US"));
                }}
                onBlur={onBlur}
                selected={startDate}
              />
            )}
          />
        </div>

        <fieldset>
          <legend>Address</legend>
          <Input label="Street" id="street" register={register} required />
          <Input label="City" id="city" register={register} required />
          <div>
            <label htmlFor="state">State</label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select id="state" {...field} options={usStates} />
              )}
            />
          </div>
          <Input label="Zipcode" id="zipCode" register={register} required />
        </fieldset>

        <div>
          <label htmlFor="department">Department</label>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Select {...field} options={companyDepartments} />
            )}
          />
        </div>

        <input type="submit" />
      </form>
      <DialogModal isModalVisible={isModalVisible} closeModal={closeModal}>
        <p>Employee created!</p>
      </DialogModal>
    </>
  );
}
