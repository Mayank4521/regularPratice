let cursor = document.querySelector("#cursor")
let main = document.querySelector("main")

main.addEventListener("mousemove",function(dets){
  cursor.style.left = dets.x + "px"
  cursor.style.top = dets.y +'px'
  cursor.style.transform = 'translate(-50%,-50%)'
})

cursor.addEventListener("click",function(){

})