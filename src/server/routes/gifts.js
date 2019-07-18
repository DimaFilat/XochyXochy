import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ msg: 'this is gifts page' });
});

export default router;
