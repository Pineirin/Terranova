import React from 'react';
import alignment1 from "./alignment1.png"

function Alignment() {
  return (
    <div className="grid-container">
        <div className="left-image"><img src={alignment1} alt="Imagen 1" className="image" /></div>
    <div className="content">
      <h1>Adventurers of Terranova</h1>
    </div>
    <div className="left-image"><img src={alignment1} alt="Imagen 1" className="image" /></div>
    <div className="left-image"><img src={alignment1} alt="Imagen 1" className="image" /></div>
    <div className="left-image"><img src={alignment1} alt="Imagen 1" className="image" /></div>
  </div>

  );
};

export default Alignment;