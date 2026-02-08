import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
export default function ResultModal({ dialogRef, timeRemaining,
    onClose, targetTime }) {
    const result = timeRemaining < (targetTime * 1000);
    const dialog = useRef();
    const score = Math.round(((1 - (timeRemaining / (targetTime * 1000))) * 100));
    useImperativeHandle(dialogRef, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return createPortal (
        <dialog className="result-modal" ref={dialog}>
            <h2>
                {result ? <strong>You Won!</strong> : <strong>Ops! You couldn't make it!</strong>}
                {result && <p>You score is {score}</p>}
            </h2>
            <p>
                The target time was <strong> {targetTime} seconds </strong>
            </p>
            {result &&
                <p> You stopped the time in <strong> {(targetTime - timeRemaining / 1000).toFixed(2)} </strong> seconds.</p>}
            <form method="dialog" onSubmit={onClose}>
                <button> Close </button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
}