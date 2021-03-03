import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import ReactCalendar, { date } from "../calendar/calendar";

function Calendar({ onChangeDateMin, dateMin, onChangeDateMax, dateMax }) {
  const [buttonCalendarMin, setButtonCalendarMin] = useState(false);
  const [buttonCalendarMax, setButtonCalendarMax] = useState(false);

  function handleChangeCalendarMin() {
    if (buttonCalendarMin == false) {
      setButtonCalendarMin(true);
    } else {
      setButtonCalendarMin(false);
    }
  }

  function handleChangeCalendarMax() {
    if (buttonCalendarMax == false) {
      setButtonCalendarMax(true);
    } else {
      setButtonCalendarMax(false);
    }
  }

  return (
    <>
      <ReactCalendar
        onChange={onChangeDateMin}
        value={dateMin}
        onClick={handleChangeCalendarMin}
        buttonCalendar={buttonCalendarMin}
        type="Selecione o mínimo intervalo de tempo"
      />
      <ReactCalendar
        onChange={onChangeDateMax}
        value={dateMax}
        onClick={handleChangeCalendarMax}
        buttonCalendar={buttonCalendarMax}
        type="Selecione o máximo intervalo de tempo"
      />
    </>
  );
}

export default Calendar;
