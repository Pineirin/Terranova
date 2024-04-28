import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './intro/intro.js';
import Alignment from './alignment/alignment.js';

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/alignment" element={<Alignment />} />
          </Routes>
        </BrowserRouter>
      );
};


export default App;