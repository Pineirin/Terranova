import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'

function Background({ id, title, onClick, move, fight, shoot, lethality, defence, attacks, wounds, courage, might, will, fate, athletics, finesse, practise, cleverness, charisma, erudition, info, alignment, tribe, requiredAlignments, requiredTribes, requiredAlignment, requiredTribe, wargear, knownWargear, adept, points, modal }) {

      const [expanded, setExpanded] = useState(false);

      let specialRules = info[0];
      let heroicActions = info[1];

      let validTribe = false;
      let validAlignment = false;
      let valid = false;

      if (requiredAlignments.includes(alignment)) {
            validAlignment = true
      }
      if (requiredTribes.includes(tribe)) {
            validTribe = true
      }
      if (validTribe && validAlignment) {
            valid = true
      }

      const handleButtonClick = (event) => {
            event.stopPropagation();
            setExpanded(!expanded)
      };

      return (
            <>
                  <div onClick={() => onClick(move, fight, shoot, lethality, defence, attacks, wounds, courage, might, will, fate, athletics, finesse, practise, cleverness, charisma, erudition, wargear, knownWargear, adept, points, valid, Object.keys(specialRules), Object.keys(heroicActions), modal)} className={"position-relative width-20 height-100 fade-in " + (valid ? `panel ` : `panel-disabled`)}>
                        <h2>{title}</h2>
                        <div className='background-container fantasy-text'>
                              <div className='background-section background-points'>
                                    <h3>{points} points</h3>
                              </div>
                              <div className='background-section background-requirements'>
                                    <div>
                                          <p className={validAlignment ? `` : `red`}>Required Alignment: <span className="fantasy-text">{requiredAlignment}</span></p>
                                          <p className={validTribe ? `` : `red`}>Required Tribe: <span className="fantasy-text">{requiredTribe}</span></p>
                                    </div>
                              </div>
                              <div className={'background-section background-combat' + (expanded ? '' : ' hidden')}>
                                    <h3>Combat Characteristics</h3>
                                    <div className='background-stats-container'>
                                          <div className='background-labels'>
                                                <label id={`Move${id}`} className='tooltip-text'>Move</label>
                                                <label id={`Fight${id}`} className='tooltip-text'>Fight</label>
                                                <label id={`Shoot${id}`} className='tooltip-text'>Shoot</label>
                                                <label id={`Lethality${id}`} className='tooltip-text'>Lethality</label>
                                                <label id={`Defence${id}`} className='tooltip-text'>Defence</label>
                                                <label id={`Attacks${id}`} className='tooltip-text'>Attacks</label>
                                                <label id={`Wounds${id}`} className='tooltip-text'>Wounds</label>
                                                <label id={`Courage${id}`} className='tooltip-text'>Courage</label>
                                                <label id={`Might${id}`} className='tooltip-text'>Might</label>
                                                <label id={`Will${id}`} className='tooltip-text'>Will</label>
                                                <label id={`Fate${id}`} className='tooltip-text'>Fate</label>
                                          </div>
                                          <div className='background-stats'>
                                                <label>{move}</label>
                                                <label>{fight}</label>
                                                <label>{shoot}</label>
                                                <label>{lethality}</label>
                                                <label>{defence}</label>
                                                <label>{attacks}</label>
                                                <label>{wounds}</label>
                                                <label>{courage}</label>
                                                <label>{might}</label>
                                                <label>{will}</label>
                                                <label>{fate}</label>
                                          </div>
                                    </div>
                              </div>
                              <div className={'background-section background-skills' + (expanded ? '' : ' hidden')}>
                                    <h3>Background Skills</h3>
                                    <div className='background-stats-container'>
                                          <div className='background-labels'>
                                                <label>Athletics</label>
                                                <label>Finesse</label>
                                                <label>Practise</label>
                                                <label>Cleverness</label>
                                                <label>Charisma</label>
                                                <label>Erudition</label>
                                          </div>
                                          <div className='background-stats'>
                                                <label>{athletics}</label>
                                                <label>{finesse}</label>
                                                <label>{practise}</label>
                                                <label>{cleverness}</label>
                                                <label>{charisma}</label>
                                                <label>{erudition}</label>
                                          </div>
                                    </div>
                              </div>
                              <div className={'background-section background-special' + (expanded ? '' : ' hidden')}>
                                    <h3>Special Rules</h3>
                                    <p>
                                          {Object.entries(specialRules).map(([key, value], index, array) => (
                                                <React.Fragment key={key}>
                                                      {tribe && (
                                                            <span id={`${key + id}`} className="tooltip-text">
                                                                  {value[0]}
                                                            </span>
                                                      )}
                                                      {tribe && index < array.length - 1 && ", "}
                                                </React.Fragment>
                                          ))}
                                    </p>
                              </div>
                              <div className={'background-section background-heroic' + (expanded ? '' : ' hidden')}>
                                    <h3>Heroic Actions</h3>
                                    <p>
                                          {Object.entries(heroicActions).map(([key, value], index, array) => (
                                                <React.Fragment key={key}>
                                                      {tribe && (
                                                            <span id={`${key + id}`} className="tooltip-text">
                                                                  {value[0]}
                                                            </span>
                                                      )}
                                                      {tribe && index < array.length - 1 && ", "}
                                                </React.Fragment>
                                          ))}
                                    </p>
                              </div>
                              <div className={'background-section background-wargear' + (expanded ? '' : ' hidden')}>
                                    <h3>Wargear</h3>
                                    <p>{wargear}</p>
                              </div>
                              <div className={'background-section background-known-wargear' + (expanded ? '' : ' hidden')}>
                                    <h3>Known Wargear</h3>
                                    <p>{knownWargear}</p>
                              </div>
                              <div className={'background-section background-adept' + (expanded ? '' : ' hidden')} >
                                    <p>Adept: {adept}</p>
                              </div>
                              <button onClick={handleButtonClick} className={'background-button' + (expanded ? ' less' : ' more')}>
                                    <span className="fantasy-text">{expanded ? '-' : '+'}</span>
                              </button>

                        </div>
                  </div>

                  <Tooltip anchorSelect={`#Move${id}`} className="custom-tooltip" place="top">
                        <p>Movement (in m) a Character can do in a combat round.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Fight${id}`} className="custom-tooltip" place="top">
                        <p>In a tie in a Duel, the side with the higher fight wins.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Shoot${id}`} className="custom-tooltip" place="top">
                        <p>Value Characters need to beat (with a D6) to land their ranged attacks.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Lethality${id}`} className="custom-tooltip" place="top">
                        <p>Increases the probabilty of wounding foes in a melee fight.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Defence${id}`} className="custom-tooltip" place="top">
                        <p>Increases the probabilty of avoiding any wound.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Attacks${id}`} className="custom-tooltip" place="top">
                        <p>Number of dice rolled to win a Duel and wound the enemy (upon winning the Duel).</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Wounds${id}`} className="custom-tooltip" place="top">
                        <p>Number of times the character can be wounded before getting incapacitated.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Courage${id}`} className="custom-tooltip" place="top">
                        <p>Increases the probability of charging terrifying enemies and staying in combat against the odds.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Might${id}`} className="custom-tooltip" place="top">
                        <p>Allows to modify each dice throwed by the player (1 by each Might spent) and to call Heroic Actions.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Will${id}`} className="custom-tooltip" place="top">
                        <p>Used to cast and resit Magical Powers, it also allows to improve Courage Tests.</p>
                  </Tooltip>
                  <Tooltip anchorSelect={`#Fate${id}`} className="custom-tooltip" place="top">
                        <p>Used to miraculously avoid wounds.</p>
                  </Tooltip>
                  {Object.entries(specialRules).map(([key, value]) => (
                        <>{tribe && (
                              <Tooltip key={key} anchorSelect={`#${key + id}`} className="custom-tooltip" place="top">
                                    <p>{value[1]}</p>
                              </Tooltip>
                        )}</>
                  ))}
                  {Object.entries(heroicActions).map(([key, value]) => (
                        <>{tribe && (
                              <Tooltip key={key} anchorSelect={`#${key + id}`} className="custom-tooltip" place="top">
                                    <p>{value[1]}</p>
                              </Tooltip>
                        )}</>
                  ))}

            </>
      );
};



export default Background;