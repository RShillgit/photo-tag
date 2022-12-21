import { useEffect, useState } from 'react';
import './App.css';
import wheresWaldoImg from './images/whereswaldo.jpg';
import Clock from './components/clock';
import CharacterSelect from './components/characterSelect';
import Footer from './components/footer';
import WinnerScreen from './components/winnerScreen';
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
  const [clock, setClock] = useState('00:00');
  const [winner, setWinner] = useState('');
  const [leaderboard, setLeaderboard] = useState(null);

  // Game Timer
  useEffect(() => {

    //Variables
    let second = 0;
    let minute = 0;
    let hour = 0;

    const incrementClock = () => {
      // Add a new second since one second is passed
      second++;

      // We check if the second equals 60 "one minute"
      if (second === 60) {
      // If so, we add a minute and reset our seconds to 0
      minute++;
      second = 0;
      }
  
      // If we hit 60 minutes "one hour" we reset the minutes and plus an hour
      if (minute === 60) {
      hour++;
      minute = 0;
      }
  
      setClock(
        (hour ? hour + ':' : '') +
        (minute < 10 ? '0' + minute : minute) +
        ':' +
        (second < 10 ? '0' + second : second)
      );
    }
    if (gameOver === false) {
      setInterval(incrementClock, 1000);
    }
    else if(gameOver === true) {
      const completionTime = clock;
      clearInterval(incrementClock);

      // Render winner Screen
      setWinner(<WinnerScreen completionTime={completionTime} leaderboard={leaderboard} saveToLeaderboard={saveToLeaderboard}/>)
    }
  }, [gameOver]);

  const getMousePos = (e) => {

    // Using -16 here because the box has a height and width of 2rem (32px x 32px)
    // So to center the box i subtract 1rem(16px) from the left and top
    let xCoord = e.pageX - 16;
    let yCoord = e.pageY - 16;

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

  // On mount load leaderboard
  useEffect(() => {
    loadLeaderboard();
  }, [])

  const loadLeaderboard = () => {

    // Load leaderboard database
    const dbRef = ref(getDatabase());
    get(child(dbRef, `leaderboard`)).then((snapshot) => {
      if (snapshot.exists()) {
        // Database Information
        const dbInfo = snapshot.val();
        setLeaderboard(dbInfo);

      } else {
        console.log("No data available");
      }
      
    }).catch((error) => {
      console.error(error);
    });
  }

  // TODO: Write to realtime database
  const saveToLeaderboard = (username, time) => {
    console.log(`Saving... ${username} in ${time} seconds`)
  }

  return (
    <div className="App">

      <div className='header'>
        <h1>Find Each Character</h1>
        <Clock time={clock}/>
      </div>

      <CharacterSelect />

      {winner}

      <div className='wheresWaldo'>
        <img id='wheresWaldoCanvas' src={wheresWaldoImg} alt='Wheres Waldo?' onClick={getMousePos} />
      </div>

      {identificationBox}

      <Footer />

    </div>
  );
}

export default App;
