import uniqid from 'uniqid';
import { useEffect, useState } from "react";

const Leaderboard = (props) => {

    const [leaderboardEntries, setLeaderboardEntries] = useState('');

    // On mount load leaderboard
    useEffect(() => {
        const sortedLeaderboard = props.leaderboard.sort((a, b) => {

            // minutes and seconds for a
            const aTimeSplit = a.time.split(':');
            const aMinutes = Number(aTimeSplit[0]);
            const aSeconds = Number(aTimeSplit[1]); 

            // minutes and seconds for b
            const bTimeSplit = b.time.split(':');
            const bMinutes = Number(bTimeSplit[0]);
            const bSeconds = Number(bTimeSplit[1]); 

            if (aMinutes < bMinutes) return -1;
            else if (aMinutes === bMinutes && aSeconds < bSeconds) return -1;
            else return 1;
        })
        setLeaderboardEntries(sortedLeaderboard.map(entry => 
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