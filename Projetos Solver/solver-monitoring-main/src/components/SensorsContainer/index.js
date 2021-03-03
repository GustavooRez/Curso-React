import React, { useEffect, useState } from "react";
import Container from "./style";
import SensorStatus from "../SensorStatus";

export default function SensorsContainer({ sensorsHeaders }) {
  const [sensor, setSensor] = useState([]);
  useEffect(() => {
    setSensor(sensorsHeaders);
  }, [sensorsHeaders]);

  return (
    <Container>
      {sensor &&
        !!sensor.length &&
        sensor.map((sensorValue) => <SensorStatus className = 'eachSensor' key={sensor.id} value={sensorValue} />)}
    </Container>
  );
}
