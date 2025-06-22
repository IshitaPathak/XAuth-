import express from "express";
import twitterOAuth from "./twitterOAuth.js";

const app = express();
app.use("/", twitterOAuth);


app.listen(3001, () => {
               console.log("Server running on https://xauth.onrender.com");
});
