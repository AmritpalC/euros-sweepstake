import { useState, useEffect } from 'react';
import TeamList from '../../components/TeamList/TeamList';
import AddParticipant from '../../components/AddParticipant/AddParticipant';

export default function GeneratorPage() {

  const [teams, setTeams] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [assignedTeams, setAssignedTeams] = useState([]);
  const [currentTeamIdx, setCurrentTeamIdx] = useState(0);
  const [teamLimit, setTeamLimit] = useState(1);
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
    setError("")
  }

  const handleTeamLimit = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1 || value > 24) {
      setError("Team limit must be between 1 and 24");
    } else {
      setTeamLimit(value);
      setError("");
    }
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
    const currentParticipant = updatedParticipants[participantIdx];

    if (currentParticipant.teams.length < teamLimit) {
      currentParticipant.teams.push(teams[currentTeamIdx]);
      setParticipants(updatedParticipants);
      setCurrentTeamIdx(currentTeamIdx + 1);
      setAssignedTeams(updatedParticipants);
      setError("");
    } else {
      setError(`${currentParticipant.name} already has ${teamLimit} team(s)!`)
    }

  };

  const reset = () => {
    setParticipants([]);
    setAssignedTeams([]);
    setCurrentTeamIdx(0);
    setError("")
    fetchTeams();
  }

  function generateCSV() {
    const csvRows = [
      ['Participant', 'Teams']
    ];

    participants.forEach(participant => {
      const teamNames = participant.teams.map(team => team.name).join(', ')
      csvRows.push([participant.name, teamNames]);
    });

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    return csvContent
  }

  function downloadCSV() {
    try {
      const csvContent = generateCSV()
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.download = 'sweepstake_results.csv'
      document.body.removeChild(link);
      link.click()
    } catch (error) {
      console.error("Error downloading CSV:", error)
      setError("Failed to download CSV file. Please try again later");
    }
  }

  return (
    <div className='gen-page'>
      <div className='intro green'>
        Add everyone's name and set the max number of teams each person can have. Once you are ready, hit "assign team" to start! 
      </div>
      <div className='add-ppl'>
        <AddParticipant addParticipant={addParticipant} />
      </div>
      <div className='team-limit-section'>
        <label><strong>Team Limit</strong></label>
        <input 
          type="number"
          className='team-limit'
          value={teamLimit} 
          onChange={handleTeamLimit} 
          min="1" 
          max="24"
        />
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
        <button onClick={downloadCSV} className='assign-btn'>Download CSV</button>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <TeamList assignedTeams={assignedTeams} />
    </div>
  )
}