var months = [['sept', 1], ['oct', 2], ['sept', 0]]
var output = months.reduce((months, m) => {
	months[m[0]] = months[m[0]] || []
	months[m[0]].push({
		assignment: m[1]
	})
	return months;
}, [])

console.log(output)