import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'

function BackgroundModal({ showModal, modalType, replaceWeapon, replaceWeaponCategory, closeModal }) {

      return (
            <>
                  {showModal && (
                        <div className="modal-overlay" onClick={closeModal}>
                              <div className="modal-content" onClick={e => e.stopPropagation()}>
                                    {modalType === "axe_or_sword" && (
                                          <>
                                                <p>The Character may start the adventure with one of the following weapons:</p>
                                                <div>
                                                      <a href="#" className="button fantasy-text" onClick={() => replaceWeapon("Sword or Axe", "Axe")}>Axe</a>
                                                      <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeapon("Sword or Axe", "Sword")}>Sword</a>
                                                </div>
                                          </>
                                    )}
                                    {modalType === "hand_weapon" && (
                                          <>
                                                <p>The Character may start the adventure with one of the following weapons:</p>
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
                                    {modalType === "order" && (
                                          <>
                                                <p>The Character may start the adventure with one of the following weapons:</p>
                                                <div>
                                                      <a href="#" className="button fantasy-text" onClick={() => replaceWeapon("Sword or Axe", "Axe")}>Axe</a>
                                                      <a href="#" className="button fantasy-text ml-15" onClick={() => replaceWeapon("Sword or Axe", "Sword")}>Sword</a>
                                                </div>
                                          </>
                                    )}
                              </div>
                        </div>
                  )}

            </>
      );
};



export default BackgroundModal;