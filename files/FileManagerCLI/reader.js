const fs = require("fs");

// const reader = fs.createReadStream("./hello.txt", "utf-8");

// //data event
// reader.on("data", (dat) => {
//   console.log(dat);
// });

// //end event
// reader.on("end", () => {
//   console.log('READING DONE...');
// });

// // error event
// reader.on("error", (err) => {
//   console.log("ERROR: " + err);
// });


// write stream

// fs.createWriteStream('./transformer.txt', 'utf-8').write("I am Optimus Prime from Cybertron");

const writer = fs.createWriteStream('./transformer.txt', { encoding: 'utf-8', flags: 'a' });
writer.write("\nI am Optimus Prime from Cybertron");