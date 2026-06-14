export default function DraftPreview({ draft }) {
  if (!draft) return null

  return (
    <div>
      <h2>Generated Draft</h2>
      <p className="draft-box">{draft}</p>
    </div>
  )
}