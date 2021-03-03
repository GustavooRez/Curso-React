import React, { useState, useEffect } from 'react';
import Container, { DateInput, Button } from './style';
import SelectwAll from '../SelectWall';
import DatePicker from 'react-datepicker';
import './style.css';
import axios from 'axios';

const piezometerOptions = [
  { value: '1', label: "Piezometro 1" },
  { value: '2', label: "Piezometro 2" },
  { value: '3', label: "Piezometro 3" },
  { value: '4', label: "Piezometro 4" },
  { value: '5', label: "Piezometro 5" },
  { value: '6', label: "Piezometro 6" },
  { value: '7', label: "Piezometro 7" },
  { value: '8', label: "Piezometro 8" },
  { value: '9', label: "Piezometro 9" },
];

function InputsContainer({ token, setData, piezometerName, setPiezometerName }) {

  const [initialDate, setInitalDate] = useState(new Date(2020, 11, 18));
  const [finalDate, setFinalDate] = useState(new Date());

  function extractDate(msValue){
    var d = new Date(msValue);
    return d.toLocaleString();
  }

  const getData = async () => {
    let sValue = piezometerName && (piezometerName.label === 'Todos' ? piezometerOptions.flatMap(el => !el.options ?
      el.value : el.options.map((el2 => el2.value))) : piezometerName.map((el) => el.value))
   
    await axios
      .get("https://api3.solvertecnologias.com.br/piezometerData", {
        params: {
          ids: sValue,
          datetime: { start: initialDate.getTime(), end: finalDate.getTime() },
        },
      })
      .then((res) => {
        const max = []
        const min = []
        const actual = []
        res.data.data.map((piez) => { 
          let ma = piez.data.reduce((a,b) => (a[1]<b[1])?b:a);
          let mi = piez.data.reduce((a,b) => (a[1]>b[1])?b:a);
          let ac = piez.data[piez.data.length - 1];

          max.push([extractDate(ma[0]),ma[1]]) // max value
          min.push([extractDate(mi[0]), mi[1]]) // min value
          actual.push([extractDate(ac[0]),ac[1]]) // last value
          
        })
        setData([{name: 'Máximo',data: max, zIndex: 1},{name: 'Mínimo',data: min, zIndex: 3},{name: 'Atual',data: actual, zIndex: 2}]);
      })
  }

  return (
    <Container className='input'>

      <div className="dateIn">
        <DateInput>
          <label>Início</label>
          <DatePicker
            showTimeSelect={true}
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
            showTimeSelect={true}
            minDate={new Date(2020, 10, 18)}
            maxDate={new Date()}
            dateFormat='dd/MM/yyyy h:mm a'
            selected={finalDate}
            onChange={(date) => { setFinalDate(date) }}
          />
        </DateInput>
      </div>

        <div className="eachSelect">
          <label>Selecione os piezometros: </label>
          <SelectwAll
            allowSelectAll={true}
            isMulti={true}
            isSearchable={true}
            isDisable={false}
            closeMenuOnSelect={false}
            value={piezometerName}
            onChange={((event) => {
              setPiezometerName(event);
            })}
            placeholder="Selecione"
            options={piezometerOptions}
          />
        </div>
  
        <div className="buttonField">
          <Button onClick={getData} >Gerar gráfico</Button>
        </div>
    </Container>
  )
}

export default InputsContainer;