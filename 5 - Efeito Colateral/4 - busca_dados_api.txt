import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Loader from "./Loader";
import PostalCodeTable from "./PostalCodeTable";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  function fetchData() {
    fetch("https://cep.awesomeapi.com.br/json/05424020")
      .then(res => {
        return res.json();
      })
      .then(res => {
        setData(res);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);
  return isLoading ? <Loader /> : <PostalCodeTable {...data} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
