/*

Need to request to GET the current sequence from the user_id and the set_id. If there is no current sequence, or if the last sequence was completed (error check because we should always create a new sequence after finishing previous) then we will POST a new sequence with user_id, set_id, mode, format, timing and difficulty. For the difficulty, check the assignment of the user & set. If no assignment, use intermediate default. 

Once we get the sequence, which has the current position variable, we will dispatch the data to the redux store. We can also use the nested set object in the sequence to display the title in the header component. 

Once we have the sequence object, with its id, position and length we can begin filling in the redux store. We can also fill the store with the set object and the user object (even though this theoretically could come from the user store).

If we have the sequence ID that we're looking for, then we can concurrenttly call to get all of the slots for that sequence. So this is a separate function that will use async to get all slots, but can happen at same time in axios.all call.  

The slots will be a list of objects that will help us fill our sign posting in terms of colors and length. Each slot will serve to give us the cue/target, and all the help that is avail. We will need helper functions to crawl through the current slot object to determine which hint or which format we are going to use next. 

We will gather this list of slots and in order to filter/find the current slot, we will just use the current position specified by redux store (aka sequence). The current slot will tell us whether the user can most importantly 1) click to answer, 2) has hints avail and 3) what the current level/format they are on. We can choose to show the original cue which is in the nested item object, or we can show the censored_cue in the slot. 

We will need specific methods for a) adapting upon wrong answer b) showing hint upon user click and c) showing correct answer upon optimistic grading / PUT response 

Once we get the current slot object, we will GET all of the trials at /slots/slot:id/trials. We will filter to the last incomplete trial and note which format it was left at. Immediately call for a new trial, with the DateTime for the start key. 

To POST a new trial, we need to know the slot_id, visible or shown_cue, the format last used in slot/last_trial, and some other values provided by the slot or sequence. We can simultaneously show the cue to the user, POST this trial and further wait for response. This should all happen in same time to keep start time consistent. 

Upon a successful POST to the trial, store the response data in the store in the current_trial. Wait for user action. They can navigate away (how do we determine??), answer incorrectly, answer correctly or seek a hint. Each of these well defined actions can either use one action passing in different arguments or have well-defined functions for themselves. Or pass through one parent method and then get sent to other helper functions. 

When a user takes action, we are making a PUT to that trial, with the reaction_time, response_time, answer (if there is any). If the user clicks HINT, that creates a new trial (POST) with the next augmentation/hint in our slot bucket. On this POST, need to specify that the user took action to receive help. *Check the non-bolded content in the docs*. But specifying the help/format displayed will be sent in the POST request. 


/*