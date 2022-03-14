import React from 'react';
import { 
	Routes, 
	Route, 
} from 'react-router-dom';

import Home from './Routes/Home.js';
import View from './Routes/View.js';
import AdminLogin from './Routes/AdminLogin.js';
import AdminList from './Routes/AdminList.js';
import AdminCreate from './Routes/AdminCreate.js';

function App() {
	return (<Routes>
		<Route path='/' exact element={<Home />}/>

		<Route path='/view/:id' element={<View />}/>

		<Route path='/admin' exact element={<AdminLogin />}/>

		<Route path='/admin/list' exact element={<AdminList/>}/>

		<Route path='/admin/create' exact element={<AdminCreate />}/>
	</Routes>);
}

export default App;
