import React from 'react';
import './App.css';
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

		<Route path='/admin' exact />

		<Route path='/admin/list' exact />

		<Route path='/admin/create' exact />
	</Routes>);
}

export default App;
