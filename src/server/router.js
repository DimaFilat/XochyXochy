import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  console.log('ok')
  res.send({ test: 'TEST TEST TEST' });
});

export default router;
