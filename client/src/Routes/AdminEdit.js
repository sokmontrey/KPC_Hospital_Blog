import { useState } from 'react';
import { Topbar } from '../Components/Components.js';

import { 
	CreateAdminPost,
	UpdateAdminPost,
	GetViewPost
} from '../Controllers/FetchController.js';

export default function AdminEdit(props){
	const isNew = props.isNew;
	const [id, setId] = useState(null);

	return (<div>
		Admin Create
	</div>);
}

function _createEmpty(){

}
