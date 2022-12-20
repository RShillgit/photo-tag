const IdentifyCharacter = (props) => {

    const divStyle = {
        left: `${props.x}px`,
        top: `${props.y}px`
    }

    const characterSelection = (e) => {

        const selection = e.target.innerHTML;

        // Send selected character to App's charSelect function
        props.charSelect(selection);
    }

    return (
        <div className="identification" style={divStyle}>
            <div className="box">
            </div>
            <div className="charOptions">
                <button onClick={characterSelection}>Waldo</button>
                <button onClick={characterSelection}>Odlaw</button>
                <button onClick={characterSelection}>Wizard</button>
            </div>
        </div>
    )
}
export default IdentifyCharacter;