import Leaderboard from "./leaderboard";
import { useState } from "react";

const WinnerScreen = (props) => {

    const [userInput, setUserInput] = useState('');
    const [leaderboardView, setLeaderboardView] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setUserInput(e.target.value);
    }

    const cancelButtonClick = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    async function saveScoreButtonClick(e) {

        e.preventDefault();

        // Send to a function in App to save this to database
        props.saveToLeaderboard(userInput, props.completionTime);

        // Remove end game form
        const endGameForm = document.querySelector('.winner-form');
        endGameForm.style.display = 'none';

        // Wait for reloadLeaderboard function to return updated leaderboard
        await (props.reloadLeaderboard()).then((result) => {
            // Render updated leaderboard
            setLeaderboardView(<Leaderboard leaderboard={result}/>)
        });
    }

    return (
        <div className="winner-screen">
            <form className="winner-form">
                <div className="endgame-directions">
                    <p>You Finished in {props.completionTime} seconds!</p>
                    <p>Enter a name to save your score to the leaderboard</p>
                </div>
                <input type="text" onChange={handleChange} placeholder="Name"></input>
                <div className="endgame-buttons">
                    <button onClick={cancelButtonClick}>Cancel</button>
                    <button onClick={saveScoreButtonClick}>Save Score</button>
                </div>
            </form>
            {leaderboardView}
        </div>
    )
}
export default WinnerScreen;