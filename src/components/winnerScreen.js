import Leaderboard from "./leaderboard";
import { useState } from "react";

const WinnerScreen = (props) => {

    const [userInput, setUserInput] = useState('');
    const [leaderboardView, setLeaderboardView] = useState('');

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    const cancelButtonClick = (e) => {
        e.preventDefault();
        console.log('Cancel')
    }

    const saveScoreButtonClick = (e) => {
        e.preventDefault();
        console.log(userInput, props.completionTime);

        // Send to a function in App to save this to database

        // Render leaderboard
        setLeaderboardView(<Leaderboard />);
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