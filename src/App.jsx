import './App.css';
import { useState, useEffect } from 'react';

import NavBar from './NavBar';
import TeamList from './TeamList';
import AddParticipant from './AddParticipant';
import Footer from './Footer'

export default function App() {
  
  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [assignedTeams, setAssignedTeams] = useState([]);

  useEffect(() => {
    fetch('./teams.json')
      .then(response => response.json())
      .then(data => setTeams(data.teams))
  }, []);

  const addParticipant = (name) => {
    setParticipants([...participants, {name, teams: [] }])
  }

  const assignTeams = () => {
    if (participants.length === 0) {
      alert("There are no particpants to assign teams to!");
      return;
    }

    const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    
    // Creating a copy of participants to avoid directly mutating state
    const participantsCopy = [...participants];

    // Round-robin teams assignment
    shuffledTeams.forEach((team, index) => {
      participantsCopy[index % participantsCopy.length].teams.push(team);
    });

    setAssignedTeams(participantsCopy);
  };

  return (
    <main className="App">
      <NavBar />
      <div className='app-content'>
        <div className='add-ppl'>
          <AddParticipant addParticipant={addParticipant} />
        </div>
        <div className='ppl'>
          <ul>
            {participants.map((participant, index) => (
                      <li key={index}>
                        {participant.name} 
                      </li>
                    ))}          
          </ul>
        </div>
        <button onClick={assignTeams} className='assign-btn'>Assign Teams</button>
        <TeamList assignedTeams={assignedTeams} />
      </div>
      <Footer />
    </main>
  );
}
