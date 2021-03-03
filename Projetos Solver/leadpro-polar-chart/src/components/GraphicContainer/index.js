import React, { useEffect, useState } from 'react';
import Container from './style';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { Rnd } from 'react-rnd';

HighchartsMore(Highcharts);

const options = {
  chart: {
    // marginTop: 50,
    // marginBottom: 50,
    // marginLeft: 50,
    // marginRight: 50,
    polar: false,
  },

  title: {
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
    },
    text: 'Sensores SAT'
  },

  xAxis: {
    gridLineWidth: 1,
    min: -10,
    max: 10,
    labels: {
      format: '{value}mm',
      overflow: 'allow'
    },
    tickInterval: 1,
    lineColor: 'black',
    // offset: -325,
    title: {
      text: 'EIXO X',
      enable: true,
      // offset: 350,
      style: {
        fontSize: 12,
        fontFamily: 'Roboto'
      }
    }
  },
  yAxis: {
    min: -10,
    max: 10,
    labels: {
      format: '{value}mm',
    },
    tickInterval: 1,
    lineWidth: 1,
    lineColor: 'black',
    // offset: -325,
    title: {
      text: 'EIXO Y',
      enable: true,
      // offset: 350,
      style: {
        fontSize: 12,
        fontFamily: 'Roboto'
      }
    }
  },

  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 15,
    y: 45

  },

  series: [{
    data: [],
    type: 'scatter',
    marker: {
      radius: 1.5
    }
  }]
}


function GraphicContainer({ data, busName }) {
  const [customOptions, setCustomOptions] = useState(options);
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(605);
  const [x, setX] = useState(200);
  const [y, setY] = useState(180);

  useEffect(() => {
    setCustomOptions({
      ...options,
      chart: {
        type: 'column',
        height: height - 5,
        width: width
      },
      title: {
        ...options.style,
        margin: 30,
        text: !!busName.value.length ? `Sensores SAT - Barramento ${(busName.value).toUpperCase()}` : 'Sensores SAT'
      },
      series: data
    });
  }, [data, height, width])

  return (

    <Container className='chart'>
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
        }}>
        <HighchartsReact containerProps={{ style: { height: "100%" } }} highcharts={Highcharts} options={customOptions} />
      </Rnd>
    </Container>
  );
}

export default GraphicContainer;