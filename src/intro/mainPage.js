import React from 'react';



function MainPage({ index, isActive, onChangeActivePage }) {

  return (
    <>
        <p>Welcome adventurer! Create your character for the world of Terranova.</p>
        <div className="button-container">
            <a href="#" className="button" onClick={() => onChangeActivePage(1)}>
                Create Character
            </a>
        </div>
    </>
  );
}

export default MainPage;