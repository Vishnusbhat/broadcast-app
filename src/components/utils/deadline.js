//db simulation

let db_btech = {
  AIML: 0,
  Civil: 0,
  CSE: 0,
  ECE: 0,
  EEE: 0,
  ISE: 0,
  Mech: 0,
};

export function fetchCurrentDBState() {
  return db_btech;
}

export function modifyDeadline(
  currentDeadline,
  eligibleBranches,
  current_state
) {
  let branchSet = new Set();
  for (const profiles of eligibleBranches) {
    for (const branch of profiles) {
      branchSet.add(branch);
      if (current_state[branch] > currentDeadline) {
        currentDeadline = current_state[branch];
      }
    }
  }
  console.log('Deadline after referring db: ' + new Date(currentDeadline));
  let newDeadline = new Date(currentDeadline);
  newDeadline.setHours(newDeadline.getHours() + 1);
  console.log('Value updating db: ' + newDeadline);
  newDeadline = newDeadline.getTime();
  for (const branch of branchSet) {
    current_state[branch] = newDeadline;
  }
  console.log(fetchCurrentDBState());
  return currentDeadline;
}

export function getDeadline(date) {
  let d = new Date();
  let currentTime = new Date(date);
  const hour = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const requiredMinutes = minutes % 30;
  d.setDate(currentTime.getDate() + 1);
  d.setHours(hour);
  if (requiredMinutes !== 0) d.setMinutes(minutes + (30 - requiredMinutes));
  else d.setMinutes(minutes);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

//prepare isolated deadline -> fetch blocked values from db -> verify isolated deadline
//(blocked deadline for any eligible branch > isolated dealine, results blocked slot => new deadline = db reading and db reading += 2hrs => save slot in all eligible branch entries in db)

//for_each (eligible branch)
//  if (db.reading < current.deadline)
//      db.reading = current.deadline + 2hrs
//  else
//      current.deadline = db.reading
//      db.reading += 2 hrs for_each (eligible branch)

// for (let i = 0; i < eligibleBranches.length; i++) {
//     for (let key in db && eligibleBranches[i].includes(key)) {
//       if (db[key] > currentDeadline) {
//         currentDeadline = db[key];
//       }
//     }
//     for (let i = 0; i < eligibleBranches.length; i++) {
//       for (let key in db && eligibleBranches[i].includes(key)) {
//         let date = new Date(currentDeadline);
//         let hour = date.getHours();
//         date.setHours(hour + 2);
//         db[key] = date.getDate();
//       }
//     }
//   }

// // Map → Object
// const obj = Object.fromEntries(myMap);

// // Object → Map
// const newMap = new Map(Object.entries(obj));
