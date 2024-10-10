import React, { useEffect, useState } from 'react';
import './background.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import Background from "./background.js"
import BackgroundModal from "./backgroundModal.js"

function Backgrounds() {
  const { id } = useParams();
  let navigate = useNavigate();
  let back = `/tribe/${id}`;

  let specialRulesParam = "scout;local_knowledge;mercenary;loyalty_is_fleeting;sage;shaman;vagabond;hardy;wanderer;mountain_dweller;woodland_creature;warrior;chieftain;hatred;wildman"
  let heroicActionsParam = "heroic_movement;heroic_shoot;heroic_combat;heroic_march"
  let magicalPowersParam = "aura_of_dismay;immobilise;blinding_light;call_winds;enchanted_blades;fury;transfix;flameburst;wither;instill_fear"
  const [specialRules, setSpecialRules] = useState({});
  const [heroicActions, setHeroicActions] = useState({});
  const [magicalPowers, setMagicalPowers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [alignment, setAlignment] = useState("");
  const [tribe, setTribe] = useState("");
  const [race, setRace] = useState("");
  const [modalType, setModalType] = useState("");
  const [storedParams, setStoredParams] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(false);


  useEffect(() => {
    if (shouldUpdate) {
      updateBackgroundRequest(storedParams);
      setShouldUpdate(false);
    }
  }, [storedParams, shouldUpdate]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/background?id=${id}&specialRules=${specialRulesParam}&heroicActions=${heroicActionsParam}&magicalPowers=${magicalPowersParam}`)
      .then(response => {
        let tribe = response.data.tribe;
        let race = "";
        if (tribe === "Sedetani" || tribe === "Origak" || tribe === "Gairk" || tribe === "Salayk" || tribe === "Anteran") {
          race = "Human";
        } else if (tribe === "Halfvergar") {
          race = "Dvergar";
        } else if (tribe === "Chaun") {
          race = "Chaun";
        } else if (tribe === "Yoreblin" || tribe === "Halfblin" || tribe === "Greblon") {
          race = "Goblin";
        } else if (tribe === "Child of Lugnasad" || tribe === "Child of Samhain" || tribe === "Child of Imbolc" || tribe === "Child of Beltane") {
          race = "Sidhe";
        }
        let magicalPowers = response.data.magicalPowers;
        let fury = magicalPowers["fury"];
        fury[0] += ` (${race})`;
        fury[1] = fury[1].replace(" X ", ` ${race} `);
        magicalPowers["fury"] = fury;

        setSpecialRules(response.data.specialRules);
        setHeroicActions(response.data.heroicActions);
        setRace(race)
        setMagicalPowers(magicalPowers);
        setTribe(tribe);
        setAlignment(response.data.alignment);
      })
      .catch(error => {
        console.error('Error getting data:', error);
      });
  }, []);

  function getContent(content, special) {
    let ret = {};
    content.forEach(function (element) {
      if (special) {
        if (Array.isArray(element)) {
          if (Object.keys(specialRules).length == 0) {
            return;
          }
          let key = `${element[0]}-${element[1]}`;
          let temp = [...specialRules[element[0]]];
          temp[0] = temp[0].replace("X", element[1])
          temp[1] = temp[1].replace("X", element[1])
          ret[key] = temp
        } else {
          ret[element] = specialRules[element];
        }
      } else {
        ret[element] = heroicActions[element]
      }

    });
    return ret;
  }

  const updateBackground = (
    background, move, fight, shoot, lethality, defence, attacks, wounds, courage, might, will, fate, athletics, finesse, practise, cleverness, charisma, erudition, wargear, knownWargear, adept, points, valid, specialRules, heroicActions, magicalPowers, modal
  ) => {
    const params = {
      background, move, fight, shoot, lethality, defence, attacks, wounds, courage, might, will, fate, athletics, finesse, practise, cleverness, charisma, erudition, wargear, knownWargear, adept, points, valid, specialRules, heroicActions, magicalPowers
    };

    if (valid) {
      if (modal) {
        setModalType(modal);
        setShowModal(true);
        setStoredParams(params);
      } else {
        updateBackgroundRequest(params);
      }
    }
  };

  const replaceWeapon = (text, weapon) => {
    setStoredParams(prevParams => ({
      ...prevParams,
      wargear: prevParams.wargear.replace(text, weapon)
    }));
    setShouldUpdate(true);
    closeModal();
  }

  const replaceWeaponCategory = (text, weapon, text2, weapons) => {
    setStoredParams(prevParams => ({
      ...prevParams,
      wargear: prevParams.wargear.replace(text, weapon)
    }));
    setStoredParams(prevParams => ({
      ...prevParams,
      knownWargear: prevParams.knownWargear.replace(text2, weapons)
    }));
    setShouldUpdate(true);
    closeModal();
  }

  const updatePower = (power) => {
    if (power[0].includes("-")) {
      const temp = power[0].split("-");
      power[0] = temp[0];
      power[2] = race;
    }
    return power;
  };

  const replaceMagicalPowers = (power1, power2, power3) => {
    const powers = [power1, power2, power3].map(power => updatePower(power));
    setStoredParams(prevParams => ({
      ...prevParams,
      magicalPowers: powers
    }));

    setShouldUpdate(true);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function updateBackgroundRequest(params) {
    const {
      background, move, fight, shoot, lethality, defence, attacks, wounds, courage,
      might, will, fate, athletics, finesse, practise, cleverness, charisma,
      erudition, wargear, knownWargear, adept, points, valid, specialRules,
      heroicActions, magicalPowers
    } = params;
    if (valid) {
      axios.put('http://127.0.0.1:5000/background', {
        background: background,
        move: move,
        fight: fight,
        shoot: shoot,
        lethality: lethality,
        defence: defence,
        attacks: attacks,
        wounds: wounds,
        courage: courage,
        might: might,
        will: will,
        fate: fate,
        athletics: athletics,
        finesse: finesse,
        practise: practise,
        cleverness: cleverness,
        charisma: charisma,
        erudition: erudition,
        wargear: wargear,
        knownWargear: knownWargear,
        adept: adept,
        points: points,
        specialRules: specialRules,
        heroicActions: heroicActions,
        magicalPowers: magicalPowers,
        id: id,
      })
        .then(response => {
          let path = `/custom/${id}`;
          navigate(path);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    }
  }

  let localScout = [getContent(["scout", "local_knowledge"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)];
  let mercenaryFighter = [getContent(["mercenary", "loyalty_is_fleeting"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let sage = [getContent(["sage"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let shaman = [getContent(["shaman"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let vagabond = [getContent(["vagabond", "hardy"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let wandering_dwarf = [getContent(["wanderer", "mountain_dweller"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let wandering_sidhe = [getContent(["wanderer", "woodland_creature"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let captain = [getContent(["wanderer", "woodland_creature"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat", "heroic_march"], false)]
  let warrior_order = [getContent(["warrior"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let chieftain = [getContent(["chieftain"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat", "heroic_march"], false)]
  let warrior_chaos = [getContent(["warrior"], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let wildman = [getContent(["wildman", ["hatred", "Sedetani"], ["hatred", "Anterans"]], true), getContent(["heroic_movement", "heroic_shoot", "heroic_combat"], false)]
  let customMovement = ["Chaun"].includes(tribe) ? 4 : ["Yoreblin", "Halfvergar"].includes(tribe) ? 5 : 6;

  return (
    <>
      <div className='navigation-buttons'>
        <a href={back} className="button small-button">
          Back
        </a>
        <a href="/" className="button small-button ml-15">
          Home
        </a>
      </div>
      <div className='fadeIn'>
        <h1>Martial Background</h1>
        <p className='medium-margins'>Whilst the <span className="fantasy-text">Tribe</span> is the most important aspect of the identity of a Character, the <span className="fantasy-text">Martial Background</span> defines the skills, specially in combat, of each new Character. The <span className="fantasy-text">Martial Background</span> doesn't represent the previous occupation of the Character; the previous occupation is flavor and should be freely decided by the player, as long as it fits the narrative of the campaign. Instead, a <span className="fantasy-text">Martial Background</span> represent an occupation the Character had for at least a year who gave it above average combat skills.</p>

        <p className='medium-margins'><span className="fantasy-text">Martial Backgrounds</span> are deeply imbalanced, with each one offering a different point cost in accordance with its power. Each <span className="fantasy-text">Martial Background</span> will offer for its cost <span id="combat-characteristics" className="fantasy-text tooltip-text">Combat Characteristics</span>, <span id="background-skills" className="fantasy-text tooltip-text">Background Skills</span>, <span id="wargear" className="fantasy-text tooltip-text">Wargear</span>, <span id="known-wargear" className="fantasy-text tooltip-text">Known Wargear</span>, an <span id="adept" className="fantasy-text tooltip-text">Adept</span> type and some <span id="special-rules" className="fantasy-text tooltip-text">Special Rules</span> and <span id="heroic-actions" className="fantasy-text tooltip-text">Heroic Actions</span>.</p>

        <Tooltip anchorSelect="#combat-characteristics" className="custom-tooltip" place="top">
          <p>The combat characteristics define how much a Character may move and it's performance in melee and ranged combat, it also defines its resistance to damange and its Might.</p>
        </Tooltip>
        <Tooltip anchorSelect="#background-skills" className="custom-tooltip" place="top">
          <p>Together with Natural Skills, Background Skills give each Skill its base value.</p>
        </Tooltip>
        <Tooltip anchorSelect="#special-rules" className="custom-tooltip" place="top">
          <p>Special Rules are the core of chararacter progression. They provide passive or active abilities.</p>
        </Tooltip>
        <Tooltip anchorSelect="#heroic-actions" className="custom-tooltip" place="top">
          <p>Heroic Actions are active actions that Heroes may use at the cost of Might.</p>
        </Tooltip>
        <Tooltip anchorSelect="#wargear" className="custom-tooltip" place="top">
          <p>Martial equipment the Character has available.</p>
        </Tooltip>
        <Tooltip anchorSelect="#known-wargear" className="custom-tooltip" place="top">
          <p>Martial equipment the Character knowns to use.</p>
        </Tooltip>
        <Tooltip anchorSelect="#adept" className="custom-tooltip" place="top">
          <p>There are three types of Adept: Martial, Magical and Shapeshifter. Martial adepts may learn to use new wargear, Magical adapts may learn new Magical Powers and Shapeshifters may learn new animal Shapes. Most characters will be one type of adept, but it is possible to have hybrid characters.</p>
        </Tooltip>
        <div className="backgrounds-container">
          <Background id="1" onClick={updateBackground} title="Local Scout" move="6" fight="3" shoot="4" lethality="3" defence="3" attacks="1" wounds="1" courage="2" might="1" will="1" fate="1" athletics="5" finesse="4" practise="6" cleverness="3" charisma="2" erudition="1" info={localScout} alignment={alignment} tribe={tribe} wargear="Dagger, Bow" knownWargear="Dagger, Sword, Bow" adept="Martial" requiredAlignments={["Order", "Chaos", "Neutral"]} requiredTribes={["Sedetani", "Origak", "Gairk", "Salayk", "Anteran"]} requiredAlignment="Any" requiredTribe="Human" points="4" />
          <Background id="2" onClick={updateBackground} title="Mercenary Fighter" move={customMovement} fight="4" shoot="4" lethality="4" defence="4" attacks="2" wounds="2" courage="4" might="2" will="2" fate="2" athletics="6" finesse="3" practise="5" cleverness="2" charisma="4" erudition="1" info={mercenaryFighter} alignment={alignment} tribe={tribe} wargear="Any Hand weapon, Armour" knownWargear="Any type of Hand weapon, Armour, Shield" adept="Martial" requiredAlignments={["Order", "Chaos", "Neutral"]} requiredTribes={["Sedetani", "Origak", "Gairk", "Salayk", "Anteran", "Halfvergar", "Chaun", "Yoreblin", "Halfblin", "Greblon", "Child of Lugnasad", "Child of Samhain", "Child of Imbolc", "Child of Beltane"]} requiredAlignment="Any" requiredTribe="Any" points="40" modal="hand_weapon" />
          <Background id="3" onClick={updateBackground} title="Sage" move="6" fight="3" shoot="4" lethality="3" defence="3" attacks="1" wounds="2" courage="6" might="2" will="4" fate="2" athletics="1" finesse="3" practise="2" cleverness="5" charisma="4" erudition="6" info={sage} alignment={alignment} tribe={tribe} wargear="Dagger, Two-handed staff" knownWargear="Dagger, Sword, Two-handed staff, Two-handed club" adept="Magical" requiredAlignments={["Order"]} requiredTribes={["Sedetani", "Origak", "Gairk", "Salayk", "Anteran"]} requiredAlignment="Order" requiredTribe="Human" points="50" modal="order" />
          <Background id="4" onClick={updateBackground} title="Shaman" move={customMovement} fight="3" shoot="4" lethality="3" defence="3" attacks="1" wounds="2" courage="4" might="2" will="4" fate="2" athletics="1" finesse="3" practise="2" cleverness="4" charisma="5" erudition="6" info={shaman} alignment={alignment} tribe={tribe} wargear="Dagger, Staff" knownWargear="Dagger, Sword, Staff, Club" adept="Magical" requiredAlignments={["Chaos"]} requiredTribes={["Sedetani", "Origak", "Gairk", "Salayk", "Anteran", "Yoreblin", "Halfblin", "Greblon"]} requiredAlignment="Chaos" requiredTribe="Human or Goblin" points="50" modal="chaos" />
          <Background id="5" onClick={updateBackground} title="Vagabond" move="6" fight="2" shoot="5" lethality="3" defence="3" attacks="1" wounds="1" courage="3" might="1" will="1" fate="1" athletics="5" finesse="4" practise="6" cleverness="3" charisma="1" erudition="2" info={vagabond} alignment={alignment} tribe={tribe} wargear="Dagger" knownWargear="Dagger, Sword" adept="Martial" requiredAlignments={["Order", "Chaos", "Neutral"]} requiredTribes={["Sedetani", "Origak", "Gairk", "Salayk", "Anteran"]} requiredAlignment="Any" requiredTribe="Human" points="3" />
          <Background id="6" onClick={updateBackground} title="Wandering Dwarf" move="6" fight="5" shoot="3" lethality="4" defence="5" attacks="2" wounds="2" courage="5" might="2" will="2" fate="2" athletics="5" finesse="3" practise="6" cleverness="4" charisma="1" erudition="2" info={wandering_dwarf} alignment={alignment} tribe={tribe} wargear="Axe, Shield" knownWargear="Axe, Pick, Shield" adept="Martial" requiredAlignments={["Order"]} requiredTribes={["Halfvergar"]} requiredAlignment="Order" requiredTribe="Medvergar" points="50" />
          <Background id="6" onClick={updateBackground} title="Wandering Sidhe" move="6" fight="6" shoot="3" lethality="4" defence="4" attacks="2" wounds="2" courage="6" might="2" will="2" fate="2" athletics="6" finesse="3" practise="2" cleverness="5" charisma="4" erudition="1" info={wandering_sidhe} alignment={alignment} tribe={tribe} wargear="Sidhe bastard sword, Sidhe Bow" knownWargear="Sidhe bastard dagger, Sidhe bastard sword, Sidhe Bow" adept="Martial" requiredAlignments={["Order"]} requiredTribes={["Child of Lugnasad", "Child of Samhain", "Child of Imbolc", "Child of Beltane"]} requiredAlignment="Order" requiredTribe="Sidhe" points="50" />
          <Background id="7" onClick={updateBackground} title="Captain" move="6" fight="4" shoot="4" lethality="4" defence="4" attacks="2" wounds="2" courage="4" might="3" will="2" fate="2" athletics="5" finesse="1" practise="2" cleverness="4" charisma="6" erudition="3" info={captain} alignment={alignment} tribe={tribe} wargear="Armour, Sword or Axe" knownWargear="Amour, Dagger, Sword, Axe, Pick, Horse, Bow, Heavy Armour, Shield, Throwing spears" adept="Martial" requiredAlignments={["Order"]} requiredTribes={["Sedetani", "Anteran"]} requiredAlignment="Order" requiredTribe="Sedetani or Anteran" points="45" modal="axe_or_sword" />
          <Background id="8" onClick={updateBackground} title="Warrior (order)" move="6" fight="3" shoot="4" lethality="3" defence="3" attacks="1" wounds="1" courage="3" might="1" will="1" fate="1" athletics="6" finesse="4" practise="5" cleverness="2" charisma="3" erudition="1" info={warrior_order} alignment={alignment} tribe={tribe} wargear="Armour, Sword or Axe" knownWargear="Armour, Sword, Dagger, Axe, Pick, Shield, Bow, Throwing Spears, Banner, War horn" adept="Martial" requiredAlignments={["Order"]} requiredTribes={["Sedetani", "Anteran"]} requiredAlignment="Order" requiredTribe="Sedetani or Anteran" points="6" modal="axe_or_sword" />
          <Background id="9" onClick={updateBackground} title="Chieftain" move="6" fight="4" shoot="4" lethality="5" defence="4" attacks="2" wounds="2" courage="4" might="3" will="3" fate="2" athletics="5" finesse="1" practise="4" cleverness="3" charisma="6" erudition="2" info={chieftain} alignment={alignment} tribe={tribe} wargear="Armour, Dagger, Two-handed axe" knownWargear="Armour, Dagger, Sword, Axe, Pick, Shield, Two-handed axe, Two-handed pick, Bow" adept="Martial" requiredAlignments={["Chaos"]} requiredTribes={["Salayk"]} requiredAlignment="Chaos" requiredTribe="Salayk" points="55" />
          <Background id="10" onClick={updateBackground} title="Warrior (Chaos)" move="6" fight="3" shoot="4" lethality="4" defence="3" attacks="1" wounds="1" courage="3" might="1" will="1" fate="1" athletics="6" finesse="4" practise="5" cleverness="2" charisma="3" erudition="1" info={warrior_chaos} alignment={alignment} tribe={tribe} wargear="Armour, Axe" knownWargear="Armour, Shield, Pick, Axe, Dagger, Sword, Bow, Two-handed axe, Two-handed pick, Banner" adept="Martial" requiredAlignments={["Chaos"]} requiredTribes={["Salayk"]} requiredAlignment="Chaos" requiredTribe="Salayk" points="7" />
          <Background id="11" onClick={updateBackground} title="Wildman" move="6" fight="3" shoot="4" lethality="3" defence="3" attacks="1" wounds="1" courage="3" might="1" will="1" fate="1" athletics="5" finesse="4" practise="6" cleverness="3" charisma="2" erudition="1" info={wildman} alignment={alignment} tribe={tribe} wargear="Sword or Axe" knownWargear="Dagger, Sword, Axe, Pick, Two-handed axe, Two-handed pick" adept="Martial" requiredAlignments={["Chaos"]} requiredTribes={["Salayk"]} requiredAlignment="Chaos" requiredTribe="Salayk" points="5" modal="axe_or_sword" />
        </div>
      </div>
      <BackgroundModal id={id} showModal={showModal} modalType={modalType} replaceWeapon={replaceWeapon} replaceMagicalPowers={replaceMagicalPowers} replaceWeaponCategory={replaceWeaponCategory} closeModal={closeModal} magicalPowers={magicalPowers} />
    </>
  );
};

export default Backgrounds;