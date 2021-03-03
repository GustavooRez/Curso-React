import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import "./calendar.css";

const ReactCalendar = ({ onChange, value, onClick, buttonCalendar, type }) => {
  return (
    <div>
      <button className="calendar">
        {type}
        <button className="calendar_padding" value="date" onClick={onClick}>
          {" "}
          {buttonCalendar ? "Fechar" : "Abrir"}{" "}
        </button>
        {buttonCalendar ? (
          <>
            {" "}
            <DateTimePicker
              value={value}
              onChange={onChange}
              returnValue="start"
              format="dd/MM/yyyy HH:mm"
              className="calendar_item index"
            />{" "}
          </>
        ) : null}
      </button>
    </div>
  );
};

export default ReactCalendar;
