


let board= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
let counter = 0;
let squares =  document.getElementsByClassName("square");
let hLine = [];
let nrUsed= [];


newBoard();
setBoard(board);

function newBoard()
{
    //Step1
    randomizeNona(0);
    randomizeNona(4);
    randomizeNona(8);

    //step2 (fill nona1)
    fillNona(1);

}
function fillNona(nona)
{
        //set own nonaposibilities
        let nonaAvailable = [1,2,3,4,5,6,7,8,9];
        let boardRow = 0;
        let nrUsedRow = [];
        let nrUsedCol = [];

        //for every square
            //x = rand(posibilities)
            //remove x from nonaposibilities
        
        let currAvailable = [1,2,3,4,5,6,7,8,9];
        //check row for used numbers   
        for (let n = 0; n < 3; n++) 
        {  
            for (let sq = 0; sq < 3; sq++) 
            {  
                if (board[n][sq] != 0) 
                {
                    nrUsedRow.push(board[n][sq]);
                }
            }
        }
        //check col for used numbers
        for (let n = 0; n < 9; n++) 
        {  
            if (n%3 === 1) 
            {
                for (let sq = 0; sq < 9; sq++) 
                {  
                    if (board[n][sq] !== 0 && sq%3 === 0) 
                    {
                        nrUsedCol.push(board[n][sq]);
                    }
                }
            }
        }

        //get possiblities from (nona,row,col)
        nrUsed = combinedArrays(nrUsedRow,nrUsedCol);
        

        for (let i = 0; i < nrUsed.length; i++) 
        {
            currAvailable.splice(currAvailable.indexOf(nrUsed[i]),1);
        }




        
        console.log(currAvailable);




}
function combinedArrays(arr1,arr2)
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

