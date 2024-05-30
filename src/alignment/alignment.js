import React from 'react';
import Panel from './panel';
import './alignment.css';
import chaos from "./chaos.png"
import order from "./order.png"
import neutral from "./neutral.png"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Alignment() {
  const { id } = useParams();
  let navigate = useNavigate(); 

  function updateAlignment(alignment) {
    axios.put('http://127.0.0.1:5000/alignment', {
      alignment: alignment,
      id: id,
    })
    .then(response => {
        let path = `/tribe/${id}`; 
        navigate(path);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
  }
  
  return (
    <>
      <div className='navigation-buttons'>
        <a href="/" className="button small-button">
          Back
        </a>
        <a href="/" className="button small-button ml-15">
          Home
        </a>
      </div>
      <div className='fadeIn'>
        <h1>Alignment</h1>
        <p className='medium-margins'>The next step is picking an alignment. An alignment represents a character's belief in a common set of philosophical, ethical and religious tenets. Some races will only be available under a specific alignment.</p>
        <div className="alignment-container">
          <Panel onClick={() => updateAlignment('Order')} imageUrl={order} title="Order" description="Order followers tend to exhibit a collectivist mindset, valuing expansion, progress, and civilization. The Order pantheons are revered by a few organized religions." />
          <Panel onClick={() => updateAlignment('Chaos')} imageUrl={chaos} title="Chaos" description="Chaos followers tend to exhibit an individualistic mindset, valuing primitivism, tradition, and nature. The Chaos pantheons are revered by many unorganized religions." />
          <Panel onClick={() => updateAlignment('Neutral')} imageUrl={neutral} title="Neutral" description="Neutral Characters tend to prefer a balanced approach, avoiding zelaous commitment towards a doctrine. Regarding religion, cynical or open Characters tend to be neutral." />
        </div>
      </div>
    </>
  );
};

export default Alignment;