import { useState } from "react"

export default function InputPanel({ onSubmit, loading }) {
  const [note, setNote] = useState("")

  const handleSubmit = () => {
    if (!note.trim()) return
    onSubmit(note)
  }

  return (
    <div>
      <textarea
        placeholder='e.g. "tell john we are pushing the deadline to friday, apologize"'
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate draft"}
      </button>
    </div>
  )
}