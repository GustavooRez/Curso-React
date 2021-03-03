import React, {useState, useEffect} from 'react';
import Container from './style'
import InputsContainer from '../InputsContainer';
import GraphicContainer from '../GraphicContainer';

function GeneralContainer({token}) {
  const [piezometerName, setPiezometerName] = useState([]);
  const [data, setData] = useState([]);

  return(
    <Container className = 'General' >
      <InputsContainer setData ={(piezometerData) => {setData(piezometerData)}}
                       setPiezometerName ={(piezometer) => {setPiezometerName(piezometer)}}
                       piezometerName = {piezometerName} 
                       token={token} 
      />
      <GraphicContainer data={data} piezometerName = {piezometerName}/>
    </Container>
  );
}

export default GeneralContainer;