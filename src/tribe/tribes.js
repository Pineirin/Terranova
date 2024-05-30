import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Race from './race';
import './tribe.css';
import axios from 'axios';
import Tribe from './tribe';
import { Tooltip } from 'react-tooltip'

import Sedetanos from "./sedetanos.png"
import Gearcos from "./gearcos.png"
import Aurigacos from "./aurigacos.png"
import Salaicos from "./salaicos.png"
import Humanos from "./humanos.png"
import Anteros from "./anteros.png"
import Medvergars from "./medvergars.png"
import Chauns from "./chauns.png"
import Goblins from "./goblins.png"
import Trasgos from "./trasgos.png"
import Semitrasgos from "./semitrasgos.png"
import Tragnos from "./tragnos.png"
import HijosInvierno from "./hijos_invierno.png"
import HijosOtoño from "./hijos_otoño.png"
import HijosPrimavera from "./hijos_primavera.png"
import HijosVerano from "./hijos_verano.png"
import DarkSidhe from "./dark_sidhe.png"
import LightSidhe from "./light_sidhe.png"

function Tribes() {
  const { id } = useParams();
  let navigate = useNavigate();
  let back = `/alignment/${id}`;

  let specialRulesParam = "stand_together;forth_riders;master_skirmisher;skilled_duelist;frenzied_fighter;treacherous;brawler;you_shall_taste_chaos;to_battle;unrivalled_allies;blessing_of_the_sidhe;sidhe_fighting_style;protect_our_borders;for_the_motherland"
  const [specialRules, setSpecialRules] = useState({});
  const [alignment, setAlignment] = useState("");

  function getContent(content) {
    let rule = specialRules[content];
    if (rule) {
      return [rule[0], content, rule[1]];
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/tribe?id=${id}&specialRules=${specialRulesParam}`)
      .then(response => {
        setSpecialRules(response.data.specialRules);
        setAlignment(response.data.alignment);
      })
      .catch(error => {
        console.error('Error getting data:', error);
      });
  }, []);

  function updateTribe(tribe, specialRule, valid) {
    if (valid && specialRule) {
      axios.put('http://127.0.0.1:5000/tribe', {
        tribe: tribe,
        special_rule: specialRule,
        id: id,
      })
        .then(response => {
          let path = `/background/${id}`;
          navigate(path);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    }
  }

  let humans =
    <>
      <Tribe title="Sedetanos/Sedetani" imageUrl={Sedetanos} onClick={updateTribe} name="Sedetani" valid={true} requirements="Any" specialRule={getContent("stand_together")} description="United solely by a common language, the Sedetani are the most numerous among all humans, ranging from small communities to large empires. As a result, they are extremely diverse, with each individual picking their own alignment." />
      <Tribe title="Aurigacos/Origaks" imageUrl={Aurigacos} onClick={updateTribe} name="Origak" valid={alignment == "Chaos"} requirements="Chaos" specialRule={getContent("master_skirmisher")} description="The term Origaks refers to the numerous nomadic equestrian tribes that travel the world. Of warlike nature, the Origak employ violence to gather resources in the places they travel to." />
      <Tribe title="Gearcos/Gairks" imageUrl={Gearcos} onClick={updateTribe} name="Gairk" valid={alignment == "Chaos"} requirements="Chaos" specialRule={getContent("skilled_duelist")} description="The Gairks are a plethora of communities dedicated to the preservation of the world and the destruction of Order. Despite their chaotic alignment, the Gairks demonstrate tremendous self-discipline and organizational ability." />
      <Tribe title="Salaicos/Salayks" imageUrl={Salaicos} onClick={updateTribe} name="Salayk" valid={alignment == "Chaos"} requirements="Chaos" specialRule={getContent("frenzied_fighter")} description="The Salayks are the most feral among all humans. Lacking any organization, Salayk communities only respect strength and glory in combat." />
      <Tribe title="Anteros/Anterans" imageUrl={Anteros} onClick={updateTribe} name="Anteran" valid={alignment == "Order"} requirements="Order" specialRule={getContent("forth_riders")} description="Living in strictly organized manors, the Anterans display and follow the ideals of Order. The protection of the peasants is carried out by a caste of well-trained riders who roam among the fiefs." />
    </>

  let dvergars =
    <>
      <Tribe title="Medvergars/Halfvergars" imageUrl={Medvergars} onClick={updateTribe} name="Halfvergar" valid={alignment == "Order"} requirements="Order" specialRule={getContent("to_battle")} description="These crossbreed of human and dvergar inherit many features from their underground ancestors while avoiding their weakness towards sunlight. Unfortunately their crafts are also not as skilled." />
    </>

  let faeries =
    <>
      <Tribe title="Chauns" imageUrl={Chauns} onClick={updateTribe} valid={alignment == "Order"} name="Chaun" requirements="Order" specialRule={getContent("for_the_motherland")} description="Chaotic by nature, the Chaun, the most human-like of all faeries, have adopted the tenets of Order. Now, their prosperous communities thrive protected by bravery and well trained soldiers." />
    </>

  let goblins =
    <>
      <Tribe title="Trasgos/Yoreblins" imageUrl={Trasgos} onClick={updateTribe} valid={alignment == "Chaos"} name="Yoreblin" requirements="Chaos" specialRule={getContent("treacherous")} description="Yoreblins are the oldest and weakest of all Goblin tribes. Still, they shouldn't be underestimated, as they make up for their limitations using their vast numbers. " />
      <Tribe title="Semitrasgos/Halfblins" imageUrl={Semitrasgos} onClick={updateTribe} valid={alignment == "Chaos"} name="Halfblin" requirements="Chaos" specialRule={getContent("brawler")} description="Whilst behaving exactly as the Yoreblins, Halfblins are significantly stronger, allowing them to become an even greater threat to the rest of races. It is not known whether they descend from humans or have a different origin" />
      <Tribe title="Tragnos/Greblons" imageUrl={Tragnos} onClick={updateTribe} valid={alignment == "Chaos"} name="Greblon" requirements="Chaos" specialRule={getContent("you_shall_taste_chaos")} description="Tragnos are the youngest member of the Goblin family. With an unmatched physical power and astonishing equipment, this creatures instill terror to the inhabitants of the known world" />
    </>

  let sidhe =
    <>
      <Tribe title="Hijos del Otoño/Children of Lugnasad" imageUrl={HijosOtoño} onClick={updateTribe} valid={alignment == "Order"} name="Child of Lugnasad" requirements="Order" specialRule={getContent("sidhe_fighting_style")} description="Children abducted during Lugnasad by the Dark Sidhe. Their eyes are bright brown." />
      <Tribe title="Hijos del Invierno/Children of Samhain" imageUrl={HijosInvierno} onClick={updateTribe} valid={alignment == "Order"} name="Child of Samhain" requirements="Order" specialRule={getContent("protect_our_borders")} description="Children abducted during Samhain by the Dark Sidhe. Their eyes are bright black." />
      <Tribe title="Hijos de la Primavera/Children of Imbolc" imageUrl={HijosPrimavera} onClick={updateTribe} valid={alignment == "Order"} name="Child of Imbolc" requirements="Order" specialRule={getContent("blessing_of_the_sidhe")} description="Children abducted during Imbolc by the Light Sidhe. Their eyes are bright green." />
      <Tribe title="Hijos del Verano/Children of Beltane" imageUrl={HijosVerano} onClick={updateTribe} valid={alignment == "Order"} name="Child of Beltane" requirements="Order" specialRule={getContent("unrivalled_allies")} description="Children abducted during Beltane by the Light Sidhe. Their eyes are bright golden." />
    </>

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
        <h1>Tribe</h1>
        <p className='medium-margins'>The most important feature of an adventurer is its <span className="fantasy-text">Tribe</span>. The <span className="fantasy-text">Tribe</span> not only represents the Character's cultural background, but also determines their race. Each <span className="fantasy-text">Tribe</span> also grants the Character its first <span className="fantasy-text tooltip-text special-rule">Special Rule</span>.</p>
        <Tooltip anchorSelect=".special-rule" className="custom-tooltip" place="top">
          <p>Special Rules are the core of Chararacter progression. They provide passive or active abilities.</p>
        </Tooltip>
        <Race title="Humans" imageUrl={Humanos} tribes={humans} description="The mightiest and the self-proclaimed first inhabitants of the world. Humans’ domain over the known world is unchallenged, despite their fragmentation and unending struggles." />
        <Race title="Dvergars" tribes={dvergars} description="Dwarfs or dvergars are a race of humanoids of small stature. They are renowed for their craftings skills but also shunned for their greed. Direct sunlight is lethal to dwarves, turning them into stone, which forces them to live underground." />
        <Race title="Faeries" tribes={faeries} description="The term 'fairies' describes an extremely broad spectrum of creatures of different shapes and cultures. Although many of these creatures are not evil, almost all tend to be extremely mischievous and troublesome for the rest of the races." />
        <Race title="Goblins" imageUrl={Goblins} tribes={goblins} description="Among all common races, Goblins are truly the most hated. Regardless of their breed, Goblins are cruel, bellicose and sadistic, causing pain and suffering where they go." />
        <Race title="Sidhe" imageUrl={DarkSidhe} imageUrl2={LightSidhe} tribes={sidhe} description="Little is known about the Sidhe. It is said that they come from another world. They are divided into the Light Sidhe, with translucent golden skin, and the Dark Sidhe, with translucent bluish skin. The Sidhe are extremely powerful, but like other fairy creatures, iron burns them. They kidnap human children to raise them as their own; sometimes these children reappear, with amnesia, but also skills beyond the ordinary." />
      </div>
    </>
  );
};

export default Tribes;