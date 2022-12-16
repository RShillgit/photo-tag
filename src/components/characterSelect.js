import waldo from '../images/waldo.png';
import odlaw from '../images/odlaw.jpg';
import wizard from '../images/wizard.jpeg';
import { useState } from 'react';

const CharacterSelect = () => {

    const [message, setMessage] = useState('Message');

    const charSelector = (e) => {

        // Temporarily set message to selected character
        // This is where it will update to correct/incorrect after user selection
        setMessage(e.target.alt);
    }

    return (
        <div className='characters'>

            <div className='selector'>
                <img src={waldo} alt='Waldo' onClick={charSelector}/>
                <img src={odlaw} alt='Odlaw' onClick={charSelector}/>
                <img src={wizard} alt='Wizard' onClick={charSelector}/>
            </div>

            <div className='message'>
                <p>{message}</p>
            </div>
            
        </div>
    )
}
export default CharacterSelect;