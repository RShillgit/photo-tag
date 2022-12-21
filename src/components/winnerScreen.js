import Leaderboard from "./leaderboard";
import { useEffect, useState } from "react";

const WinnerScreen = (props) => {

    const [userInput, setUserInput] = useState('');
    const [endgameForm, setEndGameForm] = useState('');
    const [leaderboardView, setLeaderboardView] = useState('');

    // On mount render endgame form
    useEffect(() => {
        setEndGameForm(
            <form className="winner-form">
                <div className="endgame-directions">
                    <p>You Finished in {props.completionTime} seconds!</p>
                    <p>Enter a name to save your score to the leaderboard</p>
                    <p>{userInput}</p>
                </div>
                <input type="text" onChange={handleChange} placeholder="Name"></input>
                <div className="endgame-buttons">
                    <button onClick={cancelButtonClick}>Cancel</button>
                    <button onClick={(e) => saveScoreButtonClick(e)}>Save Score</button>
                </div>
            </form>
        )
    }, [])

    // TODO: isnt setting user input until form submit??????
    // Maybe remove the form and just make it divs
    const handleChange = (e) => {
        e.preventDefault();
        setUserInput(e.target.value)
    }

    const cancelButtonClick = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    const saveScoreButtonClick = (e) => {

        e.preventDefault();

        // Send to a function in App to save this to database
        props.saveToLeaderboard(userInput, props.completionTime);

        // Remove end game form
        setEndGameForm('');

        // Render leaderboard
        setLeaderboardView(<Leaderboard leaderboard={props.leaderboard}/>);
    }

    return (
        <div className="winner-screen">
            {endgameForm}
            {leaderboardView}
        </div>
    )
}
export default WinnerScreen;