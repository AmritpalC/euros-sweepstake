import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="intro">
        Welcome to a <span className="green">Euro 2024</span> Sweepstake Generator. 
      </div>
      <Link to="/generator">
        <button className="go-to-gen-btn">
          Go to Generator
        </button>
      </Link>
    </div>
  )
}