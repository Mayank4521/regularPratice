// const prm = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve()
//     },3000)
// })
//promise- kuch kaam karta hai jiske teen status
//pending,resolve,reject
//promise is created on server side and then and catch is used to get the satatus in client side

// prm.
// then(()=>{
//     console.log("resolved")
// })
// .catch(()=>{
//     console.log("rejected")
// })

//async await- promise ke result ko handle krne ke kaam aata hai instead .then().catch() and promise ko ek function ke ander return krna pdta h ye client side me use hota hai await asyncronous behaviour ko handle krta hai and async ek keyword jo ise use krne ke liye hai

// async function prm(){
//     return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("Done after 3sec")
//     },3000)
// })
// }

// async function main(){
//     console.log("starting")
//     const result = await prm()
//     console.log(result)
// }


// main()

// fetch('https://randomuser.me/api')
// .then((raw)=> raw.json())
// .then((data)=>{
//     console.log(data)
// })
// .catch((error)=>{
//     console.log(error)
// })

// async function get(){
//     const raw = await fetch("https://randomuser.me/api")
//     const data = await raw.json()
//     console.log(data)
// }

// get()


// error handling- Its how you handle the error in the code
//three types of error- syntax error, runtime error, logic error
//syntax error - error in syntax when someone write wrong syntax code
//Runtime error - error which can be seen at the run time
//logic error - its not basically error its logical mistake in code

