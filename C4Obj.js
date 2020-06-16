var h = 720;
var w = 950;
var cols =7;
var rows =6;
var marginX =20;
var marginY =6;
var startposesR =[]
var startposesL =[]
var endgame = false;
var winObj;
var winIndex;
var moveCount =0;

// calc diameter
var dia = (w - (cols + 1)*marginX)/ cols;
// calc diff in cord for diagn line points
var changeCor = dia/(2*1.414);

function cell(x,y)
{
  // position in rows/cols array;
  this.posR = y;
  this.posC = x;
  // center of circle coord
  this.x = marginX*(x+1) + x*dia +dia/2;
  this.y = marginY*(y+1) + y*dia +dia/2;

  this.yellow =false;
  this.red = false;
  this.open =false;
  this.mouseOn = false;
  this.parentRow;
  this.parentCol;
  this.parentDiagR;
  this.parentDiagL;
  // indices for diagonals
  this.indexL;
  this.indexR;
  this.end =false;


  this.show = function()
  {
    if (this.end && this.yellow)
     fill(200,200,150);
     else
     if(this.yellow)
      fill(200,200,0)
    else
     if (this.end&&this.red)
      fill(200,120,120)
      else
      if(this.red)
      fill(200,0,0)
    else
     if (this.mouseOn)
      fill(100,100,0);
      else
      if (this.open)
      fill(180);
      else
      fill(255);

    circle(this.x,this.y,dia)
  }
}

function row()
{
  this.elem =[]
  this.yellowNo =0;
  this.redNo =0
  this.finish;
  this.children =[];
}

function col()
{
  this.elem =[]
  this.yellowNo =0;
  this.redNo =0;
  this.finish;
  this.children =[];
}
function diagR()
{
  this.elem =[]
  this.yellowNo =0;
  this.redNo =0;
  this.finish;
  this.rowNo;
  this.colNo;
  this.children =[];
}
function diagL()
{
  this.elem =[]
  this.yellowNo =0;
  this.redNo =0;
  this.finish;
  this.rowNo;
  this.colNo;
  this.children =[];
}


// updating number of each colour & calling win if necessary;
function updateState(myObj,realMove,player)
{
  if(player=="Y")
  {
    myObj.yellowNo++;
    if(myObj.yellowNo>=3)
    {
      return checkWin(myObj,realMove,player);
    }
  }
  else
 {
   myObj.redNo++;
   if(myObj.redNo>=3)
   {
     return checkWin(myObj,realMove,player);
   }
 }

 return 0;
}

function checkWin(myObj,isRealMove,player)
{
  var winner = false;
  var combo3 = false;
  var tempH =0;
  var count =0;
  var index;
  for (let i=0;i<myObj.elem.length;i++)
  {
    if(myObj.elem[i-1] && myObj.elem[i]==myObj.elem[i-1])
    {
      count++;
      if(count==2)
      {
        index=i;
        combo3 = true;
      }
      if (count==3)
      {
        index =i;
        winner = true;
         break;
      }
    }
    else {
      count =0;
    }
  }

    if(winner)  //win
    {
     if(isRealMove)
      {
        winObj =myObj;
        endgame =true;
        finish(myObj,index,player);
        return;
      }
      else {
      //  console.log("entered")
        return 100;
      }
    }
   if(combo3)
  {
    if(index+1<myObj.elem.length && myObj.elem[index+1]=="")
      {
        tempH++;
      }
     if(index-3>=0 && myObj.elem[index-3]=="")
      {
        tempH++;
      }
  }
 // draw
  if(moveCount == 42 && isRealMove)
  {
    document.getElementById("final").innerHTML = "Draw";
    $((document).getElementById("status")).hide();
    $((document).getElementById("refresh")).show();
    return;
  }

 return tempH;
}



// makes other dim and writes on dom
function finish(myObj,index,player)
{
  winIndex =index;

  for(let m=0;m<rows;m++)
  {
    for(let n=0;n<cols;n++)
    board[m][n].end =true;
  }
  //let winCombo =[]
  for(j=index;j>=index-3;j--)
  {
      //winCombo.push(myObj.children[j])
      myObj.children[j].end=false;
  }
  if (player == "R")
  document.querySelector("#final").innerHTML ="You lost!";
  else
  document.querySelector("#final").innerHTML ="You won!";
  $((document).getElementById("status")).hide();

  $((document).getElementById("refresh")).show();

  waited = false;
  userClicked = false;
}

function drawLine2()
{
  //let winCombo =[]
      let j =winIndex;
      strokeWeight(6)
      if(winObj instanceof row)
      {
        line(winObj.children[j].x + dia/2,winObj.children[j].y,winObj.children[j-3].x - dia/2,winObj.children[j-3].y)
      }
      if(winObj instanceof col)
      {
        line(winObj.children[j].x,winObj.children[j].y + dia/2,winObj.children[j-3].x ,winObj.children[j-3].y -dia/2)
      }
      if(winObj instanceof diagR)
      {
         line(winObj.children[j].x +changeCor,winObj.children[j].y -changeCor ,winObj.children[j-3].x -changeCor,winObj.children[j-3].y +changeCor)

      }
      if(winObj instanceof diagL)
      {
         line(winObj.children[j].x -changeCor,winObj.children[j].y -changeCor ,winObj.children[j-3].x +changeCor,winObj.children[j-3].y +changeCor)
      }

}

function drawLine()
{
  //let winCombo =[]
  for(j=winIndex;j>=winIndex-3;j--)
  {
      let child = winObj.children[j]
      strokeWeight(6)
      if(winObj instanceof row)
      {
        //console.log("enter row")
        line(child.x,child.y,child.x + dia/2,child.y)
        line(child.x,child.y,child.x-dia/2,child.y)
      }
      if(winObj instanceof col)
      {
        //console.log("enter cols")
        line(child.x,child.y,child.x,child.y +dia/2)
        line(child.x,child.y,child.x,child.y -dia/2)
      }
      if(winObj instanceof diagR)
      {
         line(child.x,child.y,child.x +changeCor,child.y -changeCor)
         line(child.x,child.y,child.x -changeCor,child.y +changeCor)
      }
      if(winObj instanceof diagL)
      {
         line(child.x,child.y,child.x +changeCor,child.y +changeCor)
         line(child.x,child.y,child.x -changeCor,child.y -changeCor)
      }

}
}

// puts starting pos of all right diagonals into array
function startPosR()
{
 startposesR=[3,0,4,0]
  for(let q=0;q<4;q++)
  {
    startposesR.push(5)
    startposesR.push(q)
  }
}

//puts starting pos of all left diagonals into array
function startPosL()
{
    for(let q=3;q<7;q++)
    {
      startposesL.push(5)
      startposesL.push(q)
    }
    startposesL.push(4)
    startposesL.push(6)
    startposesL.push(3)
    startposesL.push(6)
}
