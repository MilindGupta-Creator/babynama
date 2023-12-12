import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [playButton, setPlayButton] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");
  const [second, setSecond] = useState("00");
  const [count, setCount] = useState(0);

  function toHoursAndMinutes(totalMinutes, counter) {

    setHours(padTo2Digits(Math.floor((totalMinutes * 60 - counter) / 60 / 60)));
    setMinutes(
      padTo2Digits(Math.floor(((totalMinutes * 60 - counter) / 60) % 60))
    );
    setSecond(padTo2Digits(Math.floor((totalMinutes * 60 - counter) % 60)));

    }
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }


  useEffect(() => {

    if (!totalMinutes) {
      return;
    }

    if (!playButton) {

      
      toHoursAndMinutes(totalMinutes, count);
      return;
    }


    const getCountdownTime = totalMinutes * 60;

    let interval = setTimeout(() => {
      if (count >= getCountdownTime) {
        clearInterval(interval);

        return;
      }


  

      toHoursAndMinutes(totalMinutes, count+1);

      setCount((prevValue) => prevValue + 1);
    }, 1000);
  }, [totalMinutes, count, playButton]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="counter-container">
          <div className="minutes-input">
            <p style={{color:"#05abcd" , fontWeight:"600"}}>Enter Minutes</p>
            <input
              type="number"
              pattern="\d+"
              name="minutes"
              onChange={(e) => {
                setTotalMinutes(e.target.value);
                setCount(0);
                setPlayButton(false)
              }}
              value={totalMinutes}
            />
          </div>
          <div className="counter-output">
            <div
              className="play-button"
              onClick={() => {
                setPlayButton(!playButton);
              }}
            >
              {playButton ? (
                <span className="material-icons">pause</span>
              ) : (
                <span className="material-icons">play_arrow</span>
              )}
            </div>
            <div className="counter-timer">
              {hours + ":" + minutes + ":" + second}
            </div>
          </div>
          <div style={{marginTop:"15px"}} >
            <button className="reset" onClick={(e)=>{
              setTotalMinutes(0)
              setCount(0)
              setHours(0)
              setMinutes(0)
              setSecond(0)
            }}>Reset Timer</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
