import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SkillInputPage() {

    let navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState('');

    const checkForm = () => {
        const skillInputs = document.querySelectorAll('.form-group input');
        let isValid = true;

        skillInputs.forEach(input => {
            const value = parseInt(input.value);
            if (isNaN(value) || value < 1 || value > 6) {
                isValid = false;
            }
        });

        if (isValid){
            let path = '/alignment'; 
            navigate(path);
        } else {
            console.log("Aasd");
            setErrorMessage('Please enter numbers between 1 and 6 for all skills.');
        }
    };

    return (
        <>
            <p>Place the Skills given by the Game Master.</p>
            <div className="fantasy-text ">
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
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                            <th><input type="text" defaultValue="0"/></th>
                        </tr>
                    </table>
                    {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                    )}
                    <div className="button-container">
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