const passport = require('passport');
const fetchLogic = require('../controllers/passport-setup')

const  router = require('express').Router();

router.get('/login', (req,res)=>{
    res.render('login')
});

router.get('/logout', (req,res) => {
    res.send('logging out')
});
router.get('/google', passport.authenticate('google',{
    scope: ['profile']
})
);
router.get('/allitems', passport.authenticate('local', {
    successRedirect: '/allitems',
    failureRedirect: '/login',
    failureFlash: true
  }), async function(req, res) {
    // This function will be called if authentication is successful
    try {
      // Call the 'fetch' function from the imported 'fetchLogic' module
      await fetchLogic.fetch(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
router.get('/google/redirect',passport.authenticate('google'),(req, res) => {
    res.send('you have reached the callback URI');
});

module.exports = router;