// question 1
// function afterDelay(time,cb){
//     setTimeout(()=>{
//         cb()
//     },time)
// }

// afterDelay(2000,()=>{
//     console.log("callback executed");
    
// })


// Exercise 2 — Intermediate (Data flow)
// **Task (Hindi):** Ek function banao `getUser`

// **Requirements:**
// - `getUser` `username` lega
// - 1 second ke baad `callback` ko ek object de:
//   - `id`
//   - `username`

// **Then:**
// - Callback ke andar ek aur function call karo `getUserPosts`

// **`getUserPosts` requirements:**
// - `userId` lega
// - 1 second ke baad `callback` ko `posts` ka array de

// **Final output:**
// - User ka `username` print ho
// - Fir uske `posts` print ho

// **Goal:**
// - Samajhna ki ek async ka result next async ko kaise milta hai
// - Callback chaining practice

// function getUser(username,cb){
//     setTimeout(()=>{
//         cb({id:1,username:"Mayank"})
//     },1000)
// }

// function getUserPosts(usedId,cb){
//     setTimeout(()=>{
//         cb(["img1","img2"])
//     },1000)
// }

// getUser("Mayank",(data)=>{
//     getUserPosts(data.id,(allPosts)=>{
//         console.log(data.username,allPosts)
//     })
// })

// ## Exercise 3 — Intermediate (Callback dependency — thoda painful)

// **Task (Hindi):** Teen functions banao:

// 1. `loginUser`
//    - 1 second baad callback ko `user` object de
// 2. `fetchPermissions`
//    - `userId` lega
//    - 1 second baad callback ko `permissions` array de
// 3. `loadDashboard`
//    - `permissions` lega
//    - 1 second baad callback ko `"Dashboard loaded"` bole

// **Flow:**
// - Pehle `loginUser`
// - Uske andar `fetchPermissions`
// - Uske andar `loadDashboard`
// - Final output console mein print ho

// **Goal:**
// - Callback nesting ko feel karna
// - Yehi structure baad mein callback hell banta hai

// function loginUser(cb){
//     setTimeout(()=>{
//         console.log("loggedIn")
//         cb({id:1,username:"Mayank"})
//     },1000)
// }   
// function fetchPermissions(userId,cb){
//     setTimeout(()=>{
//         console.log("fetching permissions of"+userId)
//         cb(["access","pass","doc"])
//     },1000)
// }
// function loadDashboard(permissions,cb){
//     setTimeout(()=>{
//         cb("Dashboard loaded")
//     },1000)
// }

// loginUser((data)=>{
//     fetchPermissions(data.id,(allPermissions)=>{
//         loadDashboard(allPermissions,(message)=>{
//             console.log(message)
//         })
//     })
// })