const IdentifyCharacter = (props) => {

    const divStyle = {
        left: `${props.x}px`,
        top: `${props.y}px`
    }

    console.log(divStyle);

    return (
        <div className="identification" style={divStyle}>
            <div className="box">
            </div>
            <div className="charOptions">
                <button>Waldo</button>
                <button>Odlaw</button>
                <button>Wizard</button>
            </div>
        </div>
    )
}
export default IdentifyCharacter;