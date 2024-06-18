import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    fetch('./teams.json')
      .then(response => {
        if(!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json();
      })
      .then(data => {
        if (data.teams) {
          const allFlags = data.teams.map(team => team.flag);
          setFlags(allFlags);
        } else {
          throw new Error("Invalid data structure")
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
  };

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
      <div className="all-flags">
        {flags.map((url, index) => (
          <img key={index} src={url} alt={`Team flag ${index}`} className="team-flag" />
        ))}
      </div>
    </div>
  )
}