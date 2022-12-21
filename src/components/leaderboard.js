import uniqid from 'uniqid';
import { useEffect, useState } from "react";

const Leaderboard = (props) => {

    const [leaderboardEntries, setLeaderboardEntries] = useState('');

    // On mount load leaderboard
    useEffect(() => {
        setLeaderboardEntries(props.leaderboard.map(entry => 
            <div className="leaderboard-row" key={uniqid()}>
                <p>{entry.username}</p>
                <p>{entry.time}</p>
            </div>
        ))
    }, [])

    const playAgainButtonClick = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    return (
        <div className="leaderboard">
            <div className="leaderboard-table">
                <div className="leaderboard-header">
                    <h4>Username</h4>
                    <h4>Completion Time</h4>
                </div>
                <div className="leaderboard-rows">
                    {leaderboardEntries}
                </div>
            </div>
            <div className="play-again">
                <button onClick={playAgainButtonClick}>Play Again</button>
            </div>
        </div>
    )
}
export default Leaderboard;