import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

function SkillInputPage() {

    let navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState('');

    const checkForm = () => {
        const skillInputs = document.querySelectorAll('#values > th > input');
        let isValid = true;
        let skills = [];

        skillInputs.forEach(input => {
            const value = parseInt(input.value);
            if (isNaN(value) || value < 1 || value > 6) {
                isValid = false;
            }
            skills.push(value);
        });

        if (isValid){
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

        } else {
            setErrorMessage('Please enter numbers between 1 and 6 for all skills.');
        }
    };

    return (
        <>
            <p>Place the Skills given by the Game Master.</p>
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
            <div className="fantasy-text ">
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
                        <tr id='values'>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                        </tr>
                    </table>
                    {errorMessage && (
                    <div className="normal-text mt-10"><label>{errorMessage}</label></div>
                    )}
                    <div className="button-container normal-text">
                        <a href="#" className="button" onClick={() => checkForm()}>
                            Confirm Natural Skills
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SkillInputPage;