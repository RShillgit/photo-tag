import { useEffect, useState } from "react";

const Clock = () => {

    const [clock, setClock] = useState('00:00');

    useEffect(() => {

        const clockHandler = () => {
            var date = new Date();
            var sec = date.getSeconds();
            var min = date.getMinutes();
            setClock((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
        }
        setInterval(clockHandler, 1000);
        

    }, [clock]);


    return (
        <div className="gameTimer">
            <p>{clock}</p>
        </div>
    )
}
export default Clock;