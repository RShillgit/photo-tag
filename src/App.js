import { useState } from 'react';
import './App.css';
import wheresWaldoImg from './images/whereswaldo.jpg';
import CharacterSelect from './components/characterSelect';
import Footer from './components/footer';

function App() {

  const [coord, setCoord] = useState('0, 0');

  const printMousePos = (e) => {
    setCoord(`${e.clientX}, ${e.clientY}`)
    console.log(coord)
  }

  return (
    <div className="App">

      <div className='header'>
        <h1>Find Each Character</h1>
      </div>

      <CharacterSelect />

      <div className='wheresWaldo'>
        <img src={wheresWaldoImg} alt='Wheres Waldo?' onClick={printMousePos} />
      </div>

      <Footer />

    </div>
  );
}

export default App;
