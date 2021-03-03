import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import "./main.css";
import { Select } from "../select";
import Table from "../table/Table";
import Calendar from "../calendar/allCalendar";
import nomes_sensores from "../../sensores.json";

//import 'react-calendar/dist/Calendar.css';

/* A estrutura das tabelas*/

/* Lembrar de tirar porque nao ta usando mais*/

export const Main = () => {
  const [col, setCol] = useState([]);
  const [dt, setDt] = useState([]);
  const data = useMemo(() => dt, [dt]);
  const [response, setResponse] = useState([]);
  const [allSensors, setAllSensors] = useState([]);
  const sensores = useMemo(() => nomes_sensores.data, []);
  const [selectedValue, setSelectedValue] = useState([]);
  const [dateMax, setDateMax] = useState(new Date());
  const [dateMin, setDateMin] = useState(new Date());
  const [vectorTables , setVectorTables] = useState([])

  const [count, setCount] = useState(0);

  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTYxMjk2NzkxOSwiZXhwIjoxNjEzNTcyNzE5fQ.oDgiZgzbovj4SPexi6BtKdthj0pYsRE5txqYe_xrYFQ"
  );

  async function login(){
    await axios .post(
      "https://api3.solvertecnologias.com.br/loginUser",
      {
        email: "candonga@solvertecnologias.com.br",
        password: "barramentosmetalicos",
      }
    )
    .then((res) => {
      console.log(res.data.token);
    });
  }

  const getSensor = async (token) => {
    await axios
      .get("https://api3.solvertecnologias.com.br/sensorList", {
        params: {
          idStruct: 1,
          idGroup: 2,
          idSubGroup: "*",
        },
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        console.log("GetSensor", res.data);
        setResponse(res.data.data);

        setAllSensors(
          res.data.data.map((sensor) => {
            if (!!sensor.id) {
              return {
                value: sensor.id,
                label: sensor.name,
              };
            }
          })
        );
      });
  };

  async function getData() {
    axios
      .get("https://api.solvertecnologias.com.br/att/data", {
        params: {
          idBus: "a",
          ids:
            selectedValue.length === 0
              ? [5, 6, 7, 8]
              : selectedValue.map((sen) => sen.value),
          datetime: {
            start: dateMin.getTime(),
            end: dateMax.getTime(),
          },
          changeUnit: true,
        },
        headers: { Authorization: `JWT ${token}` },
      })
      .then((res) => {
        var table = {};
        const returnSens = res.data.data;
        setCol(returnSens.map((el) => el.name));
        table.col = returnSens.map((el) => el.name); // Mapeamento do nome dos sensores para gerar os Headers da Tabela

        let longest = returnSens
          .map((el) => {
            return { ...el, len: el.data.dx.length };
          })
          .reduce((a, b) => (a.len > b.len ? a : b)); // Pegando o sensor com mais dados, para criar a coluna de datetime
        let accVet = [];
        for (let i = 0; i < longest.len; i++) {
          accVet.push({
            id: i,
            data: new Date(longest.data.dx[i][0]).toLocaleString(),
            ...returnSens
              .map((actSen) => {
                // Passando id como parâmetro fixo, data como parâmetro paara a coluna de data
                let dx = !!actSen.data.dx[i]
                  ? actSen.data.dx[i][1].toFixed(2)
                  : ""; // e gerando dinâmicamente dx, dy e dz para cada sensor com a chave de nome
                let dy = !!actSen.data.dy[i]
                  ? actSen.data.dy[i][1].toFixed(2)
                  : ""; // `${nomedoSensor}dX` para cada eixo, os ...( operador spread) antes do returnSens é para
                let dz = !!actSen.data.dz[i]
                  ? actSen.data.dz[i][1].toFixed(2)
                  : ""; // passar as chaves do retorno do map reduce para o objeto da linha

                return {
                  [`${actSen.name}dX`]: dx,
                  [`${actSen.name}dY`]: dy,
                  [`${actSen.name}dZ`]: dz,
                };
              })
              .reduce((a, b) => {
                return { ...a, ...b };
              }),
          }); // função reduce vai juntar o objeto de dx ,dy e dz de cada sensor em um só
        }
        setDt(accVet);
        console.log("requisição", accVet);

        
        //const datatable = useMemo(() => accVet, [accVet]);
        table.data = accVet;

        setVectorTables([...vectorTables , table])
        console.log("vetortables", vectorTables);
      });
  }

  function handleSolicitateData() {
    getData();
  }

  const onChangeDateMin = (date) => {
    setDateMin(date);
  };

  const onChangeDateMax = (date) => {
    setDateMax(date);
  };

  const handleChangeValuesSelected = (option) => {
    setSelectedValue(option);
  };

  function handleChangeValuesMinMax(type) {
    setDt(
      dt.sort(function (a, b) {
        return a[`${type}`] - b[`${type}`];
      })
    );
  }

  useEffect(() => {
    setDateMin(dateMin);
  });

  useEffect(() => {
    setDateMax(dateMax);
  });


  return (
    <>
      <div>
        <div className="">
          <div className="top-middle">
            <Calendar
              onChangeDateMin={onChangeDateMin}
              dateMin={dateMin}
              onChangeDateMax={onChangeDateMax}
              dateMax={dateMax}
            />

            <div className="barramentos">
              <label>Selecione os Barramentos</label>

              <Select
              className="index"
                closeMenuOSelect={false}
                isMulti
                options={sensores.map((sen) => {
                  return { label: sen.name, value: sen.id };
                })}
                onChange={(option) => setSelectedValue(option)}
                placeholder="Barramentos"
              />
            </div>
          </div>

          <div className="align_center">
            {" "}
            <button
              className="botao_enviar"
              onClick={handleSolicitateData }
            >
              Gerar nova tabela
            </button>{" "}
          </div>
        </div>
        {col.length <= 0 ? null : (
          <>
            <div className="tabela_geral">

              {vectorTables.map((vet) => {
                  return(
                  <div>
                  
                  <Table data={vet.data} col={vet.col} />
               
                </div> )})}
            </div>
          </>
        )}
      </div>
    </>
  );
};
