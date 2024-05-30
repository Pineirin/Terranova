import React from 'react';
import { Tooltip } from 'react-tooltip'


function SkillOptionPage({ index, isActive, onChangeActivePage }) {

  return (
    <>
        <p>There are 6 <span className="tooltip-text natural-skills">Natural Skills</span>. You may use the ones <span className="tooltip-text offered">offered by the Game Master</span> or generate a new set.</p>

        <Tooltip anchorSelect=".natural-skills" className="custom-tooltip" place="top">
            <p>Natural Skills (Athletics, Finesse, Practise, Cleverness, Charisma and Erudition) represent the birth talent of a Character towards several aptitudes. They may never be increased, but they may be swapped for a points cost.</p>
        </Tooltip>

        <Tooltip anchorSelect=".offered" className="custom-tooltip" place="top">
            <p>Usually the Game Master offers the player three random sets of Natural Skills. In that case, the player should choose one and select the "Input Game Master's Natural Skills". The "Generate Natural Skills" options does this process without the Game Master supervision.</p> 
        </Tooltip>

        <div className="button-container">
            <a href="#" className="button mr-10" onClick={() => onChangeActivePage(3)}>
                Input Game Master's Natural Skills
            </a>
            <a href="#" className="button ml-10" onClick={() => onChangeActivePage(4)}>
                Generate Natural Skills
            </a>
        </div>

    </>
  );
}

export default SkillOptionPage;