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

export const formatTime = (time) => {
	if (time < 60) {
		return `${time} minutes`
	} else {
		const hours = Math.floor(time / 60);
		const minutes = time - hours * 60;
		if (minutes === 0) {
			if (hours === 1) {
				return `${hours} hour`
			} else {
				return `${hours} hours`				
			}
			
		} else {
			return `${hours}h ${minutes}m`
		}
	}
}


export default formatDate;