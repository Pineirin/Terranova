import React from 'react';
import { Tooltip } from 'react-tooltip'

function Tribe({ title, description, name, imageUrl, onClick, specialRule, requirements, valid }) {

  return (
    <div onClick={() => onClick(name, specialRule[1], valid)} className={valid ? `panel fade-in` : `fade-in panel-disabled`}>
      <div className='tribe-container'>
        <img src={imageUrl} alt={title} className='tribe-img' />
        <div className="tribe-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className='tribe-special-rule'>
          {
            specialRule && <><label className={`tooltip-text fantasy-text ${specialRule[1]}`}>{specialRule[0]}</label>
              <Tooltip anchorSelect={`.${specialRule[1]}`} className="custom-tooltip" place="top">
                <p>{specialRule[2]}</p>
              </Tooltip></>
          }
        </div>
        <div className={valid ? `tribe-alignment` : `tribe-alignment red`}>
          {
            <p>Required Alignment: <span className="fantasy-text">{requirements}</span></p>
          }
        </div>
      </div>
    </div>
  );
};

export default Tribe;