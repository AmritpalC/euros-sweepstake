import { useState } from "react"

export default function AddParticipant({addParticipant}) {

  const [name, setName] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addParticipant(name)
      setName('')
    }
  }

  return (
    <div className="add-participant-comp">
      <h2>Add Participant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
}