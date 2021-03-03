import styled from 'styled-components'

const Container = styled.div`
  width: 70%;
  height: 100%;
  margin: 0;

  .rnd {
    border: 1px solid black;
    background-color: white;
    .buttonDiv {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .delete {
        margin: 5px;
        background-color: white;
        border: none;
      }
      .rightButtons {
        width: 120px;
        justify-content: space-between;
        .check {
          margin: 5px;
          background-color: white;
          border: none;
        }
        .tool{
          margin: 5px;
          margin-left: 21px;
          background-color: white;
          border: none;
        }
        .Modal {
          position: absolute;
          top: 40px;
          left: 40px;
          right: 40px;
          bottom: 40px;
          background-color: papayawhip;
        }
      }
    }
  }
`;

export default Container;