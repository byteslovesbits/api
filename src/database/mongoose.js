const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const jobModel = require("./models/job");

mongoose
  .connect("mongodb://localhost/api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((r) => {
    console.log("mongodb connected...");
  })
  .catch((e) => {
    console.log("Error:", e);
  });

// const Cat = mongoose.model('Cat', { name: String });
//
// const kitty = new Cat({ name: 'paws' });
// kitty.save().then(() => console.log(`Little ${kitty.name} saved to the database.`));

const userOne = new userModel({
  name: "Marc Kirk",
  email: "marcakirk@gmail.com",
  password: "w$alSxmk!x()-()",
});

userOne
  .save()
  .then((user) => {
    console.log(user, " has been saved");
  })
  .catch((e) => {
    console.log("Error: Could not save user!!", e);
  });

const jobOne = new jobModel({
  description: "Complete final year computer science project",
});

jobOne
  .save()
  .then((job) => {
    console.log(job, " has been saved");
  })
  .catch((e) => {
    console.log("Error: Could not save job!!", e);
  });

// const Cat = mongoose.model('Cat', { name: String });
//
// const kitty = new Cat({ name: 'paws' });
// kitty.save().then(() => console.log(`Little ${kitty.name} saved to the database.`));
