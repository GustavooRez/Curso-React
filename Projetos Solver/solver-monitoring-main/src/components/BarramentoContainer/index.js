import React, { useEffect, useState } from "react";
import SensorsContainer from "../SensorsContainer";
import Container from "./style";
import Img from '../../image/logo.png';
import axios from "axios";

export default function BarramentoContainer({ barramento, token }) {
  const [sensorh, setSensorh] = useState([]);
  const [sensorv, setSensorv] = useState([]);
  useEffect(() => {
    createData();
  }, [token]);

  setTimeout(() => {
    if (sensorh.length && sensorv.length) createData();
  }, 300000);

  async function createData() {
    if (token && barramento) {
      await axios
        .get("https://api3.solvertecnologias.com.br/sensorPipeInfo", {
          params: { idBus: barramento },
          headers: { Authorization: `JWT ${token}` },
        })
        .then((sensoresV) => {
          setSensorv(sensoresV.data.data);
        });
      await axios
        .get("https://api3.solvertecnologias.com.br/sensorSectionInfo", {
          params: { idBus: barramento },
          headers: { Authorization: `JWT ${token}` },
        })
        .then((sensoresH) => {
          setSensorh(sensoresH.data.data);
          console.log(sensoresH.data.data)
        });
    }
  }

  return (
    <Container className = 'Barramento'>
      <div className="header">
        {(barramento==='a')&&<img alt='logo 'src={Img} />}
        <h1>Barramento {barramento.toUpperCase()}</h1>
      </div>
      <span>Status dos sensores do barramento</span>
      <div className="displayContainer">
        <div className="section">
          <h5>Horizontais</h5>
          <div className="sensors">
            <SensorsContainer sensorsHeaders={sensorh} />
          </div>
        </div>
        <div className="section">
          <h5>Verticais</h5>
          <div className="sensors">
            <SensorsContainer sensorsHeaders={sensorv} />
          </div>
        </div>
      </div>
    </Container>
  );
}
