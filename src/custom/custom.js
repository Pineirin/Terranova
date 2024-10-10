import custom1 from './custom1.jpg';
import custom2 from './custom2.jpg';
import custom3 from './custom3.jpg';
import custom4 from './custom4.jpg';
import './custom.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'

function Custom() {

  const { id } = useParams();
  let back = `/tribe/${id}`;
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/custom?id=${id}`)
      .then(response => {
        setPoints(response.data.points);
      })
      .catch(error => {
        console.error('Error getting data:', error);
      });
  }, []);

  return (
    <>
      <div className='custom-navigation-buttons'>
        <a href={back} className="button small-button">
          Back
        </a>
        <a href="/" className="button small-button ml-15">
          Home
        </a>
      </div>

      <div className="custom-grid-container">
        <div className="custom-left-image"><img src={custom1} alt="Imagen 1" className="image image-intro" /></div>
        <div className="content">
          <h1>Adventurers of Terranova</h1>
          <p>Congratulations, your adventurer is ready.</p>
          <p>Regardless, you may want to alter your Character into someone truly unique. You can customize your adventurer further using the avaialable points. You may never end the creation with negative points but it is advised to spend them all. You have available:</p>
          <h2>{points} points</h2>
          <p>To:</p>
          <a href={`/upgrade/${id}`} id="upgrade-skills" className="button ml-15 mb-15">Upgrade Skills</a>
          <a href={`/swap/${id}`} id="swap-natural-background-skills" className="button ml-15 mb-15">Swap Natural/Background Skills</a>
          <a href={`/injury/${id}`} id="suffer-injury" className="button ml-15 mb-15">Suffer Injury</a>
          <a href="#" id="learn-shapes" className="button ml-15 mb-15">Learn Shapes</a>
          <a href="#" id="level-up" className="button ml-15 mb-15">Level Up</a>

          <p>If you Character is ready, you may finish the creation by giving it a name.</p>
          <a href="#" className="button">Finish Character</a>
        </div>
        <div className="custom-rigth-image"><img src={custom2} alt="Imagen 2" className="image image-intro" /></div>
        <div className="custom-bottom-left-image mt-50"><img src={custom3} alt="Imagen 3" className="image image-intro" /></div>
        <div className="custom-bottom-right-image mt-50"><img src={custom4} alt="Imagen 4" className="image image-intro" /></div>
      </div>
      <Tooltip anchorSelect={`#upgrade-skills`} className="custom-tooltip" place="top">
        <p>Spend 1 points to improve by 1 the score of any skill.</p>
      </Tooltip>
      <Tooltip anchorSelect={`#swap-natural-background-skills`} className="custom-tooltip" place="top">
        <p>Spend 3 points to swap two natural or background skill scores.</p>
      </Tooltip>
      <Tooltip anchorSelect={`#suffer-injury`} className="custom-tooltip" place="top">
        <p>Start the adventure with a permanent injury to gain more points.</p>
      </Tooltip>
      <Tooltip anchorSelect={`#learn-shapes`} className="custom-tooltip" place="top">
        <p>Transform the Character into a Shapeshifter capable of adopting animal Shapes.</p>
      </Tooltip>
      <Tooltip anchorSelect={`#level-up`} className="custom-tooltip" place="top">
        <p>Spend 15 points to Level Up twice.</p>
      </Tooltip>
    </>

  );
}

export default Custom;