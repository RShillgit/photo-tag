import { useEffect, useState } from 'react';
import './App.css';
import wheresWaldoImg from './images/whereswaldo.jpg';
import CharacterSelect from './components/characterSelect';
import Footer from './components/footer';
import IdentifyCharacter from './components/identifyCharacter';

import { getDatabase, ref, child, get } from "firebase/database";

function App() {

  const [coord, setCoord] = useState({x: null, y: null});
  const [identificationBox, setIdentificationBox] = useState('');

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
          console.log('Correct!');
        }
        else console.log('Wrong!');
        
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

  return (
    <div className="App">

      <div className='header'>
        <h1>Find Each Character</h1>
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
