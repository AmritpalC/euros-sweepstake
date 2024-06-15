import { useState, useEffect } from 'react';
import TeamList from './TeamList';
import AddParticipant from './AddParticipant';

export default function HomePage() {

  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [assignedTeams, setAssignedTeams] = useState([]);
  const [currentTeamIdx, setCurrentTeamIdx] = useState(0);
  const [error, setError] = useState("")

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
          const shuffledTeams = data.teams.sort(() => 0.5 - Math.random());
          setTeams(shuffledTeams);
        } else {
          throw new Error("Invalid data structure")
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError("Failed to load teams competing. Please try again later")
      })
  };

  const addParticipant = (name) => {
    setParticipants([...participants, {name, teams: [] }])
  }

  const assignNextTeam = () => {
    if (participants.length === 0) {
      setError("There are no participants to assign teams to!");
      return;
    }

    if (currentTeamIdx >= teams.length) {
      setError("All teams have been assigned!");
      return;
    }

    const participantIdx = currentTeamIdx % participants.length;
    const updatedParticipants = [...participants];
    updatedParticipants[participantIdx].teams.push(teams[currentTeamIdx]);

    setParticipants(updatedParticipants);
    setCurrentTeamIdx(currentTeamIdx + 1);
    setAssignedTeams(updatedParticipants);
  };

  const reset = () => {
    setParticipants([]);
    setAssignedTeams([]);
    setCurrentTeamIdx(0);
    setError("")
    fetchTeams();
  }

  return (
    <div className='app-content'>
      <div className='intro orange'>
        Welcome! Add everyone's name and once you are ready, hit assign team to get going! 
      </div>
      <div className='add-ppl'>
        <AddParticipant addParticipant={addParticipant} />
      </div>
      <div className='ppl'>
        <ul>
          {participants.map((participant, index) => (
                    <li 
                      key={index}
                      className={index === currentTeamIdx % participants.length ? 'current-participant' : ''}
                    >
                      {participant.name} 
                    </li>
                  ))}          
        </ul>
      </div>
      <div className='buttons'>
        <button onClick={assignNextTeam} className='assign-btn'>Assign Team</button>
        <button onClick={reset} className='reset-btn'>Reset</button>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <TeamList assignedTeams={assignedTeams} />
    </div>
  )
}