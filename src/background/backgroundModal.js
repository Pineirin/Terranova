import React from 'react';
import { Tooltip } from 'react-tooltip'

function BackgroundModal({ id, showModal, modalType, replaceWeapon, replaceWeaponCategory, replaceMagicalPowers, closeModal, magicalPowers }) {

      function seededRandom(seed) {
            let state = seed;
            return function () {
                  // Algorithm to generate a pseudo-random number
                  state = (state * 9301 + 49297) % 233280;
                  return state / 233280;
            };
      }

      // Function to shuffle an array using Fisher-Yates algorithm
      function shuffleArray(array, randomFunc) {
            for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(randomFunc() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
      }

      // Function to generate a shuffled array [1, 2, 3, 4, 5, 6] with a given seed
      function getRandomArrayWithSeed(seed) {
            const array = [0, 1, 2, 3, 4, 5];
            // Create a seeded random function
            const randomFunc = seededRandom(seed);
            return shuffleArray(array, randomFunc);
      }


      function renderMagicModal(powers) {

            const selectedPowers = magicalPowersArray.map(index => powers[index]);
            const [power1, power2, power3, power4, power5, power6] = selectedPowers;

            const buildArgs = (powers) => powers.filter(Boolean).map(power => [power[0], power[2]]);
            const args = buildArgs([power1, power2, power3]);
            const args4 = [...args];
            const args5 = [...args];
            const args6 = [...args];

            power4 && args4.push([power4[0], power4[2]]);
            power5 && args5.push([power5[0], power5[2]]);
            power6 && args6.push([power6[0], power6[2]]);

            const renderPower = (power) => (
                  power && <><span id={power[0]} className="fantasy-text tooltip-text">{power[1][0]}</span> ({power[2]}+)</>
            );

            const renderTooltip = (power) => (
                  power && (
                        <Tooltip anchorSelect={`#${power[0]}`} className="custom-tooltip-large" place="top">
                              <div>
                                    <p className='tooltip-text-center'>{power[1][1].split("\n")[2]}</p>
                                    <p>{power[1][1].split("\n")[0]}</p>
                                    <p>{power[1][1].split("\n")[1]}</p>
                              </div>
                        </Tooltip>
                  )
            );

            return (
                  <>
                        <p>The Character starts the adventure knowing the following <span className="fantasy-text">Magical Powers</span> (with a<span id="casting-value" className="fantasy-text tooltip-text"> Casting Value</span>):</p>
                        <p>
                              {renderPower(power1)}{power1 && ","} {renderPower(power2)}{power2 && ","} {renderPower(power3)}
                        </p>
                        {(!power1 || !power2 || !power3) && (
                              <>
                                    <p>Furthermore, it may know one extra <span className="fantasy-text">Magical Power</span>:</p>
                                    <div className='modal-buttons-center'>
                                          <a href="#" id={power4[0]} className="button fantasy-text" onClick={() => replaceMagicalPowers(...args4)}>{power4[1][0]} ({power4[2]}+)</a>
                                          <a href="#" id={power5[0]} className="button fantasy-text ml-15" onClick={() => replaceMagicalPowers(...args5)}>{power5[1][0]} ({power5[2]}+)</a>
                                          <a href="#" id={power6[0]} className="button fantasy-text ml-15" onClick={() => replaceMagicalPowers(...args6)}>{power6[1][0]} ({power6[2]}+)</a>
                                    </div>
                              </>
                        )}
                        {power1 && power2 && power3 && (
                              <a href="#" className="button" onClick={() => replaceMagicalPowers(...args)}>Confirm</a>
                        )}
                        <Tooltip anchorSelect={`#casting-value`} className="custom-tooltip" place="top">
                              <p>The Casting Value is the number a player must beat with a D6 to successfully cast a Magical Power.</p>
                        </Tooltip>
                        {renderTooltip(power1)}
                        {renderTooltip(power2)}
                        {renderTooltip(power3)}
                        {renderTooltip(power4)}
                        {renderTooltip(power5)}
                        {renderTooltip(power6)}
                  </>
            );
      }

      const order = [
            ["aura_of_dismay", magicalPowers["aura_of_dismay"], 4],
            ["immobilise", magicalPowers["immobilise"], 3],
            ["blinding_light", magicalPowers["blinding_light"], 2],
            ["call_winds", magicalPowers["call_winds"], 3],
            ["enchanted_blades", magicalPowers["enchanted_blades"], 3],
      ];

      const chaos = [
            ["fury-x", magicalPowers["fury"], 4],
            ["transfix", magicalPowers["transfix"], 3],
            ["flameburst", magicalPowers["flameburst"], 4],
            ["wither", magicalPowers["wither"], 4],
            ["instill_fear", magicalPowers["instill_fear"], 5],
      ];

      const magicalPowersArray = getRandomArrayWithSeed(id);

      return (
            <>
                  {showModal && (
                        <div className="modal-overlay" onClick={closeModal}>
                              <div className="modal-content" onClick={e => e.stopPropagation()}>
                                    {modalType === "axe_or_sword" && (
                                          <>
                                                <p>Additionally, the Character starts with the weapon:</p>
                                                <div>
                                                      <a href="#" className="button fantasy-text" onClick={() => replaceWeapon("Sword or Axe", "Axe")}>Axe</a>
                                                      <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeapon("Sword or Axe", "Sword")}>Sword</a>
                                                </div>
                                          </>
                                    )}
                                    {modalType === "hand_weapon" && (
                                          <>
                                                <p>Additionally, the Character knows a weapon type and starts with the weapon:</p>
                                                <div>
                                                      <div className='modal-container'>
                                                            <p className='modal-text'>Bash weapons:</p>
                                                            <div className='modal-buttons'>
                                                                  <a href="#" className="button fantasy-text" onClick={() => replaceWeaponCategory("Any Hand weapon", "Hammer", "Any type of Hand weapon", "Hammer, Mace, Maul")}>Hammer</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Mace", "Any type of Hand weapon", "Hammer, Mace, Maul")}>Mace</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Maul", "Any type of Hand weapon", "Hammer, Mace, Maul")}>Maul</a>
                                                            </div>
                                                      </div>
                                                      <div className='modal-container'>
                                                            <p className='modal-text'>Feint/stab weapons:</p>
                                                            <div className='modal-buttons'>
                                                                  <a href="#" className="button fantasy-text" onClick={() => replaceWeaponCategory("Any Hand weapon", "Hammer", "Any type of Hand weapon", "Dagger, Sword")}>Dagger</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Mace", "Any type of Hand weapon", "Dagger, Sword")}>Sword</a>
                                                            </div>
                                                      </div>
                                                      <div className='modal-container'>
                                                            <p className='modal-text'>Piercing weapons:</p>
                                                            <div className='modal-buttons'>
                                                                  <a href="#" className="button fantasy-text" onClick={() => replaceWeaponCategory("Any Hand weapon", "Axe", "Any type of Hand weapon", "Axe, Pick")}>Axe</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Pick", "Any type of Hand weapon", "Axe, Pick")}>Pick</a>
                                                            </div>
                                                      </div>
                                                      <div className='modal-container'>
                                                            <p className='modal-text'>Stun weapons:</p>
                                                            <div className='modal-buttons'>
                                                                  <a href="#" className="button fantasy-text" onClick={() => replaceWeaponCategory("Any Hand weapon", "Club", "Any type of Hand weapon", "Club, Staff")}>Club</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Staff", "Any type of Hand weapon", "Club, Staff")}>Staff</a>
                                                            </div>
                                                      </div>
                                                      <div className='modal-container'>
                                                            <p className='modal-text'>Whirl weapons:</p>
                                                            <div className='modal-buttons'>
                                                                  <a href="#" className="button fantasy-text" onClick={() => replaceWeaponCategory("Any Hand weapon", "Flail", "Any type of Hand weapon", "Flail, Scourge, Whip")}>Flail</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Scourge", "Any type of Hand weapon", "Flail, Scourge, Whip")}>Scourge</a>
                                                                  <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeaponCategory("Any Hand weapon", "Whip", "Any type of Hand weapon", "Flail, Scourge, Whip")}>Whip</a>
                                                            </div>
                                                      </div>
                                                </div>
                                          </>
                                    )}
                                    {modalType === "order" && Object.keys(magicalPowers).length !== 0 && renderMagicModal(order)}
                                    {modalType === "chaos" && Object.keys(magicalPowers).length !== 0 && renderMagicModal(chaos)}
                              </div>
                        </div>
                  )}

            </>
      );
};



export default BackgroundModal;