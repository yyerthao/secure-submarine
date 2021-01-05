const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  console.log('is authenticated?', req.isAuthenticated());

  pool
    .query('SELECT * FROM "secret" WHERE "secrecy_level" < $13;', [req.user.id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(403);
    });
});

module.exports = router;
