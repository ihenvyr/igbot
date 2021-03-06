require("dotenv").config();

const express = require("express");
const app = express();
const Insta = require("scraper-instagram");
const InstaClient = new Insta();

async function main() {
  await InstaClient.authBySessionID(process.env.SESSIONID)
    // .then(account => console.log(account))
    .catch(err => console.error(err));

  app.get("/user/:username", (req, res) => {
    InstaClient.getProfile(req.params.username)
      .then(profile => res.json(profile))
      .catch(error => res.json(error));
  });

  app.get("/hashtag/:hashtag", (req, res) => {
    InstaClient.getHashtag(req.params.hashtag)
      .then(hashtag => res.json(hashtag))
      .catch(error => res.json(error));
  });

  app.listen(8200, () => console.log(`Server is running on http://localhost:8200`));
}

main();