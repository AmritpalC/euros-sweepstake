import football from "./football-icon.png"

export default function NavBar() {

  return (
    <div>
      <div className="navbar">
        <div className="logo-and-name">
          <img src={football} alt="Football" className="nav-logo"></img>
          <span className="nav-name orange">
            WWW
          </span>
        </div>
        <div className="title">Euro 2024 Sweepstake</div>
      </div>
    </div>
  )

}