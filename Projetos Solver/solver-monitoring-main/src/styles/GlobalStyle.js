import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #D5D5D5;
    }

    .App {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        @media (max-width: 400px) {
            display: flex;
            flex-direction: column;
        }
    }
`;

export default GlobalStyle;