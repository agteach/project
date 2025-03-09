let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let count = 0
//console.log(countEl)
function increment() {
  count=count+1
  countEl.innerText=count
  console.log(count)
}
function save(){
  let saveAs = count+ "-"
  saveEl.innerText+=saveAs
  console.log(saveAs)
  count=0
  countEl.innerText=count
}