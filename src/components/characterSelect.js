import waldo from '../images/waldo.png';
import odlaw from '../images/odlaw.png';
import wizard from '../images/wizard.png';
import { useState } from 'react';

const CharacterSelect = () => {

    const [waldoHover, setWaldoHover] = useState('');
    const [odlawHover, setOdlawHover] = useState('');
    const [wizardHover, setWizardHover] = useState('');

    // Set the image captions according to what image is being hovered over
    const characterHoverEnter = (e) => {
        if(e.target.alt === 'Waldo') setWaldoHover('Waldo');
        else if(e.target.alt === 'Odlaw') setOdlawHover('Odlaw');
        else if (e.target.alt === 'Wizard') setWizardHover('Wizard');
    }

    // Set the image captions back to nothing
    const characterHoverLeave = () => {
        setWaldoHover('')
        setOdlawHover('')
        setWizardHover('')
    }

    return (
        <div className='allCharacters'>

            <div className='selector'>
                <div id='char-waldo' className='character'>
                    <img src={waldo} alt='Waldo' onMouseEnter={characterHoverEnter} onMouseLeave={characterHoverLeave}/>
                </div>
                <div id='char-odlaw' className='character'>
                    <img src={odlaw} alt='Odlaw' onMouseEnter={characterHoverEnter} onMouseLeave={characterHoverLeave}/>
                </div>
                <div id='char-wizard' className='character'>
                    <img src={wizard} alt='Wizard' onMouseEnter={characterHoverEnter} onMouseLeave={characterHoverLeave}/>
                </div>
            </div>

            <div className='characterNames'>
                <p>{waldoHover}</p>
                <p>{odlawHover}</p>
                <p>{wizardHover}</p>
            </div>
            
        </div>
    )
}
export default CharacterSelect;