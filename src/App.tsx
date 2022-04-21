import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';
import theme from './styles/theme';
import HomePage from './pages/Home';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <HomePage />
  </ThemeProvider>
);

export default App;
