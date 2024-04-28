import React, { useState } from 'react';
import intro1 from './intro1.jpg';
import intro2 from './intro2.jpg';
import intro3 from './intro3.jpg';
import intro4 from './intro4.jpg';
import './intro.css';
import MainPage from './mainPage';
import DescriptionPage from './descriptionPage';
import SkillOptionPage from './skillOptionPage';
import SkillSelectionPage from './skillSelectionPage';
import SkillInputPage from './skillInputPage';


function Intro() {

    const [activePage, setActivePage] = useState(0);

    const changeActivePage = (index) => {
        setActivePage(index);
    };

    const pages = [
        <MainPage key={0} index={0} isActive={activePage === 0} onChangeActivePage={changeActivePage} />,
        <DescriptionPage key={1} index={1} isActive={activePage === 1} onChangeActivePage={changeActivePage} />,
        <SkillOptionPage key={2} index={2} isActive={activePage === 2} onChangeActivePage={changeActivePage} />,
        <SkillInputPage key={3} index={3} isActive={activePage === 3} onChangeActivePage={changeActivePage} />,
        <SkillSelectionPage key={4} index={4} isActive={activePage === 4} onChangeActivePage={changeActivePage} />
    ];

    const activePageComponent = pages.find(child => child.props.isActive);

  return (
    <div className="grid-container">
      <div className="left-image"><img src={intro3} alt="Imagen 1" className="image" /></div>
      <div className="content">
        <h1>Adventurers of Terranova</h1>
        {activePageComponent}
      </div>
      <div className="rigth-image"><img src={intro1} alt="Imagen 2" className="image" /></div>
      <div className="bottom-left-image"><img src={intro4} alt="Imagen 3" className="image" /></div>
      <div className="bottom-right-image"><img src={intro2} alt="Imagen 4" className="image" /></div>
    </div>
  );
}

export default Intro;