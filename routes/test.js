const routerName = '/test'

module.exports = apiRouter => {
    console.log("test executed");
    apiRouter.get(routerName, function(req, res){
        res.send('hello world');
    })
}