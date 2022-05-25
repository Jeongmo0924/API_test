import React, { memo } from 'react';
import {Routes, Route} from "react-router-dom"
import PetApi from './pages/PetApi';
import Test from "./Test"

const App = memo(() => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PetApi/>}/>
        <Route path="/detail" element={<Test/>}/>
      </Routes>
    </div>
  );
});

export default App;