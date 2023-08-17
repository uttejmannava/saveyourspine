import { Link } from "react-router-dom";
import gif1 from "./gifs/chris-pratt-smile.gif"
import gif2 from "./gifs/ugh-slouching.gif"
import gif3 from "./gifs/typing-fun.gif"
import { useState } from "react";

const Intro = () => {

    const [gifsVisible, setGifsVisible] = useState(true)

    const handleClick = () => {
        setGifsVisible(false)
    }

    return (  
        <div className="intro-page">
            {gifsVisible && <div className="options">
                <h1 className="intro-title" >how does your posture look</h1>
                <div className="gifs">
                    <div className="gif-container">
                        <img className="gif" src={gif1} alt="Bad Posture GIF" onClick={handleClick} />
                    </div>
                    <div className="gif-container">
                        <img className="gif" src={gif2} alt="Bad Posture GIF" onClick={handleClick} />
                    </div>
                    <div className="gif-container">
                        <img className="gif" src={gif3} alt="Bad Posture GIF" onClick={handleClick} />
                    </div>
                </div>
            </div> } 
            {!gifsVisible && <div className="transition">
                <h1 className="transition-text">lets save your spine</h1>
                <Link to="/fix"><button className="transition-button">ok</button></Link>
            </div> }
        </div>
    );
}
 
export default Intro;