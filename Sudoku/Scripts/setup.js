


let board= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
let counter = 0;
let squares =  document.getElementsByClassName("square");


newBoard();
setBoard(board);

function newBoard()
{
    //Step1
    randomizeNona(0);
    randomizeNona(4);
    randomizeNona(8);

    //step2
    fillNona(2);
    fillNona(6);

}
function fillNona(nona)
{
    //set own nonaposibilities
    let isfilled = true;
    let nonaUsed = [];
    let nonaRow = Math.floor(nona/3);
    let nonaCol = nona%3;
    //let x = 8;

    //for every square
    for(let x = 0; x < 9 ; x++)
    {
        let nrUsedRow = [];
        let nrUsedCol = [];

        let colStart = x % 3;
        let rowStart = Math.floor(x/3);
        let currAvailable = [1,2,3,4,5,6,7,8,9];

        //check current row for used numbers   
        for (let n = nonaRow; n < 3 + nonaRow; n++) 
        {  
            for (let sq= rowStart*3 ; sq < 3+ (rowStart*3); sq++) 
            {  
                if (board[n][sq] !== 0)
                {
                       nrUsedRow.push(board[n][sq]);
                }
            }
         }
         //check current col for used numbers
          for (let n = nonaCol; n < 9; n+=3)
          {  
                 for (let sq = colStart; sq < 9; sq+=3) 
                  {  
                     if (board[n][sq] !== 0) 
                    {
                         nrUsedCol.push(board[n][sq]);
                    }
                 }
        }
    
        //get possiblities from (!nona!,row,col)
        let nrUsed = combinedArrays(nrUsedRow,nrUsedCol);
        nrUsed = combinedArrays(nrUsed, nonaUsed);
            
    
        for (let i = 0; i < nrUsed.length; i++) 
        {
            if (currAvailable.indexOf(nrUsed[i]) < currAvailable.length) 
            {
                currAvailable.splice(currAvailable.indexOf(nrUsed[i]),1);
            }
        }
            
        let rnd = Math.floor(Math.random()*currAvailable.length);
    
        let currNr = currAvailable[rnd];
        console.log(currNr);
        board[nona][x] = currNr;
        nonaUsed.push(currNr);

    }       
    
}
function combinedArrays(arr1, arr2)
{
    let arr = [];

    for (let l = 0; l < arr1.length; l++) 
    {
        arr.push(arr1[l]);
    }

    for (let l = 0; l < arr2.length; l++) 
    {
        let dupe = false;
        for (let i = 0; i < arr.length; i++) 
        {
            if (arr2[l] === arr[i]) 
            {
                dupe = true;
            }
        }
        if (!dupe) 
        {
            arr.push(arr2[l]);
        }
    }
    
    return arr;
}
function randomizeNona(nona)
{
    let numbers = [1,2,3,4,5,6,7,8,9];

    for (let sq = 0; sq < 9; sq++) 
    {
        let nr = numbers[Math.floor(Math.random()*numbers.length)];
        board[nona][sq] = nr;
        numbers.splice(numbers.indexOf(nr),1);
    }

}
function setBoard(_board)
{
    for (let nona = 0; nona < 9; nona++)
    {
        for(let sq = 0; sq < 9; sq++)
        {
            squares[counter].value = _board[nona][sq];
            if (squares[counter].value != "0") 
            {
                squares[counter].classList.add("closed");
            }
            counter++;
        }

    }
}

