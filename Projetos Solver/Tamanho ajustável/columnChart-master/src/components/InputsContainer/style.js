import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 30%;
  padding-right: 6%;
  padding-top: 7%;
  align-items: center;
  justify-self: center;
  .selectIn {
    padding-top: 5%;
    width: 240px;
    .eachSelect {
      margin: 20px;
    }
  }
  .buttonField {
    margin-top: 30px;
  }
`;

export const Button = styled.button`
  background: #f86885;
  color: #000000;
  font-size: 1.0rem;
  font-family: Roboto;
  font-weight: 500;
  margin: 1rem;
  margin-top: 12px;
  padding: 1rem 1.5rem;
  border: #f7eff1;
  border-radius: 6px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.16), 0 4px 9px rgba(0, 0, 0, 0.23);
  transition: 0.06s;
  justify-content: center;
  :hover {
    background-color: #f7eff1;
  }
  :focus {
    outline: none;
  }
`;

export const DateInput = styled.div `
  display: flex;
  flex-direction: column;
  width: 200px;
  label{
    font-size: 20px;
    font-family: Roboto;
    font-weight: 500;
    padding-right: 15px;
    padding-top: 12px;
  }
`;

export default Container;