import { useRef, useState } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining ] = useState( targetTime * 1000 );
    const timer = useRef();
    const dialog = useRef();

    let isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000 ;
    if (timeRemaining <= 0) {
        handleTimerStop();
        setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }

    function handleTimerStart() {
        timer.current = setInterval(() => {
            setTimeRemaining( previousTime => previousTime - 10 );
        }, 10);
    }

    function handleTimerStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }
    function handleClose() {
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            
                <ResultModal
                    dialogRef = { dialog }
                    targetTime={targetTime}
                    timeRemaining = {timeRemaining}
                    onClose={handleClose}
                />

            <section className="challenge">
                <h2>
                    {title}
                </h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ?? 's'}
                </p>
                <p>
                    <button onClick={isTimerActive ? handleTimerStop : handleTimerStart}> {isTimerActive ? "Stop" : "Start"} Challenge</button>
                </p>
                <p className={isTimerActive ? "active" : undefined}>
                    {isTimerActive ? "Time is running...." : "Timer incactive"}
                </p>

            </section>
        </>
    )
}