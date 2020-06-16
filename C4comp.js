// move is sometimes getting selected as previous move
// therfore it is not getting spliced from openCells
// maybe it is never entering bestcore if statement

var globalDepth;
var endFunc;
var maxScore = 1000;
var minScore = -1000;
var move;
var scoreCheck;
function aiPlay()
{
  userClicked = false;
  // random open cell
  moveCount++;

  if(moveCount<15)
  globalDepth =10;
 else
  if(moveCount<20)
  globalDepth =12;
 else
 if(moveCount<25)
 globalDepth =15;
 else
 globalDepth =17;


   if (moveCount>5)
   scoreCheck = minimax(true,-1000,1000,0,0,true,false);
   else
   scoreCheck = minimax(true,-1000,1000,0,0,true,true);

   // not letting it choose a direct loosing move
   // for(let i=0;i<openCells.length;i++)
   // {
   //   let tempCell = openCells[i]
   //   tempCell.parentRow.elem[tempCell.posC]= "Y";
   //   let x = updateState(tempCell.parentRow,false,"Y");
   //   tempCell.parentRow.yellowNo --;
   //   tempCell.parentRow.elem[tempCell.posC]= "";
   //   if (x==100)
   //   {
   //      move=tempCell;
   //      break;
   //   }
   //   tempCell.parentCol.elem[tempCell.posR]= "Y"
   //    x = updateState(tempCell.parentCol,false,"Y")
   //    tempCell.parentCol.yellowNo --;
   //    tempCell.parentCol.elem[tempCell.posR]= "";
   //   if (x==100)
   //  {
   //    move=tempCell;
   //    break;
   //  }
   //
   //   if(tempCell.parentDiagL)
   //  {
   //     tempCell.parentDiagL.elem[tempCell.indexL] ="Y";
   //      x = updateState(tempCell.parentDiagL,false,"Y");
   //      tempCell.parentDiagL.yellowNo --;
   //      tempCell.parentDiagL.elem[tempCell.indexL] ="";
   //      if(x==100)
   //        {
   //          move=tempCell;
   //          break;
   //        }
   //   }
   //
   //   if(tempCell.parentDiagR)
   //  {
   //     tempCell.parentDiagR.elem[tempCell.indexR] ="Y";
   //      x = updateState(tempCell.parentDiagR,false,"Y");
   //      tempCell.parentDiagR.yellowNo --;
   //      tempCell.parentDiagR.elem[tempCell.indexR] ="";
   //      if(x==100)
   //        {
   //          move=tempCell;
   //          break;
   //        }
   //   }
   // }

  console.log(scoreCheck)
  tempCell = move;

  tempCell.open=false;
  tempCell.red = true;
  for (let k=0;k<openCells.length;k++)
  {
    if (openCells[k] == tempCell)
        {
          //console.log(" enter")
           openCells.splice(k,1)
        }
  }
  // console.log("i ")
  // console.log(openCells)
  if (tempCell.posR !=0) // pushing if not topmost
  {
    newCell = board[tempCell.posR -1][tempCell.posC];
     newCell.open =true;
     openCells.push(newCell)
   }
   // console.log("f ")
   // console.log(openCells)
  //giving values, updating and checking win
  tempCell.parentRow.elem[tempCell.posC]= "R"
  updateState(tempCell.parentRow,true,"R")
  tempCell.parentCol.elem[tempCell.posR]= "R"
  updateState(tempCell.parentCol,true,"R")
  if(tempCell.parentDiagR)
{
  tempCell.parentDiagR.elem[tempCell.indexR] ="R";
    updateState(tempCell.parentDiagR,true,"R")
}
 if(tempCell.parentDiagL)
{
  tempCell.parentDiagL.elem[tempCell.indexL] ="R";
  updateState(tempCell.parentDiagL,true,"R");
}



}





function minimax(maximising,alpha,beta,depth,heuristic,isFirst,initial)
{

  var maxH =-25;
  var minH =25;
//console.log(openCells)
  if(maximising)
  {
    var bestScore = minScore;
    for(let i=0;i<openCells.length;i++)
    {
      if(initial)
      {
        if (openCells[i].posC<2 || openCells[i].posC>4)
       {
         continue;
       }
      }

      if(openCells[i] != "")
    {
      //taking one cell. making it not open. making above open
      let thisH =0;
      moveCount++;
      var tempCell = openCells[i]
      tempCell.parentRow.elem[tempCell.posC]= "R";
      let x = updateState(tempCell.parentRow,false,"R")
      if(x==100)
        {
          if(isFirst)
          {
            console.log("enter win row")
            move = tempCell;
          }

         unUpdate(i,tempCell,1,false,"R");
         return 100;
       }
      else {
        thisH +=x;
      }
      tempCell.parentCol.elem[tempCell.posR]= "R"
       x = updateState(tempCell.parentCol,false,"R")
     if(x==100)
     {
        if(isFirst)
       {
         console.log(tempCell.parentCol.elem)
         move = tempCell;
       }
       unUpdate(i,tempCell,2,false,"R");
       return 100;
     }
     else {
       thisH +=x;
     }
      if(tempCell.parentDiagR)
     {
        tempCell.parentDiagR.elem[tempCell.indexR] ="R";
        x = updateState(tempCell.parentDiagR,false,"R")
        if(x==100)
           {
             if(isFirst)
              move = tempCell;
             unUpdate(i,tempCell,3,false,"R");
             return 100;
           }
           else
           {
             thisH +=x;
           }
      }
      if(tempCell.parentDiagL)
       {
           tempCell.parentDiagL.elem[tempCell.indexL] ="R";
         x = updateState(tempCell.parentDiagL,false,"R")
       if(x==100)
         {
           if(isFirst)
            move = tempCell;
            unUpdate(i,tempCell,4,false,"R");
            return 100;
        }
        else {
          thisH +=x;
        }
      }

      if(depth>= globalDepth)
       {
         unUpdate(i,tempCell,4,false,"R")
         maxH = Math.max(maxH,thisH);
         if(i==openCells.length-1)
          return heuristic + maxH;
          else
         continue;
       }

     openCells[i] = "";
     if (tempCell.posR >0) // making sure it's not topmost
     {
       newCell = board[tempCell.posR -1][tempCell.posC];
       openCells.push(newCell)
     }

     var score = minimax(false,alpha,beta,depth+1,thisH,false);
    // bestScore = Math.max(score,bestScore);
    //console.log(score)
    if(isFirst)
  {
     if(bestScore<score)
     {
       bestScore = score
       move = tempCell;
       //unUpdate(i,tempCell,4,true,"R");
     }
     unUpdate(i,tempCell,4,true,"R");
  }
  else {
     // if(isFirst)
     // console.log(isFirst)
    bestScore = Math.max(score,bestScore);
    alpha = Math.max(alpha, bestScore)
    unUpdate(i,tempCell,4,true,"R");

    if (beta<=alpha)
    {
       break;
    }
  }

  }
}

  return bestScore;
}


 // minimising
  else {
    var bestScore = maxScore;
    for(let i=0;i<openCells.length;i++)
    {
      if(openCells[i] != "")
    {
      let thisH =0;
      //taking one cell. making it not open. making above open
      moveCount++;
      var tempCell = openCells[i]
      //giving values
      tempCell.parentRow.elem[tempCell.posC]= "Y";
      let x = updateState(tempCell.parentRow,false,"Y");
      if (x==100)
      {
         unUpdate(i,tempCell,1,false,"Y");
         return -100;
      }
      else
      {
        thisH -= x;
      }
      tempCell.parentCol.elem[tempCell.posR]= "Y"
       x = updateState(tempCell.parentCol,false,"Y")
      if (x==100)
     {

       unUpdate(i,tempCell,2,false,"Y");
       return -100;
     }
     else {
         thisH -= x;
     }
      if(tempCell.parentDiagR)
     {
        tempCell.parentDiagR.elem[tempCell.indexR] ="Y";
         x = updateState(tempCell.parentDiagR,false,"Y")
         if(x==100)
           {
             //console.log("enter")
             unUpdate(i,tempCell,3,false,"Y");
             return -100;
           }
           else {
             thisH -= x;
           }
      }
      if(tempCell.parentDiagL)
       {
           tempCell.parentDiagL.elem[tempCell.indexL] ="Y";
          x =updateState(tempCell.parentDiagL,false,"Y")
         if(x==100)
         {
            unUpdate(i,tempCell,4,false,"Y");
            return -100;
        }
        else {
          thisH -= x;
        }
      }
      if(depth>=globalDepth)
       {
         unUpdate(i,tempCell,4,false,"Y");
         minH = Math.min(minH,thisH);
         if(i==openCells.length-1)
         {
          console.log(minH)
          return heuristic + minH;
        }
          else
         continue;
       }
      // updating and checking win
     //cell updated and win checked
     openCells[i] = "";
     if (tempCell.posR >0) // making sure it's not topmost
     {
       newCell = board[tempCell.posR -1][tempCell.posC];
       openCells.push(newCell)
     }

     var score = minimax(true,alpha,beta,depth + 1,thisH,false);
    // if(score!=0 && score!=10)
    //  //console.log(score);
     bestScore = Math.min(score,bestScore);
     beta = Math.min(beta,bestScore)
     unUpdate(i,tempCell,4,true,"Y");

     if(beta<=alpha)
    {
      break;
    }
  }

  }
return bestScore;
}
}





function unUpdate(j,currentCell,x,expanded,player)
{

  moveCount--;

  //console.log("adding back")
  openCells[j] =currentCell;

  if (currentCell.posR >0 && expanded) // making sure it's not topmost
  {

    openCells.splice(openCells.length-1,1)
  }
  if(player=="R")
{
  if(x>=1)
 {
    currentCell.parentRow.elem[currentCell.posC] ="";
    currentCell.parentRow.redNo --;
    //currentCell.parentRow.redNo =10;
 }
if (x>=2)
 {
    currentCell.parentCol.elem[currentCell.posR] ="";
    currentCell.parentCol.redNo --;
  }

   if(x>=3)
  {    if(currentCell.parentDiagR)
    {
    currentCell.parentDiagR.elem[currentCell.indexR] ="";
    currentCell.parentDiagR.redNo --;
    }
  }
   if(x>=4)
  {     if(currentCell.parentDiagL)
    {
      currentCell.parentDiagL.elem[currentCell.indexL] ="";
      currentCell.parentDiagL.redNo --;
    }
  }
}
  else {

    if(x>=1)
   {
      currentCell.parentRow.elem[currentCell.posC] ="";
      currentCell.parentRow.yellowNo --;
      //currentCell.parentRow.redNo =10;
   }
  if (x>=2)
   {
      currentCell.parentCol.elem[currentCell.posR] ="";
      currentCell.parentCol.yellowNo --;
    }

     if(x>=3)
    {    if(currentCell.parentDiagR)
      {
      currentCell.parentDiagR.elem[currentCell.indexR] ="";
      currentCell.parentDiagR.yellowNo --;
      }
    }
     if(x>=4)
    {     if(currentCell.parentDiagL)
      {
        currentCell.parentDiagL.elem[currentCell.indexL] ="";
        currentCell.parentDiagL.yellowNo --;
      }
    }
  }
}
// for(let i=0;i<rows;i++)
// {
//   for(let j=0;j<cols;j++)
// {
//   if(!board[i][j].parentRow)
//   {
//       console.log(i)
//     console.log(j)
//   }
// }
// }
