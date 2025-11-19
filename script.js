let inner = document.querySelector("#inner")
let h1 = document.querySelector("#bottom h1")
let btn = document.querySelector("#bottom button")

let grow = 0

btn.addEventListener("click",()=>{

    btn.style.pointerEvents = "none"
    let random = 50 + Math.floor(Math.random()*50)
    console.log("Download in",random/10, "seconds")

    btn.textContent = "Downloading"
    let val = setInterval(()=>{
        grow++
        h1.innerHTML = grow +"%"
        inner.style.width = grow + "%"
        
    },random)
    setTimeout(()=>{
        clearInterval(val)
        console.log("Downloaded")
        btn.textContent = "Downloaded"
        btn.style.opacity = 0.5
    },random*100)
})