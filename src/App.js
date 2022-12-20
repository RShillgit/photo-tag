import { useEffect, useState } from 'react';
import './App.css';
import wheresWaldoImg from './images/whereswaldo.jpg';
import Clock from './components/clock';
import CharacterSelect from './components/characterSelect';
import Footer from './components/footer';
import IdentifyCharacter from './components/identifyCharacter';

import { getDatabase, ref, child, get } from "firebase/database";

function App() {

  const [coord, setCoord] = useState({x: null, y: null});
  const [identificationBox, setIdentificationBox] = useState('');
  const [charImages, setCharImages] = useState(
    {
      'Waldo': {selected: false},
      'Odlaw': {selected: false},
      'Wizard': {selected: false}
    },
  )
  const [gameOver, setGameOver] = useState(false);

  // TODO const timer = () => {}

  const getMousePos = (e) => {

    // Using -16 here because the box has a height and width of 2rem (32px x 32px)
    // So to center the box i subtract 1rem(16px) from the left and top
    let xCoord = e.clientX - 16;
    let yCoord = e.clientY - 16;

    setCoord({x: xCoord, y: yCoord})
  }

  const charSelect = (char) => {
    
    // Initialize
    let selectedChar;
    const xPosition = coord.x + 16;
    const yPosition = coord.y + 16;

    // Set identificationBox back to nothing so it goes away
    setIdentificationBox('');

    // Determine if the choice is correct or not 
    const dbRef = ref(getDatabase());
    get(child(dbRef, `characters`)).then((snapshot) => {
      if (snapshot.exists()) {

        // Database Information
        const dbInfo = snapshot.val();

        // Loop through database, find the character that the user selected
        for(let i = 0; i < dbInfo.chars.length; i++) {
          if (dbInfo.chars[i].name === char) {

            selectedChar = dbInfo.chars[i];
          }
        }

        // Compare their x and y values to the coordinate
        if (xPosition >= selectedChar.xRange[0] && xPosition <= selectedChar.xRange[1] && yPosition >= selectedChar.yRange[0] && yPosition <= selectedChar.yRange[1]) {

          // Change charImage state to found
          const charImagesClone = {...charImages};
          charImagesClone[char].selected = true;

          setCharImages(charImagesClone);

          // If every character is selected change gameOver state to true
          if(charImagesClone.Waldo.selected === true && charImagesClone.Odlaw.selected === true && charImagesClone.Wizard.selected === true) {
            setGameOver(true);
          }
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    if (coord.x === null || coord.y === null) {
      setIdentificationBox('');
    } else setIdentificationBox(<IdentifyCharacter x={coord.x} y={coord.y} charSelect={charSelect}/>);
    
  }, [coord])

  // changes character image color to gray if found
  useEffect(() => {
    
    // If the character has been found change its color to gray
    if (charImages.Waldo.selected === true) {
      const waldoImg = document.getElementById('char-waldo').querySelector('img');
      waldoImg.style.filter = 'invert(55%) sepia(0%) saturate(0%) hue-rotate(220deg) brightness(92%) contrast(86%)'
    }
    if (charImages.Odlaw.selected === true) {
      const odlawImg = document.getElementById('char-odlaw').querySelector('img');
      odlawImg.style.filter = 'invert(55%) sepia(0%) saturate(0%) hue-rotate(220deg) brightness(92%) contrast(86%)'
    }
    if (charImages.Wizard.selected === true) {
      const wizardImg = document.getElementById('char-wizard').querySelector('img');
      wizardImg.style.filter = 'invert(55%) sepia(0%) saturate(0%) hue-rotate(220deg) brightness(92%) contrast(86%)'
    }
  }, [charImages])

  // Checks game over state
  useEffect(() => {
    if(gameOver === true) {
      console.log('The Game is over!');

      // Stop the clock

      // Show game over screen, final time, and replay button
    }
  }, [gameOver])

  return (
    <div className="App">

      <div className='header'>
        <h1>Find Each Character</h1>
        <Clock />
      </div>

      <CharacterSelect />

      <div className='wheresWaldo'>
        <img id='wheresWaldoCanvas' src={wheresWaldoImg} alt='Wheres Waldo?' onClick={getMousePos} />
      </div>

      {identificationBox}

      <Footer />

    </div>
  );
}

export default App;
