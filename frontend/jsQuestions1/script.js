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

// class Student{
//     constructor(name, rollno){
//         this.name = name,
//         this.rollno = rollno
//     }

//     introduce(){
//         return this.name + " - " + this.rollno
//     }
// }

// const s1 = new Student("Ram",32321)



// const obj = {
//     sayName: function(){
//         console.log(this)
//     },
//     sayFame: ()=>{
//         console.log(this)
//     }
// }

// obj.sayName()
// obj.sayFame()


// section 4

// function User(){
//     this.name = "Mayank",
//     this.login = function(){
//         console.log('logged in')
//     }
// }

// let a1 = new User()
// User.prototype.logout = function(){
//     console.log("logout")
// }
// const u1 = new User("Mayank")
// const u2 = new User("Vipul")
// u1.loggedin === u1.loggedin




// class User{
//     constructor(name){
//         this.name = name
//         this.loggedin = function(){
//             console.log("loggedin")
//         }
//     }
// }

// const u1 = new User("Mayank")
// const u2 = new User("Vipul")




//section 5

// function abcd(a,b,c,d){
//     console.log(this.name)
// }

// const obj = {
//     name : "Mayank"
// }

// abcd.bind(obj,[1,2,3,4,])





// Hoemwork questions
// section 1

// const laptop = {
//     brand: "hp",
//     price: 50000,
//     start: function(){
//         console.log("laptop started")
//     },

//     increase: function(){
//         console.log(laptop.price+(laptop.price*10/100))
//     }
// }

// laptop.start()
// laptop.increase()

// if we need to make 10 laptop object with diffrent brand and price by using this same method then it will be difficult for developer to edit the code after which affects its manageablity




//section 2

// class Employee{
//      constructor(name,salary){
//         this.name = name;
//         this.salary = salary;
//      }

//      showDetails(){
//         return this.name + " - " + this.salary
//      }
// }

// let e1 = new Employee("Rohan",25000);
// let e2 = new Employee("Mayank",150000);
// let e3 = new Employee("Sanjana",70000);


// class BankAccount{
//     constructor(accountHolderName,balance){
//         this.accountHolderName = accountHolderName;
//         this.balance = balance
//     }
//         deposite(amount){
//             this.balance += amount
//             console.log(this.balance)
//         }
    
// }


// let b1 = new BankAccount("Raj",100000)
// let b2 = new BankAccount("Mohan",150000)

// b1.deposite(500)


//section 4

// const profile = {
//     username : "Harsh",
//     printName : function(){
//         console.log(this.username)
//     }
// }

// const fn = profile.printName.bind(profile)
// fn()


// section 5

// function Vehicle(type,wheels){
//     this.type = type
//     this.wheels = wheels
// }
// Vehicle.prototype.describe = function(){
//         return this.type+ " - " + this.wheels
//     }

// const v1 = new Vehicle("Bus",4)
// const v2 = new Vehicle("Bike",2)


// section 6

// function showBrand(){
//     console.log(this.brand)
// }

// const obj1 = {
//     brand: "Sheriyans",
//     brandvalue: "50Crore"
// }
// const obj2 = {
//     brand: "Mayank",
//     brandvalue: "2Crore"
// }

// showBrand.call(obj1)
// showBrand.call(obj2)

//Call method is used here to solve the problem with this keyword which value is dicided when we call it, its changes this value from window object to object what we wanted

//section 7

// function introduce(city,role){
//     console.log(this.name,city,role)
// }

// const property = {
//     name:"Lacchiwala"
// }

// introduce.apply(property,["Dehradun","Plain"])

//apply differs from call only because it accepts function argument as seprate array while call accepts it individually


// section 8

// function greet(){
//     console.log("Hello"+this.name)
// }
// const obj = {
//     name: ", Mayank"
// }

// const fn = greet.bind(obj)
// fn()


