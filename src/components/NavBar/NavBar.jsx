import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import football from "../../assets/football-icon.png"

import { BsMoonFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";

export default function NavBar() {

    // ? Dark mode
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
      if (darkMode) {
        document.body.classList.remove("light")
      } else {
        document.body.classList.add("light")
      }
    }, [darkMode])
  
    const toggleDarkMode = () => { setDarkMode(!darkMode) }

  return (
    <div>
      <div className="navbar">
        <Link to="/" className="home-link">
          <div className="logo-and-name">
            <img src={football} alt="Football" className="nav-logo"></img>
          </div>
        </Link>
        <div className="title">Euro 2024 Sweepstake</div>
        <div className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <BsSunFill className="icon" /> : <BsMoonFill className="icon" />}
        </div>
      </div>
    </div>
  )

}