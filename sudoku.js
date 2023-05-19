"use strict";

var TESTABLE=true;

var SudokuSolver = function(testable) {
    var solver;

    function solve(boardString) {
        var boardArray = boardString.split("");
        if (boardIsInvalid(boardArray)) {
            return false;
        }
        return recursiveSolve(boardString);
    }

    function boardIsValid(boardArray) {
        return allRowsValid(boardArray) && allColumnValid(boardArray) && allBoxesValid(boardArray);
    }

    function boardIsInvalid(boardArray) {
        return !boardIsValid(boardArray);
    }

    function allRowsValid(boardArray)
    {
        return [0,9,18,27,36,45,54,63,72].map(function(i) {
            return getRow(boardArray,i);
        }).reduce(function (validity, row){
            return collectionIsValid(row) && validity;
        }, true);
    }

    function getRow(boardArray, i) {
        var startingE1 = Math.floor(i / 9) * 9;
        return boardArray.slice(startingE1,startingE1+9)
    }

    function collectionIsValid(collection) {
        var numCounts ={};
        for(var i=0;i<collection.length;i++)
        {
            if (collection[i] != "-"){    
                if(numCounts[collection[i]]==undefined)
                {
                    numCounts[collection[i]] =1;
                }
                else
                {
                    return false;
                }
            }
        }
        return true;
    }

    function allColumnValid(boardArray)
    {
        return [0,9,18,27,36,45,54,63,72].map(function(i) {
            return getColumn(boardArray,i);
        }).reduce(function(validity,row) {
            return collectionIsValid(row) && validity;
        }, true);
    }

    function getColumn(boardArray, i){
        var startingE1 = Math.floor(i % 9);
        return [0,1,2,3,4,5,6,7,8].map(function(num) {
            return boardArray[startingE1 + num *9];
        });
    }

    function allBoxesValid(boardArray) {
        return[0,3,6,27,30,33,54,57,60].map(function(i) {
            return getBox(boardArray, i);
        }).reduce(function(validity,row) {
            return collectionIsValid(row) && validity;
        }, true);
    }

    function getBox(boardArray,i){
        var boxCol = Math.floor(i/3) %3;
        var boxRow = math.floor(i/27);
        var stratingIndex = boxCol*3 + boxRow*27;
        return [0,1,2,9,10,11,18,19,20].map(function (num) {
            return boardArray[stratingIndex + num];
        });
    }

    function recursiveSolve(boardString) {
        var boardArray = boardString.split("");
        if (boardIsSolved(boardArray)) {
            return boardArray.join("");
        }
        var cellPossibilities = getNextCellAndPossibilites(boardArray);
        var nextUnsolvedCellIndex = cellPossibilities.index;
        var possibilites = cellPossibilities.choices;
        for (var i= 0; i< possibilites.length;i++)
        {
            boardArray[nextUnsolvedCellIndex] = possibilites[i];
            var solvedBoard =recursiveSolve(boardArray.join(""));
            if(solvedBoard)
            {
                return solvedBoard;
            }
        }
        return false;
    }

    function getNextCellAndPossibilites(boardArray) {
        for (var i =0 ; i<boardArray.length; i++)
        {
            if(boardArray[i]== "-"){
                var existingValues=getAllIntersections(boardArray,i);
                var choices = ["1","2","3","4","5","6","7","8","9"].filter(function(num) {
                    return existingValues.indexOf(num) <0;
                });
                return { index: i, choices: choices};
            }
        }
    }

    function getAllIntersections(boardArray,i) {
        return getRow(boardArray,i).concat(getColumn(boardArray,i)).concat(getBox(boardArray,i));
    }

    function boardIsSolved(boardArray) {
        for(var i=0;i<boardArray.length;i++) {
            if(boardArray[i]=="-") {
                return false;
            }
        }
        return true;
    }

    function solveAndPrint(boardString) {
        var solvedBoard = solve(boardString);
        console.log(toString(solvedBoard.split("")));
        return solvedBoard;
      }

    function toString(boardArray) {
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
          return getRow(boardArray, i).join(" ");
        }).join("\n");
      }
    
      if (testable) {
        // These methods will be exposed publicly when testing is on.
        solver = { 
          solve: solve,
          solveAndPrint: solveAndPrint,
          recursiveSolve: recursiveSolve,
          boardIsInvalid: boardIsInvalid,
          boardIsValid: boardIsValid,
          boardIsSolved: boardIsSolved,
          getNextCellAndPossibilities: getNextCellAndPossibilities,
          getAllIntersections: getAllIntersections,
          allRowsValid: allRowsValid,
          getRow: getRow,
          allColumnsValid: allColumnsValid,
          getColumn: getColumn,
          allBoxesValid: allBoxesValid,
          getBox: getBox,
          collectionIsValid: collectionIsValid,
          toString: toString };
      } else {
        // These will be the only public methods when testing is off.
        solver = { solve: solve,
          solveAndPrint: solveAndPrint };
      }
    
      return solver;
    }(TESTABLE);




