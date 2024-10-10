
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import './injury.css';
import { useNavigate } from "react-router-dom";
import armWound from './arm_wound.jpg';
import legWound from './leg_wound.jpg';
import oldBattleWound from './old_battle_wound.jpg';


function Injury() {

  const { id } = useParams();
  let menu = `/custom/${id}`;
  let navigate = useNavigate();
  const [skills, setSkills] = useState(Array(12).fill(0));
  const [selected, setSelected] = useState(-1);
  const [oldSkills, setOldSkills] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/injury`)
      .then(response => {
        setSkills(response.data.skills);
        setOldSkills(response.data.skills.slice());
      })
      .catch(error => {
        console.error('Error getting data:', error);
      });
  }, []);

  function AddInjury() {
    if (points > 0) {
      axios.put('http://127.0.0.1:5000/swap', {
        skills: skills,
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

  return (
    <>
      <div className='custom-container'>
        <div className='fadeIn'>
          <h2>Suffer Injury</h2>
          <p>This Character may start its adventure with a permanent injury and gain points.</p>
          <div className='custom-options fadeIn'>
            <a href={menu} className="button">
              Cancel
            </a>
          </div>
          <div>
            <div onClick className="panel width-20 fadeIn">
              <h2>Arm Wound</h2>
              <img src={armWound} alt="Arm Wound" className='panel-image' />
            </div>
          </div>
          <div>
            <div onClick className="panel width-20 fadeIn">
              <h2>Leg Wound</h2>
              <img src={legWound} alt="Leg Wound" className='panel-image' />
            </div>
          </div>
          <div>
            <div onClick className="panel width-20 fadeIn">
              <h2>Old Battle Wound</h2>
              <img src={oldBattleWound} alt="Old Battle Wound" className='panel-image' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Injury;