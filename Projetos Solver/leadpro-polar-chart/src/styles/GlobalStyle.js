import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body, #root, #root>div {
        height: 100vh;
    }

    .App {
        display: flex;
        color: #231e1f;
        justify-content: center;
    }
`;

export default GlobalStyle;