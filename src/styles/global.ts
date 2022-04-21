import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: ${(props) => props.theme.colors.white};
  }

  #root {
    height: 100vh;
    display: flex;
    background-color: ${(props) => props.theme.colors.white};
  }

  body, input, button {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }
`;
