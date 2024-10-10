
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import './upgrade.css';
import { useNavigate } from "react-router-dom";
import bracketG from './bracket_green.jpg';
import bracketR from './bracket_red.jpg';
import bracketUpG from './bracket_up_green.jpg';
import bracketUpR from './bracket_up_red.jpg';
import bracketLowG from './bracket_low_green.jpg';
import bracketLowR from './bracket_low_red.jpg';

function Upgrade() {

  const { id } = useParams();
  let menu = `/custom/${id}`;
  let navigate = useNavigate();
  const [natural, setNatural] = useState(Array(6).fill(0));
  const [background, setBackground] = useState(Array(6).fill(0));
  const [upgrades, setUpgrades] = useState(Array(30).fill(0));
  const [oldUpgrades, setOldUpgrades] = useState(Array(30).fill(0));
  const [modifiers, setModifiers] = useState(Array(30).fill(0));
  const [oldModifiers, setOldModifiers] = useState(Array(30).fill(0));
  const [expertises, setExpertises] = useState(Array(30).fill("None"));
  const [oldExpertises, setOldExpertises] = useState(Array(30).fill("None"));
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/upgrade?id=${id}`)
      .then(response => {
        setNatural(response.data.natural);
        setBackground(response.data.background);
        setModifiers(response.data.modifiers);
        setUpgrades(response.data.upgrades);
        setOldModifiers(response.data.modifiers.slice());
        setOldUpgrades(response.data.upgrades.slice());
        setExpertises(response.data.modifiers.map(getExpertise));
        setOldExpertises(expertises.slice());

      })
      .catch(error => {
        console.error('Error getting data:', error);
      });
  }, []);

  function getExpertise(score) {
    if (score < 5) {
      return "Untrained";
    }
    if (score < 10) {
      return "Trained";
    }
    if (score < 20) {
      return "Expert";
    }
    if (score < 30) {
      return "Master";
    }
    return "Legendary";
  }

  function updateSkills() {
    if (points > 0) {
      axios.put('http://127.0.0.1:5000/upgrade', {
        modifiers: modifiers,
        upgrades: upgrades,
        points: points,
        id: id,
      })
        .then(response => {
          let path = `/custom/${id}`;
          navigate(path);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    }
  }

  const upgrade = (index) => {
    console.log(upgrades[index]);
    if (upgrades[index] < 16) {
      setUpgrades(prev => {
        const new_ = [...prev];
        new_[index] += 1;
        return new_;
      });

      setModifiers(prev => {
        const new_ = [...prev];
        new_[index] += 1;
        return new_;
      });

      setExpertises(prev => {
        const new_ = [...prev];
        new_[index] = getExpertise(modifiers[index] + 1);
        return new_;
      });
      setPoints(points + 1);
    }
  }

  const reset = () => {
    setPoints(0);
    setModifiers(oldModifiers);
    setExpertises(oldExpertises);
    setUpgrades(oldUpgrades);
  }

  return (
    <>
      <div className='custom-container'>
        <div className='fadeIn'>
          <h2>Upgrade Skills</h2>
          <p>Click any Skill Upgrade to improve it by 1.</p>
          <h2>{points} points used</h2>
          <div className='custom-options fadeIn'>
            <a href={menu} className="button mr-10">
              Cancel
            </a>
            <a href="#" onClick={() => reset()} className="button mr-10">
              Reset
            </a>
            <a href="#" onClick={() => updateSkills()} className="button mr-10">
              Confirm
            </a>
          </div>
        </div>
        <div className='upgrade-container'>
          <table className='centered-table upgrade-table upgrade-border fadeIn'>
            <tr>
              <th></th>
              <th><label id="Natural">Natural</label></th>
              <th><label id="Background">Background</label></th>
              <th className='upgrade-column'></th>
              <th></th>
              <th><label id="Upgrade">Upgrade</label></th>
              <th><label id="Modifier">Modifier</label></th>
              <th><label id="Expertise">Expertise</label></th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Vigour" className='tooltip-text fantasy-text'>Vigour</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(0)}>{upgrades[0]}</button></td>
              <td><button className='input-like'>{modifiers[0]}</button></td>
              <td><button className='input-like'>{expertises[0]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Stamina" className='tooltip-text fantasy-text' >Stamina</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(1)}>{upgrades[1]}</button></td>
              <td><button className='input-like'>{modifiers[1]}</button></td>
              <td><button className='input-like'>{expertises[1]}</button></td>
            </tr>
            <tr>
              <td><label id="Athletics" className='fantasy-text'>Athletics</label></td>
              <td><button className='input-like'>{natural[0]}</button></td>
              <td><button className='input-like'>{background[0]}</button></td>
              <td><div className="upgrade-image upgrade-low"><img src={bracketLowG} alt="bracket" /></div></td>
              <td><label id="Jump" className='tooltip-text fantasy-text'>Jump</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(2)}>{upgrades[2]}</button></td>
              <td><button className='input-like'>{modifiers[2]}</button></td>
              <td><button className='input-like'>{expertises[2]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Climb" className='tooltip-text fantasy-text'>Climb</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(3)}>{upgrades[3]}</button></td>
              <td><button className='input-like'>{modifiers[3]}</button></td>
              <td><button className='input-like'>{expertises[3]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Swim" className='tooltip-text fantasy-text'>Swim</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(4)}>{upgrades[4]}</button></td>
              <td><button className='input-like'>{modifiers[4]}</button></td>
              <td><button className='input-like'>{expertises[4]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Ride" className='tooltip-text fantasy-text'>Ride</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(5)}>{upgrades[5]}</button></td>
              <td><button className='input-like'>{modifiers[5]}</button></td>
              <td><button className='input-like'>{expertises[5]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Agility" className='tooltip-text fantasy-text'>Agility</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(6)}>{upgrades[6]}</button></td>
              <td><button className='input-like'>{modifiers[6]}</button></td>
              <td><button className='input-like'>{expertises[6]}</button></td>
            </tr>
            <tr>
              <td><label id="Finesse" className='fantasy-text'>Finesse</label></td>
              <td><button className='input-like'>{natural[1]}</button></td>
              <td><button className='input-like'>{background[1]}</button></td>
              <td><div className="upgrade-image"><img src={bracketR} alt="bracket" /></div></td>
              <td><label id="Sleight-of-Hand" className='tooltip-text fantasy-text'>Sleight of Hand</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(7)}>{upgrades[7]}</button></td>
              <td><button className='input-like'>{modifiers[7]}</button></td>
              <td><button className='input-like'>{expertises[7]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Stealth" className='tooltip-text fantasy-text'>Stealth</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(8)}>{upgrades[8]}</button></td>
              <td><button className='input-like'>{modifiers[8]}</button></td>
              <td><button className='input-like'>{expertises[8]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Tinkerer" className='tooltip-text fantasy-text'>Tinkerer</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(9)}>{upgrades[9]}</button></td>
              <td><button className='input-like'>{modifiers[9]}</button></td>
              <td><button className='input-like'>{expertises[9]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Craft" className='tooltip-text fantasy-text'>Craft</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(10)}>{upgrades[10]}</button></td>
              <td><button className='input-like'>{modifiers[10]}</button></td>
              <td><button className='input-like'>{expertises[10]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Reflex" className='tooltip-text fantasy-text'>Reflex</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(11)}>{upgrades[11]}</button></td>
              <td><button className='input-like'>{modifiers[11]}</button></td>
              <td><button className='input-like'>{expertises[11]}</button></td>
            </tr>
            <tr>
              <td><label id="Practise" className='fantasy-text'>Practise</label></td>
              <td><button className='input-like'>{natural[2]}</button></td>
              <td><button className='input-like'>{background[2]}</button></td>
              <td><div className="upgrade-image"><img src={bracketG} alt="bracket" /></div></td>
              <td><label id="Perception" className='tooltip-text fantasy-text'>Perception</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(12)}>{upgrades[12]}</button></td>
              <td><button className='input-like'>{modifiers[12]}</button></td>
              <td><button className='input-like'>{expertises[12]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Track" className='tooltip-text fantasy-text'>Track</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(13)}>{upgrades[13]}</button></td>
              <td><button className='input-like'>{modifiers[13]}</button></td>
              <td><button className='input-like'>{expertises[13]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Pathfind" className='tooltip-text fantasy-text'>Pathfind</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(14)}>{upgrades[14]}</button></td>
              <td><button className='input-like'>{modifiers[14]}</button></td>
              <td><button className='input-like'>{expertises[14]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Survival" className='tooltip-text fantasy-text'>Survival</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(15)}>{upgrades[15]}</button></td>
              <td><button className='input-like'>{modifiers[15]}</button></td>
              <td><button className='input-like'>{expertises[15]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Work" className='tooltip-text fantasy-text'>Work</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(16)}>{upgrades[16]}</button></td>
              <td><button className='input-like'>{modifiers[16]}</button></td>
              <td><button className='input-like'>{expertises[16]}</button></td>
            </tr>
            <tr>
              <td><label id="Cleverness" className='fantasy-text'>Cleverness</label></td>
              <td><button className='input-like'>{natural[3]}</button></td>
              <td><button className='input-like'>{background[3]}</button></td>
              <td><div className="upgrade-image"><img src={bracketR} alt="bracket" /></div></td>
              <td><label id="Reason" className='tooltip-text fantasy-text'>Reason</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(17)}>{upgrades[17]}</button></td>
              <td><button className='input-like'>{modifiers[17]}</button></td>
              <td><button className='input-like'>{expertises[17]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Learn" className='tooltip-text fantasy-text'>Learn</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(18)}>{upgrades[18]}</button></td>
              <td><button className='input-like'>{modifiers[18]}</button></td>
              <td><button className='input-like'>{expertises[18]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Deceive" className='tooltip-text fantasy-text'>Deceive</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(19)}>{upgrades[19]}</button></td>
              <td><button className='input-like'>{modifiers[19]}</button></td>
              <td><button className='input-like'>{expertises[19]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Impersonate" className='tooltip-text fantasy-text'>Impersonate</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(20)}>{upgrades[20]}</button></td>
              <td><button className='input-like'>{modifiers[20]}</button></td>
              <td><button className='input-like'>{expertises[20]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Command" className='tooltip-text fantasy-text'>Command</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(21)}>{upgrades[21]}</button></td>
              <td><button className='input-like'>{modifiers[21]}</button></td>
              <td><button className='input-like'>{expertises[21]}</button></td>
            </tr>
            <tr>
              <td><label id="Charisma" className='fantasy-text'>Charisma</label></td>
              <td><button className='input-like'>{natural[4]}</button></td>
              <td><button className='input-like'>{background[4]}</button></td>
              <td><div className="upgrade-image"><img src={bracketG} alt="bracket" /></div></td>
              <td><label id="Diplomacy" className='tooltip-text fantasy-text'>Diplomacy</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(22)}>{upgrades[22]}</button></td>
              <td><button className='input-like'>{modifiers[22]}</button></td>
              <td><button className='input-like'>{expertises[22]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Intimidation" className='tooltip-text fantasy-text'>Intimidation</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(23)}>{upgrades[23]}</button></td>
              <td><button className='input-like'>{modifiers[23]}</button></td>
              <td><button className='input-like'>{expertises[23]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Gather-Information" className='tooltip-text fantasy-text'>Gather Information</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(24)}>{upgrades[24]}</button></td>
              <td><button className='input-like'>{modifiers[24]}</button></td>
              <td><button className='input-like'>{expertises[24]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Artistic-Performance" className='tooltip-text fantasy-text'>Artistic Performance</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(25)}>{upgrades[25]}</button></td>
              <td><button className='input-like'>{modifiers[25]}</button></td>
              <td><button className='input-like'>{expertises[25]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="First-Aid" className='tooltip-text fantasy-text'>First Aid</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(26)}>{upgrades[26]}</button></td>
              <td><button className='input-like'>{modifiers[26]}</button></td>
              <td><button className='input-like'>{expertises[26]}</button></td>
            </tr>
            <tr>
              <td><label id="Erudition" className='fantasy-text'>Erudition</label></td>
              <td><button className='input-like'>{natural[5]}</button></td>
              <td><button className='input-like'>{background[5]}</button></td>
              <td><div className="upgrade-image upgrade-up"><img src={bracketUpR} alt="bracket" /></div></td>
              <td><label id="Medical-Treatment" className='tooltip-text fantasy-text'>Medical Treatment</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(27)}>{upgrades[27]}</button></td>
              <td><button className='input-like'>{modifiers[27]}</button></td>
              <td><button className='input-like'>{expertises[27]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Knowledge" className='tooltip-text fantasy-text'>Knowledge</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(28)}>{upgrades[28]}</button></td>
              <td><button className='input-like'>{modifiers[28]}</button></td>
              <td><button className='input-like'>{expertises[28]}</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><label id="Scholar-Acumen" className='tooltip-text fantasy-text'>Scholar Acumen</label></td>
              <td><button className='upgrade-input' onClick={() => upgrade(29)}>{upgrades[29]}</button></td>
              <td><button className='input-like'>{modifiers[29]}</button></td>
              <td><button className='input-like'>{expertises[29]}</button></td>
            </tr>
          </table>
          <div className='upgrade-border upgrade-expertise-1 mb-10 fadeIn'>
            <span>Dice thrown by Expertise level.</span>
            <ul className='fantasy-text'>
              <li>Untrained: 1</li>
              <li>Trained: 2</li>
              <li>Expert: 3</li>
              <li>Master: 4</li>
              <li>Legendary: 5</li>
            </ul>
          </div>
          <div className='upgrade-border upgrade-expertise-2 fadeIn'>
            <span>Expertise level by modifier.</span>
            <ul className='fantasy-text'>
              <li>0-4: Untrained</li>
              <li>5-9: Trained</li>
              <li>10-19: Expert</li>
              <li>20-29: Master</li>
              <li>30+: Legendary</li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default Upgrade;