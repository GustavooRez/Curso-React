import GlobalStyle from './styles/GlobalStyle'
import GeneralContainer from './components/GeneralContainer'
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    auth();
  }, []);

  async function auth() {
    await axios
      .post("https://api3.solvertecnologias.com.br/loginUser", {
        email: "candonga@solvertecnologias.com.br",
        password: "barramentosmetalicos",
      })
      .then((tk) => {
        setToken(tk.data.token);
      });
  }

  return (
    <div className="App">
      <GeneralContainer token={token} />
      <GlobalStyle />
    </div>
  );
}

export default App;
