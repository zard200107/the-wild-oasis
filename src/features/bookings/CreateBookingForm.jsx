import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { DateTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import DateFormRow from "../../ui/DateFormRow";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";

import { useCreateBooking } from "./useCreateBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import { useEffect } from "react";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { isCreating, createBookingMutation } = useCreateBooking();
  const { isUpdating, updateBookingMutation } = useUpdateBooking();

  const isWorking = isCreating || isUpdating;

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, watch, control, setValue } =
    useForm({
      defaultValues: isEditSession
        ? editValues
        : {
            startDate: new Date(),
            endDate: new Date(),
          },
    });

  const watchAllFields = watch();

  const { errors } = formState;

  useEffect(() => {
    const totalPrice =
      watchAllFields.cabinPrice || watchAllFields.extrasPrice
        ? Number(watchAllFields.cabinPrice) + Number(watchAllFields.extrasPrice)
        : 0;

    setValue("totalPrice", totalPrice);
  }, [watchAllFields.cabinPrice, watchAllFields.extrasPrice, setValue]);

  function onSubmit(data) {
    if (isEditSession) {
      const { cabins, guests, ...newBookingData } = data;
      updateBookingMutation({ newBookingData, id: editId });
    } else
      createBookingMutation(data, {
        onSuccess: (data) => {
          // console.log(data);
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

  const statusOptions = [
    { value: "checked-in", label: "Checked in" },
    { value: "checked-out", label: "Checked out" },
    {
      value: "unconfirmed",
      label: "Unconfirmed",
    },
  ];

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <DateFormRow label="Start Date" newClassName="no-style">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              sx={{
                width: 205,
              }}
              label="Start Date"
              value={field.value}
              onChange={field.onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={errors.startDate && errors.startDate.message}
                />
              )}
            />
          )}
        />
      </DateFormRow>

      <DateFormRow label="End Date" className="no-style">
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              sx={{
                width: 205,
              }}
              label="End Date"
              value={field.value}
              onChange={field.onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={errors.endDate && errors.endDate.message}
                />
              )}
            />
          )}
        />
      </DateFormRow>

      <FormRow label="Num of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isWorking}
          defaultValue={0}
          {...register("numNights", {
            required: "This field is required",
            value: 0,
          })}
        />
      </FormRow>

      <FormRow label="Num of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          defaultValue={0}
          {...register("numGuests", {
            required: "This field is required",
            value: 0,
          })}
        />
      </FormRow>

      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled={isWorking}
          defaultValue={1}
          {...register("cabinPrice", {
            required: "This field is required",
            value: 1,
            min: {
              value: 1,
              message: "cabinPrice should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          disabled={isWorking}
          defaultValue={0}
          {...register("extrasPrice", {
            required: "This field is required",
            value: 0,
          })}
        />
      </FormRow>

      <FormRow label="Total Price" error={errors?.totalPrice?.message}>
        <div>
          <Controller
            name="totalPrice"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                id="totalPrice"
                disabled={true}
                value={field.value}
              />
            )}
          />
          <input
            type="hidden"
            {...register("totalPrice", {
              value: 0,
            })}
          />
        </div>
      </FormRow>

      <FormRow label="Booking Status">
        <Select
          options={statusOptions}
          id="status"
          name="status"
          type="white"
          register={register}
        />
      </FormRow>

      <FormRow label="Has breakfast?">
        <Select
          id="hasBreakfast"
          name="hasBreakfast"
          options={[
            { value: true, label: "YES" },
            { value: false, label: "NO" },
          ]}
          register={register}
          type="white"
        />
      </FormRow>

      <FormRow label="Is Paid?">
        <Select
          id="isPaid"
          name="isPaid"
          options={[
            { value: true, label: "YES" },
            { value: false, label: "NO" },
          ]}
          type="white"
          register={register}
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="number"
          id="observations"
          disabled={isWorking}
          defaultValue=""
          {...register("observations", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} onSubmit={onSubmit}>
          {isEditSession ? "Edit booking" : "Create new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateBookingForm.propTypes = {
  bookingToEdit: PropTypes.any,
  onCloseModal: PropTypes.func,
};

export default CreateBookingForm;
