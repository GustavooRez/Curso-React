import React, { useEffect, useState } from 'react';
import Container from './style';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Rnd } from 'react-rnd';
import { FiDelete, FiTool, FiCheckSquare } from 'react-icons/fi';
import Modal from 'react-modal';

const options = {

  chart: {
    type: 'column'
  },

  title: {
    text: 'Piezômetros'
  },

  tooltip: {
    shared: true,
    valueSuffix: ' mm',
    useHTML: true,
    pointFormat: '<tr><td style="text-align: right"><b>{series.name} : {point.options.z}<br></b></td></tr>',
  },

  plotOptions: {
    column: {
      grouping: false,
      shadow: false
    },
    series: {
      keys: ['z', 'y'],
    }
  },
  series: []
}

function GraphicContainer({ data, piezometerName }) {
  const [customOptions, setCustomOptions] = useState(options);
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(605);
  const [x, setX] = useState(200);
  const [y, setY] = useState(180);
  const [showChart, setShowChart] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {
    let nameVect = []
    if (Array.isArray(piezometerName)) {
      piezometerName.map((name) => {
        nameVect.push(name.label);
      })
    }

    setCustomOptions({
      ...options,
      xAxis: {
        categories: nameVect,
      },
      chart: {
        type: 'column',
        height: height - 50,
        width: width
      },
      series: data
    });
  }, [data, width, height, piezometerName])

  function hideComponent() {
    setShowChart(false);
  }

  useEffect(() => {
    if (!showChart)
      setShowChart(true);
  }, [data])

  function showModal() {
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
  }

  const customStyles = {
    content: {
      position: 'absolute',
      top: '210px',
      left: '390px',
      right: '390px',
      bottom: '210px',
    }
  };

  return (
    showChart && <Container className='chart'>
      <Rnd
        className='rnd'
        size={{ width: width, height: height }}
        position={{ x: x, y: y }}
        bounds='window'
        onDragStop={(e, d) => {
          setX(d.x);
          setY(d.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setWidth(ref.offsetWidth)
          setHeight(ref.offsetHeight)
          setX(position.x)
          setY(position.y)
        }}
      >{/*
        <div className="buttonDiv">
          <button className='delete' onClick={() => hideComponent()}>
            <FiDelete size={24} />
          </button>
          <div className="rightButtons">
            <button className='check'>
              <FiCheckSquare size={24} />
            </button>
            <button className='tool' onClick={() => showModal()}>
              <FiTool size={24} />
            </button>
            <Modal
              style={customStyles}
              isOpen={openModal}
              onRequestClose={closeModal}
            >
              <button
                style={{ border: 'none', backgroundColor: 'white' }}
                onClick={() => closeModal()}>
                <FiDelete size={24} />
              </button>
            </Modal>
          </div>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={customOptions}
      />*/}
      </Rnd>
    </Container>
  );
}

export default GraphicContainer;