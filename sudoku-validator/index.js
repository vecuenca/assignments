const args = process.argv.slice(2);

if (args.length < 1) {
  return console.log("Usage: node index.js input_filepath");
}

const fs = require("fs");

fs.readFile(args[0], "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  const sudoku = parseInputFile(data);
});

/**
 * 
 * @param {*} data 
 */
function parseInputFile(data) {
  try {
    return data.split(/\n/).map(x => x.replace(/\r+/, ""));
  } catch (ex) {
    return console.log("Error parsing input file");
  }
}