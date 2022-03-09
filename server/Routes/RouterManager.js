export default function RouterManager(router){
	router.get('/', function(req, res){
		console.log('WORKING');
	});
	return router;
};

