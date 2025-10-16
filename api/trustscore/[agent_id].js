export default async function handler(req, res) {
  const { agent_id } = req.query || {};
  globalThis.capsules = globalThis.capsules || {};
  const cap = globalThis.capsules[agent_id];
  if (!cap) return res.status(404).json({ error: 'CapsuleNotFound' });
  return res.json({ trustScore: cap.trustScore, reputation: 'Trusted' });
}

