const routerName = '/test'
const router = require('express').Router();

router.get(routerName, function(req, res){
    console.log('test executed');
    res.send('hello world');
})

module.exports = router