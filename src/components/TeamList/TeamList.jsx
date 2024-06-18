

export default function TeamList({assignedTeams}) {
  return (
    <div className="teams-comp">
      <h2>Assigned Teams</h2>
      <div className="participants-grid">
        {assignedTeams.map((participant, index) => (
            <div key={index} className="participant-card">
              <strong className="green card-name">{participant.name}</strong>
              <ul>
                {participant.teams.map((team, teamIndex) => (
                  <li key={teamIndex} className="teams-list">
                    <span>{team.name}&nbsp;</span> 
                    <img src={team.flag} alt={`${team.name} flag`} width="30" />
                  </li>
                ))}
              </ul>
            </div>
          ))} 
      </div>
    </div>
  )

}