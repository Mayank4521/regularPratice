//side by side exection of task is called asyncronous 

//callbacks - woh function jo turant naa chale kuch kaam complete hone ke baad chale and koi bhi functionjo pass ho raha ho 

// function abcd(fn){
//     fn(function(fn2){
//         fn2(function(fn4){
//             fn4(function(){
//                 console.log("hey")
//             })
//         })
//     })
// }

// abcd(function(fn1){
//     fn1(function(fn3){
//         fn3(function(fn5){
//             fn5()
//         })
//     })
// })



//Question sol for callback

// function dotask(fn){
//     console.log("Task Completed")
//     fn()
// }

// dotask(function(){
//     console.log('callback executed');
// })

// Create a function calculate(a, b, callback) that performs addition and passes the result to the callback.
// function calculate(a,b,callback){
//     let sum = a+b
//     callback(sum)
// }

// calculate(4,6,function(ans){
//     console.log(ans)
// })

// What is the difference between:

// sayHello();
// sayHello;


// What is the difference between:
// sayHello();
// sayHello;
// Explain which one is used in callbacks and why
//sayHello() is directly calling the function which is not callback, sayHello is a fuction which is used to store in a variable and can be call after so its more callback


// Write code where a message is printed after 2 seconds using a callback.
// setTimeout(function(){
//     console.log("message printed")
// },2000)




// what will be the output of this
// console.log("A");

// setTimeout(() => {
//     console.log("B");
// }, 0);

// console.log("C");
// output will be A C B






//Print 1 2 3, each after 1 second, using callbacks only.

setInterval(() => {
    console.log(1)
}, 1000);

// Explain why this callback:
// setTimeout(() => {
//     console.log("Hello");
// }, 1000);
// does not block the rest of the code.

// this callback is executed after 1 second and it does not block the code but it will go to side stack do complete its work first in that time normal code is completing in main queue 