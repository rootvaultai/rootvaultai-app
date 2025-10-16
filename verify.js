export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'MethodNotAllowed' });

  const { capsule_id, verifying_agent } = req.body || {};
  globalThis.capsules = globalThis.capsules || {};
  const cap = globalThis.capsules[capsule_id];
  if (!cap) return res.status(404).json({ error: 'CapsuleNotFound' });

  cap.verified = true;
  return res.json({ result: `Capsule verified by ${verifying_agent}` });
}
