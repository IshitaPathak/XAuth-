import express from "express";
import twitterOAuth from "./twitterOAuth.js";

const app = express();
app.use("/", twitterOAuth);

app.listen(3000, () => {
               console.log("Server running on http://localhost:3000");
});
