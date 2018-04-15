process.env.NODE_ENV = "test";

const assert  = require("assert");
const validator = require("../sudoku-validator");

describe("Sudoku Validator", function() {
  describe("Invalid input", function() {
    it("should throw when given a nonexistent file", function() {
      assert.throws(() => {
          validator.validate("HarryPotterAndTheGobletOfFire.txt");
        }, /Error reading input file\.*/
      );
    });

    it("should throw when given a grid that is not square ", function() {
      assert.throws(() => {
          validator.validate("./test/not_square_input.txt");
        }, /Provided grid is not a 9x9 square/
      );
    });

    it("should throw when given a grid that contains non integers ", function() {
      assert.throws(() => {
          validator.validate("./test/non_int_input.txt");
        }, /Provided grid does not contain solely integers/
      );
    });
  });

  describe("Valid input", function() {
    it("should return true when given a valid and correct grid", function() {
      assert.equal(validator.validate("./test/correct_input.txt"), true);
    });

    it("should return false when given a valid and incorrect grid", function() {
      assert.equal(validator.validate("./test/incorrect_input.txt"), false);
    });

    it(`should return false when given a valid and incorrect grid that has 
      valid rows and columns, but invalid subgrids`, function() {
      assert.equal(validator.validate("./test/incorrect_input.txt"), false);
    });
  });
});