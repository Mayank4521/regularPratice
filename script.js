//globla- window
//function ke andar- window
//object ke andar function(method)- object
//es6 function inside object - window
//es5 function inside es5 function inside object ->window
//es6 function inside es5 function inside object ->object
//es6 function inside es6 function inside object -> window


//call, apply, bind
//if function ke andar this ki value ko dusre object ki value dena hai toh use krte hai

let obj={
    name: "Mayank"
}

function hola(a,b,c){
    console.log(this,a,b,c)
}

const fn = hola.bind(obj,1,2,3)

fn()