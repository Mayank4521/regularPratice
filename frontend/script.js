//class extension- class ko variable me store krte hai and hoisting is not possible
// let Animal = class{
//     constructor(){
//         this.hands = 0
//         this.legs = 4
//     }

//     sleep(){}
// }

//hoisting- declaration process pehle hojata hai javascript referrence le ke kuch chijo ko use kar skta hai

//inheritance- suppose u have a class and u want to make other class which is extends from the previous class then we use this

// class Dog extends Animal{
//     constructor(){
//         super();
//         this.hands = 2
//         this.legs = 2
//     }

//     breathe(){}
// }

// let D1 = new Dog()

//getter and setter





//Js Questions

//Q1 

// const user1 = {
//     name: "Mayank",
//     gender: 'Male',
//     login: function(){
//         console.log("User logged in")
//     }
// }
// const user2 = {
//     name: "Sam",
//     gender: 'Male',
//     login: function(){
//         console.log("User logged in")
//     }
// }
// const user3 = {
//     name: "Sanjana",
//     gender: 'Female',
//     login: function(){
//         console.log("User logged in")
//     }
// }
// const user4 = {
//     name: "Vipul",
//     gender: 'Male',
//     login: function(){
//         console.log("User logged in")
//     }
// }
// const user5 = {
//     name: "Anubhav",
//     gender: 'Male',
//     login: function(){
//         console.log("User logged in")
//     }
// }

// class User{
//     constructor(name,gender){
//         this.name = name;
//         this.gender = gender
//     }
//     login(){
//         console.log("User logged in")
//     }
// }

// const user6 = new User("Madhav","Male")
// const user7 = new User("Megha","Female")
// const user8 = new User("Priya","Female")
// const user9 = new User("Sidhu ","Male")
// const user10 = new User("Prem","Male")



// const product = {
//     name: "Hoodie",
//     price: 2500,
//     dis: function(){
//         return this.price- 200;
//     }
// }

// console.log(product.dis())



// Section 2

// class Car{
//     constructor(brand,speed){
//         this.brand = brand,
//         this.speed = speed
//     }

//     drive(){
//         return this.brand + " - " + this.speed
//     }
// }

// const car1 = new Car("Maruti",150)
// const car2 = new Car("Lamborgini",440)



// Section 3

class Student{
    constructor(name, rollno){
        this.name = name,
        this.rollno = rollno
    }

    introduce(){
        return this.name + " - " + this.rollno
    }
}

const s1 = new Student("Ram",32321)