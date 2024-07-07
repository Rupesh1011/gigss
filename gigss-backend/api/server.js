import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"; 
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();
mongoose.set('strictQuery', true);   /*// Trying to query using an undefined field
User.find({ email: 'test@example.com' }, (err, users) => {
  console.log(err); // Error: Query contains unrecognized field 'email'
});
In the example above, when attempting to query the User model using the email field, which is not defined in the schema, Mongoose will throw an error because strict query mode is enabled.

When we declare a function as async, it means that the function will contain asynchronous operations and may use the await keyword inside it.

Inside the async function, instead of using .then() and .catch() methods on promises, we use the await keyword before calling an asynchronous operation that returns a promise. The await keyword pauses the execution of the function and waits for the promise to be resolved or rejected before moving forward.

*/
const connect = async() => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.error("An error occured",error);
  }
};

app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}));
app.use(express.json());
app.use(cookieParser());
 
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/gigs",gigRoute);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/reviews",reviewRoute);

app.use((err,req, res, next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    connect();
    console.log("Backend server is running");
})
