import React from 'react';
import { useNavigate } from "react-router-dom";

function SkillSelectionPage() {

    let navigate = useNavigate(); 
  
    const checkForm = (index) => {
        const skillInputs = document.querySelectorAll('.form-group input');

        skillInputs.forEach(input => {
            const value = parseInt(input.value);
        });

        let path = '/alignment'; 
        navigate(path);
    };

    function getRandomNumber() {
        const randomNumber = Math.random();
        const scaledNumber = Math.floor(randomNumber * 6) + 1;
        
        return scaledNumber;
    }

  return (
    <>
        <p>Choose a set of Skills for the character.</p>
        <div className="fantasy-text">
            <div className="absolute-horizontal-center">
                <table className='centered-table'> 
                    <tr>
                        <th><label>Athlectics</label></th>
                        <th><label>Finesse</label></th>
                        <th><label>Practise</label></th>
                        <th><label>Cleverness</label></th>
                        <th><label>Charisma</label></th>
                        <th><label>Erudition</label></th>
                    </tr>
                    <tr>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><input type="text" value={getRandomNumber()} disabled/></th>
                        <th><a href="#" className="button select-button" onClick={() => checkForm(1)}>Embrace</a></th>
                    </tr>
                    <tr>
                        <td colspan="7">
                            <hr/>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><a href="#" className="button select-button" onClick={() => checkForm(1)}>Embrace</a></th>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">
                            <hr/>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><input type="text" value={getRandomNumber()} disabled/></th>
                            <th><a href="#" className="button select-button" onClick={() => checkForm(1)}>Embrace</a></th>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </>
  );
}

export default SkillSelectionPage;