import React, {useState} from 'react';
import Container from './style';
import GraphicContainer from '../GraphicContainer';
import InputsContainer from '../InputsContainer';

export default function GeneralContainer({token}) {
  const [data, setData] = useState([]); // State getting the sensors data coming from InputsContainer
  const [busName, setBusName] = useState({ value: ''}); //To pass the bus name at the chart

  return (
    <Container className='general'>
      <InputsContainer setData ={(sensorData) => {setData(sensorData)}} 
                       setBusName ={(bus) => {setBusName(bus)}}
                       busName = {busName} 
                       token={token} 
      />
      <GraphicContainer data = {data} busName = {busName}/>
    </Container>
  )
}