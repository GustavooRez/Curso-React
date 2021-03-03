import React, { useState } from "react";
import styled from "styled-components";
import BG from "./naruto.png";
import logo from "./logo.png";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Image = styled.img`
  width: 50%;
  justify-content: center;
`;

const Text = styled.span`
  color: white;
  font-size: 16px;
  padding: 5px;
`;

const FormContainer = styled.form`
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 480px;
  height: 500px;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: -10px;
`;

const Input = styled.input`
  padding: 10px;
  background-color: white;
  outline: none;
  width: 90%;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: white;
  outline: none;
  width: 90%;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ff9834;
  color: white;
`;

const Title = styled.h1`
  color: white;
  font-size: 20px;
  padding: 5px;
  padding-top: 50px;
`;

function Home() {
  const [numberCard, setNumberCard] = useState("");
  const [numberCode, setNumberCode] = useState("");
  const [date, setDate] = useState("");

  const aldeiras = [
    "Vila Oculta da Folha",
    " Vila Oculta da Areia",
    "Vila Oculta da Nuvem",
    "Vila Oculta da Névoa",
    "Vila Oculta da Pedra",
  ];

  const handleSubmit = (e) => {
    try {
        e.preventDefault()
        console.log(numberCard, numberCode, date)

        if(numberCode.length < 1 || setNumberCard.length < 1 || date.length < 1){
            alert("ops, digite seus dados corretamente")
        }

        let a = Math.floor(Math.random() * (5-1)) + 1; 
        alert(aldeiras[a])
    } catch (e) {
      console.log("error" + e);
    }
  };

  return (
    <Container>
      <Wrapper>
        <FormContainer onSubmit={handleSubmit}>
          <InputContainer>
            <Image src={logo} />
            <Title> DESCUBRA DE QUAL ADEIA NINJA VOCÊ É</Title>
            <Text> Digite o número do seu cartão</Text>
            <Input
              value={numberCard}
              onChange={(e) => {
                setNumberCard(e.target.value);
              }}
            />
            <Text> Digite o código de segurança</Text>
            <Input
              value={numberCode}
              onChange={(e) => {
                setNumberCode(e.target.value);
              }}
            />
            <Text> Data de Vencimento</Text>
            <Input
              value={date}
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <Button> Concluir </Button>
          </InputContainer>
        </FormContainer>
      </Wrapper>
      <Wrapper active>
        <Image src={BG} />
      </Wrapper>
    </Container>
  );
}

export default Home;
