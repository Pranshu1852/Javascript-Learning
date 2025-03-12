let range=new Range();
let ele=document.getElementById("p");

//Selecting the text partially
range.setStart(ele.firstChild,2);
range.setEnd(ele.firstChild,4);

document.getSelection().addRange(range);


//Selecting element nodes
range.setStart(ele,2);
range.setEnd(ele,4);
document.getSelection().addRange(range);


//Selecting a bigger fragment
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);
document.getSelection().addRange(range);


//Range selection methods
range.setStartAfter(ele.firstChild);
range.setEndBefore(ele.querySelector('i'));
document.getSelection().addRange(range);


range.selectNode(ele);
range.selectNodeContents(ele)
document.getSelection().addRange(range);


let newrange=range.cloneRange();

document.getSelection().addRange(newrange);


//Range editing methods
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);
range.selectNode(ele.querySelector('i').firstChild)

let newele=document.createElement('u')
newele.innerHTML="new text"
range.surroundContents(newele);
// let newrange1=range.cloneContents();
// console.log(newrange1);
// console.log(range.extractContents());


