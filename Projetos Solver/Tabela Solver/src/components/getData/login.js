import React from 'react';
import axios from 'axios';

function login({setToken}) {
    await axios
      .post("https://api3.solvertecnologias.com.br/loginUser", {
        email: "candonga@solvertecnologias.com.br",
        password: "barramentosmetalicos",
      })
      .then(async (res) => {
        setToken(res.data.token);
      });
    }

    export default login