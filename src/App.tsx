import React from 'react';
import './index.css';

import Header from "./containers/Header/Header";
import TestAssignment from "./containers/TestAssignment/TestAssignment";
import Users from "./containers/Users/Users";

function App() {
  return (
    <div className="App">
        <Header />
        <TestAssignment />
        <Users />
    </div>
  );
}

export default App;
