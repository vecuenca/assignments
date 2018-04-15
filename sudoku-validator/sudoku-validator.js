const fs = require("fs");

const sudokuValidator = (function() {
  return {
    validate: validate
  }

  /**
   * Validates the given Sudoku grid is a correct solution, i.e., that:
   * - it is a 9 X 9 grid of integers
   * - all of its rows, columns, and 3 X 3 subgrids contain the integers 1-9 exclusively
   * @param {String} filename - location of text file with Sudoku grid
   */
  function validate(filename) {
    let data;
    // we're just reading a small text file, 
    // so using readFileSync is negligble for performance -
    // otherwise would use readFile
    try {
      data = fs.readFileSync(filename, "utf8");
    } catch (ex) {
      throw new Error (`Error reading input file, exception is ${ex}`);
    }
    
    // Collect the rows, columns, and subgrids as arrays of arrays
    const sudokuSolution = parseInputFile(data);
    assertGridValid(sudokuSolution);  
    const transposedSolution = transpose(sudokuSolution);
    const subGrids = mapSolutionToSubGrids(sudokuSolution);
    
    // ANDs together a collection of bools into one bool
    function reducer(acc, currentValue) {
      return acc && currentValue;
    }

    const isSolutionCorrect = [sudokuSolution, transposedSolution, subGrids]
      .map(arr => arr.map(isArrValid).reduce(reducer, true))
      .reduce(reducer, true);

    console.log(isSolutionCorrect);
    return isSolutionCorrect;
  }
  
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
      throw `Error parsing input file, exception is ${ex}`;
    }
  }
  
  /**
   * Check if supplied array is a valid Sudoku row/column,
   * i.e., it contains the numbers 1-9 with no duplicates.
   * @param {Number[]} arr - array of numbers
   * @returns {boolean}
   */
  function isArrValid(arr) {
    const validArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let clone = arr.slice(0);
    return clone.length === validArr.length 
      && clone.sort().every((num, index) => num === validArr[index]);
  }
  
  /**
   * "Rotate" the 2D array, such that the rows become the columns
   * and vice versa
   * @param {Array[]} matrix - 2D array to transpose
   * @returns {Array[]} the transposed array
   */
  function transpose(matrix) {
    return matrix[0].map((x, i) => matrix.map(x => x[i]));
  }
  
  /**
   * Return an array of arrays, where each sub array 
   * corresponds to a 3x3 grid in the provided Sudoku grid
   * @param {Array[]} soln - a Sudoku grid
   * @returns {Array[]}
   */
  function mapSolutionToSubGrids(soln) {
    const subGridCoordinates = [
      [0, 0], [0, 3], [0, 6],
      [3, 0], [3, 3], [3, 6],
      [6, 0], [6, 3], [6, 6],
    ];
  
    // find every 3x3 grid given its origin above
    return subGridCoordinates.map(coord => {
      let subGrid = [];
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          subGrid.push(soln[coord[0] + y][coord[1] + x]);
        }
      }
      return subGrid;
    });
  }
  
  /**
   * Check if provided Sudoku grid is valid, such that:
   * - it is a 9 x 9 square
   * - it contains all integers
   * Throws appropriate exceptions if this is not the case
   * @param {Number[]} grid - a Sudoku grid
   */
  function assertGridValid(grid) {
    if (grid.length !== 9 || !grid.every(row => row.length === 9)) {
      throw new Error("Provided grid is not a 9x9 square");
    }
  
    grid.forEach(row => {
      row.forEach(val => {
        if (!Number.isInteger(val)) {
          throw new Error("Provided grid does not contain solely integers");
        }
      })
    })
  }
})();

module.exports = sudokuValidator;