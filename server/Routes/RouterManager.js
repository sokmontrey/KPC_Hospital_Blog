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
	router.get('/:index/:limit', getHomePost);
	router.get('/view/:id', viewPost);

	router.post('/admin', verifyAdmin);
	router.get('/admin/list', getAll);
	router.post('/admin/create', createPost);
	router.post('/admin/update/:id', updatePost);
	router.post('/admin/remove', removePost);
	return router;
};

