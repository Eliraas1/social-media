// import app from "./src/app";
import app from "./src/app";
import { connectToDB } from "./src/utils/mongoose";

app.listen(process.env.PORT, (): void => {
  connectToDB();
  console.log("start listening on port " + process.env.PORT);
});
