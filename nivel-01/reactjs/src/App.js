import React from 'react';

import Header from './components/Header';

function App() {
  return (
    <>
      <Header title="Homepage">
        <ul>
          <li>Projetos</li>
          <li>Links</li>
        </ul>
      </Header>
      <Header title="Projects">
        <ul>
          <li>Novos Projetos</li>
          <li>Destaques do mês</li>
          <li>FAQ</li>
        </ul>
      </Header>
    </>
  );
}

export default App;
