export const formatDate = (unFormatedDate) => {
	const date = new Date(unFormatedDate);
	const day = date.getDate();
	const month = getMonthName(date.getMonth());
	const year = date.getFullYear();
	return `${day} ${month} ${year}`
}

function getMonthName(monthNumber) {
	const monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	];
	return monthNames[monthNumber]	
}

export default formatDate;