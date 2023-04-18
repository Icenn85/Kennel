const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("../app");

dotenv.config();

const { HOST_URI } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(HOST_URI)
  .then(
    app.listen(3000, () => {
      console.log("Example app listening on port 3000!");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });
