import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

function SkillSelectionPage() {

    let navigate = useNavigate(); 
  
    const checkForm = (index) => {

        const skillInputs = document.querySelectorAll('#values' + index + ' th > input');
        let skills = [];

        skillInputs.forEach(input => {
            const value = parseInt(input.value);
            skills.push(value);
        });
        axios.post('http://127.0.0.1:5000/new', {
            athletics: skills[0],
            finesse: skills[1],
            practise: skills[2],
            cleverness: skills[3],
            charisma: skills[4],
            erudition: skills[5]
        })
        .then(response => {
            const id = response.data.id;
            let path = '/alignment/' + id; 
            navigate(path);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    };

    function getRandomNumber() {
        const randomNumber = Math.random();
        const scaledNumber = Math.floor(randomNumber * 6) + 1;
        
        return scaledNumber;
    }

  return (
    <>
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
        <p>Choose a set of Skills for the character.</p>
        <div className="fantasy-text">
            <div className="absolute-horizontal-center">
                <table className='centered-table'> 
                    <tr>
                        <th><label id="Athletics" className='tooltip-text'>Athletics</label></th>
                        <th><label id="Finesse" className='tooltip-text'>Finesse</label></th>
                        <th><label id="Practise" className='tooltip-text'>Practise</label></th>
                        <th><label id="Cleverness" className='tooltip-text'>Cleverness</label></th>
                        <th><label id="Charisma" className='tooltip-text'>Charisma</label></th>
                        <th><label id="Erudition" className='tooltip-text'>Erudition</label></th>
                    </tr>
                    <tr id="values1">
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><a href="#" className="button small-button normal-text" onClick={() => checkForm(1)}>Embrace</a></th>
                    </tr>
                    <tr id="values2">
                        <td colspan="7">
                            <hr/>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><a href="#" className="button small-button normal-text" onClick={() => checkForm(2)}>Embrace</a></th>
                        </td>
                    </tr>
                    <tr id="values3">
                        <td colspan="7">
                            <hr/>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><a href="#" className="button small-button normal-text" onClick={() => checkForm(3)}>Embrace</a></th>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </>
  );
}

export default SkillSelectionPage;