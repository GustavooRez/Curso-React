import React, { useEffect, useState } from "react";
import Container, { Status, Line, PopupTooltip } from "./style";
import Popup from "reactjs-popup";
import moment from "moment";

export default function SensorStatus({ value, key }) {
  const [nowDateTime, setNowDateTime] = useState(Date.now());
  const time = value.lastData.dx[0] * 1000;
  const diffHours = moment(nowDateTime).diff(moment(time), "hours");

  useEffect(() => {
    setNowDateTime(Date.now());
  }, [value]);

  function handleColorType(diffHours) {
    if (diffHours < 3) {
        return "green";
    } else if (diffHours < 24){
      return "yellow";
    } else {
      return "red"
    }
  };

  return (
    <Container key={key}>
      <Popup
        trigger={(open) => (
          <Line>
            <Status color= {handleColorType(diffHours)} />
            <span>{value.name}</span>
          </Line>
        )}
        position="bottom left"
        on={["hover", "focus"]}
      >
        <PopupTooltip>
          <span>{new Date(time).toLocaleString()}</span>
          <span>{diffHours} hora(s)</span>
        </PopupTooltip>
      </Popup>
    </Container>
  );
}
