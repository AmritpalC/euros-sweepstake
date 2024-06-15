import { Link } from "react-router-dom";
import football from "./football-icon.png";

export default function NavBar() {

  return (
    <div>
      <div className="navbar">
        <Link to="/" className="home-link">
          <div className="logo-and-name">
            <img src={football} alt="Football" className="nav-logo"></img>
          </div>
        </Link>
        <div className="title">Euro 2024 Sweepstake</div>
      </div>
    </div>
  )

}