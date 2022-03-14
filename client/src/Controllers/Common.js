export function convertToHowLongDay(date){
	var difference = new Date().getTime() - new Date(date).getTime();
	return Math.ceil(difference / (1000 * 3600 * 24));
}
