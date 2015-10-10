let state = {
	trials: [
		{
			id: 1,
			name: "B"
		},
		{
			id: 2,
			name: "C"
		}
	],
	trial: {}
}

let _tempobj = {
	id: "int",
	user_id: "int",
	set_id: "int",
	item_id: "int",
	queue_id: "int",
	start: "str",
	reaction_time: "str",
	response_time: "str",
	answer: "str",
	target: "str",
	cue: "str",
	pic: "str",
	accuracy: "int",
	difficulty: "str",
	grading: "str",
	augitem_id: "int",
	augcue: "str",
	related: "str",
	choices: "str",
	none: "bool",
	stem: "str",
	feedback: "str",
	praise: "str"
}

state = Object.assign({...state}, _tempobj)

console.log(state)