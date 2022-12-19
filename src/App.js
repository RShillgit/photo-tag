import { useState } from 'react';
import './App.css';
import wheresWaldoImg from './images/whereswaldo.jpg';
import CharacterSelect from './components/characterSelect';
import Footer from './components/footer';
import IdentifyCharacter from './components/identifyCharacter';

function App() {

  const [coord, setCoord] = useState({x: null, y: null});
  const [identificationBox, setIdentificationBox] = useState('');

  const getMousePos = (e) => {

    // Using -16 here because the box has a height and width of 2rem (32px x 32px)
    // So to center the box i subtract 1rem(16px) from the left and top
    let xCoord = e.clientX - 16;
    let yCoord = e.clientY - 16;

    setCoord({x: xCoord, y: yCoord})

    setIdentificationBox(<IdentifyCharacter x={coord.x} y={coord.y}/>);
  }

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
