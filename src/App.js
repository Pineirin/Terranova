import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './intro/intro.js';
import Alignment from './alignment/alignment.js';
import Backgrounds from './background/backgrounds.js';
import Tribes from './tribe/tribes.js';
import Custom from './custom/custom.js';
import Swap from './swap/swap.js';
import Upgrade from './upgrade/upgrade.js';
import Injury from './injury/injury.js';

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/alignment/:id" element={<Alignment />} />
            <Route path="/tribe/:id" element={<Tribes />} />
            <Route path="/background/:id" element={<Backgrounds />} />
            <Route path="/custom/:id" element={<Custom />} />
            <Route path="/swap/:id" element={<Swap />} />
            <Route path="/upgrade/:id" element={<Upgrade />} />
            <Route path="/injury/:id" element={<Injury />} />
          </Routes>
        </BrowserRouter>
      );
};


export default App;