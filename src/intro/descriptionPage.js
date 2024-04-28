import React from 'react';
import { Tooltip } from 'react-tooltip'

function DescriptionPage({ index, isActive, onChangeActivePage }) {

  return (
    <>
        <p>The world of Terranova is filled with adventurers and mercenaries. You will be guided through the process of creating one for yourself.</p>

        <p>Creating a character involves following various steps. Some of these will offer choices which will demand spending points. No more than <span className="fantasy-text">63</span> points may be spent creating a character.</p>

        <p>The first step of creating a character is choosing the <span className="tooltip-text natural-skills">Natural Skills</span></p>

        <Tooltip anchorSelect=".natural-skills" className="custom-tooltip" place="top">
            <p>Natural Skills (Athlectics, Finesse, Practise, Cleverness, Charisma and Erudition) represent the birth talent of a character towards several aptitudes. They may never be increased, but they may be swapped for a points cost.</p>
        </Tooltip>

        <div className="button-container">
            <a href="#" className="button" onClick={() => onChangeActivePage(2)}>
                Natural skills
            </a>
        </div>
    </>
  );
}

export default DescriptionPage;