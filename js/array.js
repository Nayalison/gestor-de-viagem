Array.remove = function(array, item) {
	var indexOf = array.indexOf(item);
	if (indexOf>-1) {
		array.splice(indexOf,1);
		item.$included = false;
	}
}

Array.contains = function(array, item, property) {
	if (item.$included!==undefined) {
      return item.$included;
    }

    var included = false;
    for (var i in array) {
      if (array[i][property] == item[property]) {
        included = true;
        break;
      }
    }
    item.$included = included;
    return included;
}

Array.add = function(array, item) {
	array.push(item);
	item.$included = true;
}