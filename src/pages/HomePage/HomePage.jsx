import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="intro">
        <div>
          Welcome to a <span className="green euro-2024">Euro 2024</span> Sweepstake Generator. 
        </div>
        <div className="home-desc">
          With 24 top teams from Europe competiting for the title, who will get the winning pick?
        </div>
      </div>
      <Link to="/generator">
        <button className="go-to-gen-btn">
          Go to Generator
        </button>
      </Link>
    </div>
  )
}