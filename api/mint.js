export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'MethodNotAllowed' });

  const { agent_id, creator, metadata_uri, capsule_type } = req.body || {};
  if (!agent_id || !creator || !metadata_uri || !capsule_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  globalThis.capsules = globalThis.capsules || {};
  if (globalThis.capsules[agent_id]) {
    return res.status(409).json({ error: 'CapsuleAlreadyExists' });
  }

  globalThis.capsules[agent_id] = {
    agent_id, creator, metadata_uri, capsule_type,
    trustScore: 950, verified: false,
    published_at: new Date().toISOString()
  };

  return res.json({ capsule_stored: true, owner: creator, event: 'CapsuleMinted' });
}
