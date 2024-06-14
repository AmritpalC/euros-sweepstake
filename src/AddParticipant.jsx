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
    <div>
      <h2>Add Participant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}