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
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    setShowModal(true)
  };

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
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select id="state" {...field} options={usStates} />
              )}
            />
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
            name="department"
            control={control}
            render={({ field }) => (
              <Select {...field} options={companyDepartments} />
            )}
          />
        </div>

        <input type="submit" />
      </form>
      <DialogModal showModal={showModal} content="Employee created!" closeModal={closeModal} />
    </>
  );
}
