(function() {
  const validator = require("./sudoku-validator");
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    throw "Usage: node index.js input_filepath";
  }
  validator.validate(args[0]);
})();