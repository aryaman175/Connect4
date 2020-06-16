var cols =7;
var rows =6;
var board =[]
var cnv;
var openCells =[];
var boardParts =[]
var colGroup =[]
var activeSet =[];
var rightDiags =[];
var leftDiags =[];
var userClicked = false;
var waited = false;

function setup()
{
// creating canvas
  cnv = createCanvas(w,h)
  cnv.position(10,0)
  reload();
// pushing cells into board
// making bottom cells open and pushing them into openCells
//   for(let i=0;i<rows;i++)
// {
//     board[i] =[];
//     for(let j=0;j<cols;j++)
//   {
//     board[i].push(new cell(j,i)) // j is x
//    if (i==rows-1)
//   {
//        board[i][j].open= true;
//      openCells.push(board[i][j])
//    }
//   }
// }
//
// //VALUE STUFF BEGINS
// // creating row & col objects
// for(let i=0;i<cols;i++)
// {
//   colGroup.push(new col)
//   if(i!=cols-1)
//   {
//     boardParts.push(new row)
//   }
// }
// // diag objects
// for(let i=0;i<rows;i++)
// {
//   rightDiags.push(new diagR)
//   leftDiags.push(new diagL)
// }
// //giving rows their elements children/parent
// for(let i=0;i<rows;i++)
// {
//   for(let j=0;j<cols;j++)
// {
//   boardParts[i].elem.push("")
//   board[i][j].parentRow = boardParts[i]
//   boardParts[i].children.push(board[i][j])
// }
// }
// //giving cols their elements & children/parent
// for(let i=0;i<cols;i++)
// {
//   for(let j=0;j<rows;j++)
// {
//    colGroup[i].elem.push("")
//   board[j][i].parentCol = colGroup[i];
//   colGroup[i].children.push(board[j][i])
// }
// }
// // giving diagonals thier starting positions
//  startPosR();
//  startPosL();
//  for(let i=0;i<rightDiags.length;i++)
//  {
//
//    rightDiags[i].rowNo = startposesR[2*i]
//    rightDiags[i].colNo = startposesR[2*i +1]
//    leftDiags[i].rowNo = startposesL[2*i]
//    leftDiags[i].colNo = startposesL[2*i +1]
//  }
//  //giving right diagonals their elements & children/parent
//  for(let i=0;i<rightDiags.length;i++)
//  {
//
//    let r = rightDiags[i].rowNo
//    let c = rightDiags[i].colNo
//    let count =0;
//    while(board[r] != undefined)
//   {
//
//     if(c !=cols)
//   {
//     rightDiags[i].elem.push("");
//     board[r][c].parentDiagR = rightDiags[i];
//     rightDiags[i].children.push(board[r][c]);
//     board[r][c].indexR =count;
//     count++;
//   }
//   else
//    r=-1;
//
//   r--;
//   c++;
//  }
// }
//
// //giving left diagonals their elements & children/parent
// for(let i=0;i<rightDiags.length;i++)
// {
//   let r = leftDiags[i].rowNo
//   let c = leftDiags[i].colNo
//   let count =0;
//   while(board[r] != undefined)
//  {
//
//    if(c !=-1)
//  {
//    leftDiags[i].elem.push("")
//    board[r][c].parentDiagL = leftDiags[i];
//    leftDiags[i].children.push(board[r][c]);
//    board[r][c].indexL =count;
//    count++;
//  }
//  else
//   r=-1;
//
//  r--;
//  c--;
// }
// }

}

function draw()
{
  // waits for a loop after user clicks on a cell
  if(waited)
  {
     aiPlay()
     waited = false;
     userClicked = false;
  }

  if(userClicked)
  {
    waited=true;
    (document).querySelector("#status").innerHTML = "AI is thinking...";
  }else
  {
    (document).querySelector("#status").innerHTML = "Your Move";
  }

  background(0,0,100)

  for(let i=0;i<rows;i++)
  {
    for(let j=0;j<cols;j++)
  {
       strokeWeight(0)
    board[i][j].show()
  }
  }
  //showing endgame lines
 if(endgame)
 drawLine2();


}

// calls findCell which makes open cells light up when cursor moves over
function mouseMoved() //called every time the mouse moves and a mouse button is not pressed.
{
  findCell();
}

// user move
function mousePressed()
{
  $("#refresh").on("click",function()
 {
   reload();
 }
)

  var tempCell = findCell();
  var newCell;
  if (tempCell)
  {
    moveCount++;
    tempCell.open=false;
    tempCell.yellow = true;
  // giving values & updating
  tempCell.parentRow.elem[tempCell.posC]= "Y";
  updateState(tempCell.parentRow,true,"Y")
  tempCell.parentCol.elem[tempCell.posR]= "Y";
  updateState(tempCell.parentCol,true,"Y")
  if(tempCell.parentDiagR)
{
  tempCell.parentDiagR.elem[tempCell.indexR] ="Y";
    updateState(tempCell.parentDiagR,true,"Y")
}
if(tempCell.parentDiagL)
{
  tempCell.parentDiagL.elem[tempCell.indexL] ="Y";
  updateState(tempCell.parentDiagL,true,"Y");
}

    // removing this cell
    // making cell above open
    // replacing new open with this cell
      for (let k=0;k<openCells.length;k++)
      {
        if (openCells[k] == tempCell)
            {
              openCells.splice(k,1)
            }
      }
    if (tempCell.posR !=0) // pushing if not topmost
        {
            newCell = board[tempCell.posR -1][tempCell.posC];
            newCell.open =true;
           openCells.push(newCell)
        }

      //aiPlay() // playing if user clicks on open cell
   userClicked = true;
  }


}


// returns the open cell that mouse is over
// also makes open cells light up when cursor moves over them
function findCell()
{
  // checks inside canvas
  for(let k=0;k<openCells.length;k++)
  {
    // console.log("k= " + k)
    // console.log(openCells)
      var d=dist(openCells[k].x,openCells[k].y,mouseX,mouseY)
      if (d<=dia/2)
      {
         openCells[k].mouseOn = true;
         return openCells[k];
      }
      else {
        openCells[k].mouseOn = false;
      }
    }
  }

function reload()
{
  // buttons
  $((document).getElementById("refresh")).hide();
  $((document).getElementById("status")).show();
  document.getElementById("status").innerHTML ="Your move"
  document.getElementById("final").innerHTML = "";

  // variables
  board =[]
  openCells =[]
  boardParts =[]
  colGroup =[]
  rightDiags =[];
  leftDiags =[];
  endgame  = false;
  moveCount =0;

  for(let i=0;i<rows;i++)
{
    board[i] =[];
    for(let j=0;j<cols;j++)
  {
    board[i].push(new cell(j,i)) // j is x
   if (i==rows-1)
  {
       board[i][j].open= true;
     openCells.push(board[i][j])
   }
  }
}

//VALUE STUFF BEGINS
// creating row & col objects
for(let i=0;i<cols;i++)
{
  colGroup.push(new col)
  if(i!=cols-1)
  {
    boardParts.push(new row)
  }
}
// diag objects
for(let i=0;i<rows;i++)
{
  rightDiags.push(new diagR)
  leftDiags.push(new diagL)
}
//giving rows their elements children/parent
for(let i=0;i<rows;i++)
{
  for(let j=0;j<cols;j++)
{
  boardParts[i].elem.push("")
  board[i][j].parentRow = boardParts[i]
  boardParts[i].children.push(board[i][j])
}
}
//giving cols their elements & children/parent
for(let i=0;i<cols;i++)
{
  for(let j=0;j<rows;j++)
{
   colGroup[i].elem.push("")
  board[j][i].parentCol = colGroup[i];
  colGroup[i].children.push(board[j][i])
}
}
// giving diagonals thier starting positions
 startPosR();
 startPosL();
 for(let i=0;i<rightDiags.length;i++)
 {

   rightDiags[i].rowNo = startposesR[2*i]
   rightDiags[i].colNo = startposesR[2*i +1]
   leftDiags[i].rowNo = startposesL[2*i]
   leftDiags[i].colNo = startposesL[2*i +1]
 }
 //giving right diagonals their elements & children/parent
 for(let i=0;i<rightDiags.length;i++)
 {

   let r = rightDiags[i].rowNo
   let c = rightDiags[i].colNo
   let count =0;
   while(board[r] != undefined)
  {

    if(c !=cols)
  {
    rightDiags[i].elem.push("");
    board[r][c].parentDiagR = rightDiags[i];
    rightDiags[i].children.push(board[r][c]);
    board[r][c].indexR =count;
    count++;
  }
  else
   r=-1;

  r--;
  c++;
 }
}

//giving left diagonals their elements & children/parent
for(let i=0;i<rightDiags.length;i++)
{
  let r = leftDiags[i].rowNo
  let c = leftDiags[i].colNo
  let count =0;
  while(board[r] != undefined)
 {

   if(c !=-1)
 {
   leftDiags[i].elem.push("")
   board[r][c].parentDiagL = leftDiags[i];
   leftDiags[i].children.push(board[r][c]);
   board[r][c].indexL =count;
   count++;
 }
 else
  r=-1;

 r--;
 c--;
}
}
}
