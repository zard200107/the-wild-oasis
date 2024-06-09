import { DateTimePicker } from "@mui/x-date-pickers";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import { format } from "date-fns";

const StyledDate = styled.div``;

function DatePicker({ disabled }) {
  const defaultValue = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  const handleDateChange = (date) => setSelectedDate(date);

  return (
    <StyledDate>
      <DateTimePicker
        defaultValue={defaultValue}
        value={selectedDate}
        disabled={disabled}
        onChange={handleDateChange}
      />
    </StyledDate>
  );
}

DatePicker.propTypes = {
  disabled: PropTypes.bool,
};

export default DatePicker;
