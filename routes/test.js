const routerName = '/test'
const router = require('express').Router();

router.get(routerName, function(req, res){
    console.log('test executed');

    resBody = {
        "response": {
          "template": {
            "outputs": ["helloworld"]
          },
          "version": "2.0" 
        }
      }

    res.send(resBody);
})

module.exports = router