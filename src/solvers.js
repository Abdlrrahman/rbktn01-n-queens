/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

  
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.solutions = function(n,array,func){
window.findNRooksSolution = function(n) {
  var board = new Board({"n":n});

  for (var i = 0; i < n; i++){
    for (var j = 0; j < n ; j++){
      board.togglePiece(i,j)
      if ( board.hasAnyRooksConflicts() ){
        board.togglePiece(i,j)
      }
    }
  }
   
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});

  var search = function(row){

    row = row || 0;
    if(n === row){
      solutionCount++;
      return;
    }else{
      for(var col = 0; col < n; col++){
        board.togglePiece(row, col);
        if(!board.hasColConflictAt(col)){
          search(row+1);
        }
        board.togglePiece(row, col);
      }
    }
  }

  search();

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n':n});
  var solution = [];
  var search = function(row){
    row = row || 0;
    if(n === row){
      var maybe = board.rows();
      var count = 0;
      for(var i = 0; i < maybe.length; i++){
        for(var j = 0; j < maybe[i].length; j++){
          count += maybe[i][j];
        }
      }
      if(count === n || n === 0){
        solution.push(board.rows());
        return;
      }
    }else{
      for(var col = 0; col < n; col++){

        board.togglePiece(row, col);

        if(!board.hasAnyQueenConflictsOn(row, col)){
          search(row+1);
          if(solution.length === 1)
            return;
        }
        board.togglePiece(row, col);
      }
    }

  }

  search();

  if(solution[0] === undefined){
    solution[0] = board.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return solution[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});
  
  var search = function(row){
    row = row || 0;
    if(n === row){
      var maybe = board.rows();
      var count = 0;
      for(var i = 0; i < maybe.length; i++){
        for(var j = 0; j < maybe[i].length; j++){
          count += maybe[i][j];
        }
      }
      if(count === n || n=== 0){
        solutionCount++;
      }
    }else{
      for(var col = 0; col < n; col++){

        board.togglePiece(row, col);

        if(!board.hasAnyQueenConflictsOn(row, col)){
          search(row+1);
        }
        board.togglePiece(row, col);
      }
    }

  }

  search();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};