import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './intro/intro.js';
import Alignment from './alignment/alignment.js';
import Backgrounds from './background/backgrounds.js';
import Tribes from './tribe/tribes.js';

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/alignment/:id" element={<Alignment />} />
            <Route path="/tribe/:id" element={<Tribes />} />
            <Route path="/background/:id" element={<Backgrounds />} />
          </Routes>
        </BrowserRouter>
      );
};


export default App;