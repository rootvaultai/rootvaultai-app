const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// MOCK DATABASE for Capsules
let capsules = {};

// POST /mint
app.post('/mint', (req, res) => {
  const { agent_id, creator, metadata_uri, capsule_type } = req.body;

  if (!agent_id || !creator || !metadata_uri || !capsule_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (capsules[agent_id]) {
    return res.status(409).json({ error: 'CapsuleAlreadyExists' });
  }

  capsules[agent_id] = {
    agent_id,
    creator,
    metadata_uri,
    capsule_type,
    trustScore: 950,
    verified: false,
    published_at: new Date().toISOString()
  };

  res.json({ capsule_stored: true, owner: creator, event: 'CapsuleMinted' });
});

// GET /trustscore/:agent_id
app.get('/trustscore/:agent_id', (req, res) => {
  const capsule = capsules[req.params.agent_id];
  if (!capsule) {
    return res.status(404).json({ error: 'CapsuleNotFound' });
  }

  res.json({ trustScore: capsule.trustScore, reputation: "Trusted" });
});

// POST /verify
app.post('/verify', (req, res) => {
  const { capsule_id, verifying_agent } = req.body;
  const capsule = capsules[capsule_id];

  if (!capsule) {
    return res.status(404).json({ error: 'CapsuleNotFound' });
  }

  capsule.verified = true;
  res.json({ result: `Capsule verified by ${verifying_agent}` });
});

app.listen(port, () => {
  console.log(`RootVaultAI API is live at http://localhost:${port}`);
});
