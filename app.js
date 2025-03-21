let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-game");
let msg=document.querySelector("#msg");
let msgcontainer=document.querySelector(".msg-container")
let turnO=true;//PlayerX /Player O
let count=0;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBtns();
    msgcontainer.classList.add("hide");
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
console.log("Box was clicked");
if(turnO){
    box.innerText="O"
    turnO=false;
}else{
    box.innerText="X"
    turnO=true;
}
box.disabled=true;
count++;
let isWinner=checkWinner();
if(count==9 && !isWinner){//!isWinner means no winning pattern was found after 9 moves.
    gameDraw();
}
    })
});
const gameDraw=()=>{
    msg.innerText="Game was a Draw";
    msgcontainer.classList.remove("hide");
    disableBtns();
}
const enableBtns=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const disableBtns=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBtns();
}
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" &&pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};
newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);