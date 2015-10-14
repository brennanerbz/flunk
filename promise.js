
// we can filter all the items down to those which haven't been completed
// we can use the order variable on the object to compare
// we do this by adding one to the given count, until we find a match 
// for var i = pos; i < list.length; i++
// if i == list.length { loop(pos = 0) } 
// if q['order'] == i { new_pos = q['order'] return; }
// axios.put(sequences/id with new_pos)

var items = [
	{
		completion: 'None',
		order: 1
	},
	{
		completion: 'Jokes',
		order: 2
	},
	{
		completion: 'Y',
		order: 3
	},
	{
		completion: 'J',
		order: 4
	},
	{
		completion: 'Load',
		order: 5
	},
	{
		completion: 'Babe',
		order: 6
	},
	{
		completion: 'None',
		order: 7
	}
]
var last_item = items.slice(-1)[0]
var pos = 6;

function prev(pos) {
	for (var i = pos; i < items.length; i--) {
		if(items[i]['completion'] == "None") { 			
			return i;
		}
	}
}
function next(pos) {
	for(var i = pos - 1; i < items.length; i++) {
		if(items[i]['completion'] == 'None') {
			return i;
		}
	}
}
function move(dir, pos) {
	let val,
		recur,
		length = last_item['order']
	if (dir == 'next') {
		if (pos == length) {
			pos = 1
		}
		val = next(pos)
		recur = next(1)
	} else if (dir == 'prev') {
		if (pos - 1 === 0 || pos === 0) {
			pos = length;
		}
		val = prev(pos - 1)
		recur = prev(length - 1)
	}		
	if (val !== undefined) {
		return items[val]['order'];
	} else {
		return items[recur]['order'];
	}
}
function checkCompleted(dir, pos) {
	var none = items.filter(item => item.completion == "None") 
	if (none.length !== 0) {
		return move(dir, pos)
	} else {
		console.log("New sequence being created")
		return false;
	}
}


console.log(checkCompleted('next', pos))
console.log(checkCompleted('prev', pos - 1))








// -------------------------------------------------------------------------------

// function getNextHighestIndex(arr, value) {
//     var i = arr.length;
//     while (arr[--i] > value);
//     return ++i; 
// }

// getNextHighestIndex([2, 5, 12, 34, 56], 17);  // 3
// getNextHighestIndex([2, 5, 12, 34, 56], 100); // 5
// getNextHighestIndex([2, 5, 12, 34, 56], 0);   // 0