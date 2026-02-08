import { useRef , useState } from "react";

export default function Player() {
  const [ userName , setUserName ] = useState(null);
  const playerName = useRef();
 
  function updateUserName () {
    setUserName( playerName.current.value );
  }

  return (
    <section id="player">
      <h2>Welcome  { userName ?? " unknown user" }</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={() => updateUserName()}>Set Name</button>
      </p>
    </section>
  );
}
