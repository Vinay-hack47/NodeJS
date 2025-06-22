//! Callback Functions
//todo -> A functions which is passes inside a another function as an parameter is a callback function.

// eg
/* function print(callback) {
  callback();
}

function add(a, b) {
  return a + b;
}

function divided(a, b) {
  return a / b;
}

function calculate(a, b, operation) {
  return operation(a, b);
}

console.log(calculate(5, 6, add)); */

//todo->  We want that after 2 sec delay each function should run
function getData(data, getNext) {
  setTimeout(() => {
    console.log("data", data);
    if (getNext) {
      getNext();
    }
  }, 4000);
}

//! this is called Callback Hell
//? Nested callbacks stacked below one another forming a pyramid structure.

getData(1, () => {
  console.log("getting data 2...");
  getData(2, () => {
    console.log("getting data 3...");
    getData(3, () => {
      console.log("getting data 4...");
      getData(4);
    });
  });
});

//? This style of programming becomes difficult to understand and manage so we use Promises



//! Promises
//? A Promise means : I'will give a result later either success or failure - when I am done.
//? We create Promises by making an Object of the Promise
//? resolve and reject are callbacks provided by JS
//? .then(), .catch() are used to handle the result and the error

// eg
/* let p = new Promise((resolve, reject) => {
  let a = 1 + 2;
  if (a == 2) {
    resolve("Success");
  } else {
    reject("Failure");
  }
});

p.then((message) => {
  console.log("This is in the then " + message);
}).catch((message) => {
  console.log("This is in the catch " + message);
}); */

//! doing same by Promise chain

function getData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data", data);
      resolve("success");
    }, 4000);
  });
}

//? 1 way
getData(1).then((res) => {
  console.log(res);
  getData(2).then((res) => {
    console.log(res);
    getData(3).then((res) => {
      console.log(res);
      getData(4).then((res) => {
        console.log(res);
      });
    });
  });
});

//? 2 way

console.log("getting data1....");
getData(1)
  .then((res) => {
    console.log("getting data2....");
    return getData(2);
  })
  .then((res) => {
    console.log("getting data3....");
    return getData(3);
  })
  .then((res) => {
    console.log("getting data4....");
    return getData(4);
  });

//! Async-Await
//? await pauses the execution of its surrounding async functions until the promise is settled.
//? async functions always return a promise.
//? We must call await inside an async function you cannot use await at top level.

// eg
/* function api(){
    return new Promise((resolve, reject) =>{
      setTimeout(() =>{
        console.log("weather data");
        resolve(200)
      }, 3000);
    })
  }

  async function getWeatherData(){
    await api();
    await api();
  }

  getWeatherData(); */

//! doing by async await
function getData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("data", data);
      resolve("success");
    }, 4000);
  });
}

//? 1 way
async function getAllData() {
  console.log("getting data1...");
  await getData(1);
  console.log("getting data2...");
  await getData(2);
  console.log("getting data3...");
  await getData(3);
}
getAllData();

//? 2 way  [Immediately Invoked Function Expression(IIFE)]
(async function () {
  console.log("getting data1...");
  await getData(1);
  console.log("getting data2...");
  await getData(2);
  console.log("getting data3...");
  await getData(3);
})();
