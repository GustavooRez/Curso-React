import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  
  
`;

export const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px 3px;
  :hover {
    cursor: pointer;
  }
  span {
    margin-left: 20px;
    font-family: Roboto;
    font-weight: 700;
  }
`;

export const Status = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${(props) => props.color};
`;

export const PopupTooltip = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 18px;
  position: absolute;
  left: 80px;
  bottom: 9px;
  background-color: #ffffff;
  height: 100px;
  width: 120px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  span {
    text-align: center;
    font-family: Roboto;
    font-size: 15px;
    font-weight: bold;
  }
`;

export default Container;
