const args = process.argv.slice(2);

if (args.length < 1) {
  return console.log("Usage: node index.js input_filepath");
}

const fs = require("fs");

fs.readFile(args[0], "utf8", function(err, data) {
  if (err) {
    return console.log(`Error reading input file, error is ${err}`);
  }

  const sudoku = parseInputFile(data);
});

/**
 * Cleans a sudoku string and transforms it into a 2D array of numbers
 * @param {string} data - data read from input file
 */
function parseInputFile(data) {
  try {
    return data.split(/\n/)
      .map(x => x.replace(/\r+/, ""))
      .map(row => row.split("").map(num => Number(num)));
  } catch (ex) {
    return console.log("Error parsing input file");
  }
}