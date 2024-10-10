
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'
import './swap.css';
import { useNavigate } from "react-router-dom";

function Swap() {

  const { id } = useParams();
  let menu = `/custom/${id}`;
  let navigate = useNavigate();
  const [skills, setSkills] = useState(Array(12).fill(0));
  const [selected, setSelected] = useState(-1);
  const [oldSkills, setOldSkills] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/swap?id=${id}`)
      .then(response => {
        setSkills(response.data.skills);
        setOldSkills(response.data.skills.slice());
      })
      .catch(error => {
        console.error('Error getting data:', error);
      });
  }, []);

  function updateSkills() {
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

  const swap = (index) => {
    if (selected != -1) {
      let temp = skills[selected];
      skills[selected] = skills[index];
      skills[index] = temp;
      setPoints(points + 3);
      setSelected(-1);
    } else {
      setSelected(index);
    }
  }

  const reset = () => {
    setPoints(0);
    setSkills(oldSkills.slice());
  }

  return (
    <>
      <div className='custom-container'>
        <div className='fadeIn'>
          <h2>Swap Skills</h2>
          <p>Click two Natural/Background skills to swap them for three points.</p>
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
        <table className='centered-table swap-table fadeIn'>
          <tbody>
            <tr className='fantasy-text'>
              <th></th>
              <th><label id="Athletics" className='tooltip-text'>Athletics</label></th>
              <th><label id="Finesse" className='tooltip-text'>Finesse</label></th>
              <th><label id="Practise" className='tooltip-text'>Practise</label></th>
              <th><label id="Cleverness" className='tooltip-text'>Cleverness</label></th>
              <th><label id="Charisma" className='tooltip-text'>Charisma</label></th>
              <th><label id="Erudition" className='tooltip-text'>Erudition</label></th>
            </tr>
            <tr id="values1">
              <th><label>Natural</label></th>
              {skills.slice(0, 6).map((skill, index) => (
                <th key={index} onClick={() => swap(index)}>
                  <button
                    className={`swap-input ${selected == index ? 'swap-selected' : ''}`}
                  >{skill}</button>
                </th>
              ))}
            </tr>
            <tr id="values2">
              <th><label className='mr-10'>Background</label></th>
              {skills.slice(6, 12).map((skill, index) => (
                <th key={index + 6} onClick={() => swap(index + 6)}>
                  <button
                    className={`swap-input ${selected == index + 6 ? 'swap-selected' : ''}`}
                  >{skill}</button>
                </th>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <Tooltip anchorSelect="#Athletics" className="custom-tooltip" place="top">
        <p>Physical aptitude, vigour and endurance.</p>
      </Tooltip>
      <Tooltip anchorSelect="#Finesse" className="custom-tooltip" place="top">
        <p>Skill, dexterity and coordination.</p>
      </Tooltip>
      <Tooltip anchorSelect="#Practise" className="custom-tooltip" place="top">
        <p>Experience in practical tasks.</p>
      </Tooltip>
      <Tooltip anchorSelect="#Cleverness" className="custom-tooltip" place="top">
        <p>Reason, problem solving, ease of learning.</p>
      </Tooltip>
      <Tooltip anchorSelect="#Charisma" className="custom-tooltip" place="top">
        <p>Skilfull interaction with other Characters.</p>
      </Tooltip>
      <Tooltip anchorSelect="#Erudition" className="custom-tooltip" place="top">
        <p>Theoretical knowledge about the world.</p>
      </Tooltip>
    </>
  );
}

export default Swap;