Array.remove = function(array, item) {
	var indexOf = array.indexOf(item);
	if (indexOf>-1) {
		array.splice(indexOf,1);
		item.$included = false;
	}
};
