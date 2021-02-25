
// Usage: sha512("Password").then((hash) => console.log(hash));
function sha512(str) {
	return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
		return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
	});
}

function generateID(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function getOrderStatus(val) {
	console.log(val);
	if (val == 0) {
		return "PENDING";
	}
	else if(val == 1)
	{
		return "Processing";
	}
	else if(val == 2)
	{
		return "On way";
	}
	else if(val == 3)
	{
		return "Delivered";
	}
	else
	{
		return "Cancelled";
	}
}

// "PENDING": 0,
//     "PROCESSING": 1,
//     "ON_WAY": 2,
//     "DELEIVERED": 3,
//     "CANCELLED": 4