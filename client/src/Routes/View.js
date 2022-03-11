import { useParams } from "react-router-dom";

export default function View(){
	const { id } = useParams();

	return (<>
		<h1>view {id}</h1>
	</>);
}
