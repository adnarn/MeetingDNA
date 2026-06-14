export default function ApproveReject({ taskId, onApprove, onReject }) {
  if (!taskId) return null

  return (
    <div className="actions">
      <button className="btn-approve" onClick={() => onApprove(taskId)}>✓ Approve & send</button>
      <button className="btn-reject" onClick={onReject}>✕ Reject</button>
    </div>
  )
}