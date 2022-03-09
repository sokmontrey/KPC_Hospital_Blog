import { 
	getMany,
	getOne,
} from '../Controllers/DatabaseController.js';

export async function getHomePost(req, res){
	const body = req.body;
	const index = body.index || 0;
	const limit = 10;

	var skip = index * limit;

	await getMany(skip, limit, (err, results)=>{
		if(err) res.status(500).send(err);
		else res.status(200).send({ postList: results });
	});
}
export async function viewPost(req, res){
	const id = req.params.id;
	await getOne(id, (err, result)=>{
		if(err) res.status(500).send(err);
		else res.status(200).send({ post: result });
	});
}
