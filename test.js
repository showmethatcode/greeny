function add(a, b) {
    return a+b;
}

console.log(add(100, 200)) // => 300

function minus(a, b) {
    return a-b;
}

console.log(minus(500, 400)) // => 1

function sayHello(name) {
    return 'Hello, ' + name;
}
console.log(sayHello('JavaScript')) // => 'Hello, JavaScript!'

function sayHelloToFriends(friendA, friendB) {
    return 'Hello, ' + friendA + ' and ' + friendB;
}

console.log(sayHelloToFriends('Woosik', 'Hyeonsu')) // => 'Hello, Woosik and Hyeonsu'

function calculateAge(year){
    return 2019 - year + 1
}

console.log(calculateAge(2000)) // 20
console.log(calculateAge(1996)) // 24

function getFullName(firstname,lastname){
    return lastname+ ' ' + firstname
}

console.log(getFullName('Hoseon','Lee')) // 'Lee Hoseon'

function isEvenOrOdd(num) {
    if(num==0){
        return 0;
        // 홀수: num을 2로 나누어서 나머지가 1일 때
    } else if (num % 2 == 1){
        return '홀수'
    } else if (num % 2 == 0){
        return '짝수';
    }
}

console.log(isEvenOrOdd(0)) // => 0
console.log(isEvenOrOdd(14)) // => '짝수'
console.log(isEvenOrOdd(15)) // => '홀수'