import { 
	getHomePost,
	viewPost,
} from './PostRoute.js';

import {
	verifyAdmin,
	getAll,
	createPost,
	updatePost,
	removePost,
} from './AdminRoute.js';

export default function RouterManager(router){
	router.get('/', getHomePost);
	router.get('/view/:id', viewPost);

	router.post('/admin', verifyAdmin);
	router.post('/admin/list', getAll);
	router.post('/admin/create', createPost);
	router.post('/admin/update', updatePost);
	router.post('/admin/remove', removePost);
	return router;
};

