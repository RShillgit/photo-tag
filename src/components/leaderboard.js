const Leaderboard = () => {

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
                    <div className="leaderboard-row">
                        <p>Blah Blah</p>
                        <p>00:25 seconds</p>
                    </div>
                    <div className="leaderboard-row">
                        <p>Blah Blah number 2</p>
                        <p>00:35 seconds</p>
                    </div>
                </div>
            </div>
            <div className="play-again">
                <button onClick={playAgainButtonClick}>Play Again</button>
            </div>
        </div>
    )
}
export default Leaderboard;