// let age = prompt("Enter Your Age");

// if(age === null){
//     console.error("you pressed cancel")
// }else{
//     if(age.trim()===""){
//         console.log("talaqa lag sam lekal oka")
//     }else if(isNaN(age.trim)){
//         console.log("please enter a valid number")
//     }else{
//         console.log("your age is " + age)
//     }
// }


// let userAge = prompt("Enter your Age");
// if(userAge>=18){
//     console.log("you are eligible to vote")
// }else{
//     console.log("ta la mashom ye")
// }

//  5 table
// for(let i =1; i<=10; i++){
//     console.log(`5 X ${i} =${5*i}`);
// }


// let count = 0;
// for(let i=1; i<=15; i++){
// if(i>8){
//     count++;
// }else{
//     console.log("lessser");
// }
// }console.log(`${count} are greater`);


// let passward = "khan";

// let userPasward = prompt("Enter your Pasward");
// if(userPasward===passward){
//     console.log("you can acces it")
// }else{
//     if(userPasward === null){
//         console.error("you pressed wrong btn")
//     }else if(userPasward.trim()===""){
//         console.log("wrong pasward")
//     }else{
//         console.log("wrong passward")
//     }
// }



// let passward = "khan"
// let khulgaya = false;
// let attempt = 0;

// let userPass = prompt("Enter your Passward")
//   attempt++;

//   if(userPass === passward) khulgaya = true;

//   while(userPass !== passward){
//     if(attempt === 3){
//         console.log("Account Locked")
//         break;
//     }
//     userPass = prompt("Enter your Passward")
//     if(userPass === passward)khulgaya = true;
//        attempt++;

//   }
//   if(khulgaya === true){
//     console.log("Acount Opened");
// }