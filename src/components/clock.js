const Clock = (props) => {

    return (
        <div className="gameTimer">
            <p>{props.time}</p>
        </div>
    )
}
export default Clock;