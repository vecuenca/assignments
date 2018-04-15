const args = process.argv.slice(2);

if (args.length < 1) {
  return console.log("Usage: node index.js input_filepath");
}

const fs = require("fs");
fs.readFile(args[0], "utf8", function(err, data) {
  if (err) {
    return console.log(`Error reading input file, error is ${err}`);
  }

  const sudokuSolution = parseInputFile(data);
  console.log(`The supplied solution is:`);
  console.log(sudokuSolution);
  
  const areRowsValid = sudokuSolution.map(isArrValid)
    .reduce((acc, currentVal) => acc && currentVal, true);

  const transposedSolution = sudokuSolution[0].map((x, i) => sudokuSolution.map(x => x[i]));
  const areColsValid = transposedSolution.map(isArrValid)
    .reduce((acc, currentVal) => acc && currentVal, true);

  console.log(`This ${areRowsValid && areColsValid ? "is" : "is not"} a correct solution.`);
  return areRowsValid && areColsValid;
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

const validArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * Check if supplied array is a valid Sudoku row/column,
 * i.e., it contains the numbers 1-9 with no duplicates.
 * @param {Number[]} arr - array of numbers
 */
function isArrValid(arr) {
  let clone = arr.slice(0);
  return clone.length === validArr.length 
    && clone.sort().every((num, index) => num === validArr[index]);
}