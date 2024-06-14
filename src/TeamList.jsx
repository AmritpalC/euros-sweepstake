

export default function TeamList({assignedTeams}) {
  return (
    <div className="teams-comp">
      <h2>Assigned Teams</h2>
      <ul>
        {assignedTeams.map((participant, index) => (
            <li key={index}>
              <strong>{participant.name}</strong>:
              <ul>
                {participant.teams.map((team, teamIndex) => (
                  <li key={teamIndex}>
                    <span>{team.name}&nbsp;</span> 
                    <img src={team.flag} alt={`${team.name} flag`} width="30" />
                  </li>
                ))}
              </ul>
            </li>
          ))} 
      </ul>
    </div>
  )

}