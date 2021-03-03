import React, { useState, useEffect } from 'react';
import Container, { DateInput, Button } from './style';
import SelectwAll from '../SelectwAll';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import './style.css';
import axios from 'axios';

const busOptions = [
  { value: 'a', nValue: 2, label: "Barramento A" },
  { value: 'b', nValue: 3, label: "Barramento B" },
  { value: 'c', nValue: 4, label: "Barramento C" },
];

const orientationOptions = [
  { value: 'y', label: 'XY' },
  { value: 'z', label: 'XZ' }
]

function InputsContainer({ token, setData, busName, setBusName }) {

  const [orientation, setOrientation] = useState(null);
  const [sensors, setSensors] = useState(null); // Sensores selecionados
  const [allSensors, setAllSensors] = useState([]); // Todos os sensores do barramento 
  const [initialDate, setInitalDate] = useState(new Date(2020, 11, 18));
  const [finalDate, setFinalDate] = useState(new Date());

  useEffect(() => {
    if (busName) {
      getSensor();
    }
  }, [token, busName]);

  function handleChange(event) {
    setSensors(event);
  }

  const getData = async () => {
    let sValue = sensors && (sensors.label === 'Todos' ? allSensors.flatMap(el => !el.options ?
      el.value : el.options.map((el2 => el2.value))) : sensors.map((el) => el.value))
    //Se Todos -> selecionei todos os sensores
    //Primeiro condicional
    //se ! options -> entra no primeiro, nesse caso selecionei apenas um dos barramentos
    //no segundo caso selecionei todos os barramentos, e dessa forma vou ter que percorrer os 3 vetores, Barramentos A,B e C

    await axios
      .get("https://api.solvertecnologias.com.br/att/data", {
        params: {
          idBus: busName.value, ids: sValue,
          datetime: { start: initialDate.getTime(), end: finalDate.getTime() },
          changeUnit: false
        },
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        
        let finalVet = [];
        res.data.data.map((sens) => { // Map to get each sensor 
          
          let vet = []; //Intermediate vector for each sensor
          for (let i = 0; i < sens.data.dx.length; i++) {
            vet.push([sens.data.dx[i][1], sens.data[`d${orientation}`][i][1]]) // Vector getting data from dx and the other orientation that was passed
          }
          for (let i = 0; i < sens.data.dy.length; i++) {
            vet.push([sens.data.dy[i][2], sens.data[`d${orientation}`][i][2]]) // Vector getting data from dy and the other orientation that was passed
          }
          for (let i = 0; i < sens.data.dz.length; i++) {
            vet.push([sens.data.dz[i][3], sens.data[`d${orientation}`][i][3]]) // Vector getting data from dz and the other orientation that was passed
          }
          
          finalVet.push({ data: vet, name: sens.name,}); // Vector with all sensors 
        })
        setData(finalVet);
        console.log('final', finalVet)
      })
  }

  const getSensor = async () => {

    if (token) {
      await axios
        .get("https://api3.solvertecnologias.com.br/sensorList", {
          params: { idStruct: 1, idGroup: busName.nValue, idSubGroup: "*" },
          headers: { Authorization: `JWT ${token}` },
        })
        .then((res) => {
          setAllSensors(
            res.data.data.map((sensor) => {
              if (!!sensor.id) {
                return {
                  value: sensor.id,
                  label: sensor.name,
                };
              }
              return {
                label: sensor.name,
                options: sensor.sensors.map((el) => {
                  return {
                    value: el.id,
                    label: el.name,
                    sub_label: sensor.char_index,
                  };
                }),
              };
            })
          );
        });
    }
  };

  function handleChange(event) {
    setSensors(event); //Adding sensors to the vector
  }

  return (
    <Container className='input'>
      <div className="dateIn">
        <DateInput>
          <label>Início</label>
          <DatePicker
            showTimeSelect = {true}
            minDate={new Date(2020, 10, 18)}
            maxDate={new Date()}
            dateFormat='dd/MM/yyyy h:mm a'
            selected={initialDate}
            onChange={(date) => { setInitalDate(date) }}
          />
        </DateInput>

        <DateInput >
          <label>Fim</label>
          <DatePicker
            showTimeSelect = {true}
            minDate={new Date(2020, 10, 18)}
            maxDate={new Date()}
            dateFormat='dd/MM/yyyy h:mm a'
            selected={finalDate}
            onChange={(date) => { setFinalDate(date) }}
          />
        </DateInput>
      </div>

      <div className="selectIn">
        <div className="eachSelect">
          <label>Selecione a orientação: </label>
          <Select
            onChange={(event) => {
              setOrientation(event.value);
            }}
            placeholder="Selecione"
            options={orientationOptions}
          />
        </div>

        <div className="eachSelect">
          <label>Selecione os barramentos: </label>
          <Select
            onChange={(event) => {
              //setDisableButton(true);
              setBusName(event);
              setSensors([]);
            }}
            placeholder="Selecione"
            options={busOptions}
          />
        </div>
        <div className="eachSelect">
          <label>Selecione os sensores: </label>
          <SelectwAll
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "orangered",
                primary25: "#9099A2",
                primary: "#9099A2",
              },
            })}
            placeholder="Selecione"
            value={sensors}
            allowSelectAll={true}
            onChange={handleChange}
            isMulti={true}
            isSearchable={true}
            options={allSensors}
            isDisable={false}
            closeMenuOnSelect={false}
          />
          <div className="buttonField">
            <Button onClick={getData} >Gerar gráfico</Button>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default InputsContainer;