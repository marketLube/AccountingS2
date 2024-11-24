import formatDate from "@/app/_services/helpers";
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

const MaterialDatePicker = ({ date, setDate }) => {
  const initialDate = date ? new Date(date) : new Date();
  const [selected, setSelected] = useState(initialDate);
  const [month, setMonth] = useState(initialDate);

  useEffect(() => {
    const newDate = date ? new Date(date) : new Date();
    setSelected(newDate);
    setMonth(newDate);
  }, [date]);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const newDate = new Date(month.setFullYear(newYear));
    setMonth(newDate);
  };

  const handleDateSelect = (date) => {
    setSelected(date);
    setDate(formatDate(date));
  };

  return (
    <div className="material-datepicker">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDateSelect}
        month={month}
        onMonthChange={setMonth}
        captionLayout="dropdown"
        components={{
          Caption: ({ displayMonth }) => (
            <div className="datepicker-caption">
              <select
                value={displayMonth.getFullYear()}
                onChange={handleYearChange}
                className="year-dropdown"
              >
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - 5 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          ),
        }}
        modifiers={{ today: new Date() }}
        modifiersStyles={{
          today: {
            border: "2px solid var(--color-primary)",
            borderRadius: ".8rem",
          },
          selected: {
            backgroundColor: "var(--color-primary)",
            color: "white",
            borderRadius: ".8rem",
          },
        }}
        className="my-datepicker"
      />
    </div>
  );
};

export default MaterialDatePicker;
