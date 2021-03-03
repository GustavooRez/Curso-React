import styled from 'styled-components'

const Container = styled.div`
  
  background-color: #FFFFFF;
  :first-child{
    img{
      position: absolute;
      margin: 6px;
      border-radius: 12px;
    }
  }
  box-shadow: 0 3px 9px rgba(0,0,0,0.16), 0 3px 9px rgba(0,0,0,0.23);
  border-radius: 9px;
  width: 100%;
  margin: 1% 1%;
  height: 95vh;
  text-align: center;
  align-items: center;
  margin-top: 21px;
  overflow-y: auto;
  @media (max-width: 400px){
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    overflow-y: unset;
  }
  span{
    font-family: Roboto;
    font-weight: bold;
    font-size: 18px;
  }
  .header {
    display: flex;
    position: relative;
    h1{
      padding: 20px;
    }
  }
  
  h1 {
    margin-right: auto;
    margin-left: auto;
    font-family: Roboto;
    font-weight: bold;
  }

  .displayContainer{
    display: flex;
    span{
      font-family: Roboto;
      font-weight: medium;
      font-size: 15px;
    }
    .section {
      width: 100%;
      margin: 0 5px;
      padding: 18px;
      
      h5{
        margin-bottom: 18px;
      }

      &:nth-child(1) {
        border-right: 1px solid #333;
      }
      .sensors{
        display: flex;
        justify-content: center;
      }
      .sensors>div{
        justify-content: space-between;
        flex: 0 50%; 
        @media (max-width: 1800px){
          flex: 0 100%;
        }
        
      }
    }
  }
  

`;

export default Container;