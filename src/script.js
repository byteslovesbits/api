// class Model {
//   constructor() {}
// }
//
// class View {
//   constructor() {}
// }
//
// class Controller.mjs {
//   constructor(model, view) {
//     this.model = model;
//     this.view = view;
//   }
// }

// const createUser = async () => {
//   const user = {
//     name: "Test",
//     email: "test@test.comm",
//     password: "w$alX()x!£mk014c355",
//   };
//
//   const rawResponse = await fetch("http://localhost:3000/users", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
//
//   const content = await rawResponse.json();
//
//   return content;
// };
//
// createUser()
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
