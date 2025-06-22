import express from "express";
import { OAuth } from "oauth";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
const callbackURL = process.env.CALLBACK_URL;

// Create OAuth object
const oauth = new OAuth(
               "https://api.twitter.com/oauth/request_token",
               "https://api.twitter.com/oauth/access_token",
               consumerKey,
               consumerSecret,
               "1.0A",
               callbackURL,
               "HMAC-SHA1"
);

// Store temporary request tokens in memory
const requestTokens = {};

// Step 1: Redirect user to Twitter for authorization
router.get("/auth/twitter", (req, res) => {
               oauth.getOAuthRequestToken((err, token, tokenSecret) => {
                              if (err) return res.status(500).send("OAuth Request Token Error");

                              requestTokens[token] = tokenSecret;

                              const authURL = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`;
                              res.redirect(authURL);
               });
});

// Step 2: Twitter redirects back to your app
router.get("/auth/twitter/callback", (req, res) => {
               const { oauth_token, oauth_verifier } = req.query;
               const tokenSecret = requestTokens[oauth_token];

               oauth.getOAuthAccessToken(
                              oauth_token,
                              tokenSecret,
                              oauth_verifier,
                              (err, accessToken, accessTokenSecret) => {
                                             if (err) return res.status(500).send("Access Token Error");

                                             // Optional: fetch user profile info
                                             oauth.get(
                                                            "https://api.twitter.com/1.1/account/verify_credentials.json",
                                                            accessToken,
                                                            accessTokenSecret,
                                                            (err, data) => {
                                                                           if (err) return res.status(500).send("Failed to get user info");

                                                                           const userInfo = JSON.parse(data);

                                                                           // Example final data to return
                                                                           const result = {
                                                                                          accessToken,
                                                                                          accessTokenSecret,
                                                                                          twitterUsername: userInfo.screen_name,
                                                                                          twitterId: userInfo.id_str,
                                                                                          profileImage: userInfo.profile_image_url_https,
                                                                           };
                                                                           console.log({
                                                                                          accessToken,
                                                                                          accessTokenSecret,
                                                                                          twitterUsername: userInfo.screen_name,
                                                                                          twitterId: userInfo.id_str,
                                                                                          profileImage: userInfo.profile_image_url_https,
                                                                                        });
                                                                                        

                                                                           // In practice, redirect back to frontend with this info
                                                                           res.json(result);
                                                            }
                                             );
                              }
               );
});

router.get("/health",(req,res)=>{
  res.send("healthy server")
}) 



export default router;
