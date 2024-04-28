import React from 'react';


function IntroCreate({ onCreateCharacterClick }) {
  return (
    <div className="button-container">
      <a href="#" className="button" onClick={onCreateCharacterClick}>
        Create Character
      </a>
    </div>
  );
}

export default IntroCreate;