
/*randomizer should be different
*
*start with '1' to fill every 'nonagon' at random place if possible else reroll random
*
*/

let board= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
let squares =  document.getElementsByClassName("square");


newBoard();
setBoard(board);

function newBoard()
{
    //let n = 1;
    for (let n = 1; n < 10; n++) 
    {
        fillNonasWith(n);
    }

}
function fillNonasWith(_number)
{     
    for (let nona = 0; nona < board.length; nona++) 
    {
        let availableSquares = [0,1,2,3,4,5,6,7,8];
        let nonaRow = Math.floor(nona/3);
        let nonaCol = nona%3;

        let sqUsed=returnFilledSquares(nona);

        removeFromArray(sqUsed, availableSquares);



        //add restrictions (row,column) to availablelist
        //for every available square check current row of this square.
        let tmp = GetValues(availableSquares);
        let currAvail = [];
        for (let sq = 0; sq < tmp.length; sq ++) 
        {  
            let x = availableSquares[sq];
            if (isRowAvailable(_number, x, nonaRow)) 
            {
                if (isColAvailable(_number, x, nonaCol)) 
                {
                    currAvail.push(availableSquares[sq]);
                }
            }
        }
        availableSquares = GetValues(currAvail);

        //----

        let rndSquare = randomSquare(availableSquares);
        board[nona][rndSquare] = _number;
        //pick random square

        //if possible insert number in square
    }
    
}
function isColAvailable(_nr, _sq, _nonaCol)
{
    let isUnique = true;
    let colStart = _sq%3;
    for (let n = _nonaCol; n < 9; n+=3)
    {  
        for (let check = colStart; check < 9; check+=3)
        {  
            if (board[n][check] === _nr) 
            {
                isUnique = false;
                break;
            }
        }
        if (!isUnique) 
        {
            break;
        }
    }
    return isUnique;
}
function isRowAvailable(_nr, _sq, _nonaRow)
{
    let isUnique = true;
    let rowStart = Math.floor(_sq/3);

    //check current row for used number 
    for (let n = _nonaRow*3; n < 3 + (_nonaRow*3); n++) 
    {  
        for (let check= rowStart*3 ; check < 3+ (rowStart*3); check++) 
        {  
            if (board[n][check] === _nr) 
            {
                isUnique = false;
                break;
            }
        }
        if (!isUnique) 
        {
            break;
        }
    }
    return isUnique;
}
function GetValues(_arr)
{
    let myArr = [];
    for (let i = 0; i < _arr.length; i++) 
    {
        myArr.push(_arr[i]);
    }
    return myArr;
}
function returnFilledSquares(_nona)
{
    let arr=[];
    for (let sq = 0; sq < 9; sq++) 
    {
        if(board[_nona][sq] !== 0)
        {
            arr.push(sq);
        }
    }

    return arr;
}
function removeFromArray(removeArr, fromArr)
{
    for (let i = 0; i < removeArr.length; i++) 
    {
        fromArr.splice(fromArr.indexOf(removeArr[i]),1);        
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
function randomSquare(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
}
function setBoard(_board)
{
    let counter = 0;
    for (let nona = 0; nona < 9; nona++)
    {
        for(let sq = 0; sq < 9; sq++)
        {
            squares[counter].value = _board[nona][sq];
            if (squares[counter].value !== "0") 
            {
                squares[counter].classList.add("closed");
            }
            counter++;
        }

    }
}

