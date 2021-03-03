import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [auth, setAuth] = useState(false);
  let authButton;
  if (auth) {
    authButton = (
      <button
        onClick={() => {
          setAuth(false);
        }}
      >
        Sair
      </button>
    );
  } else {
    authButton = (
      <button
        onClick={() => {
          setAuth(true);
        }}
      >
        Entrar
      </button>
    );
  }
  return (
    <>
      <p>Você está logado? {auth ? "Sim" : "Não"}!</p>
      {authButton}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
