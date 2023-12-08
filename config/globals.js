// create and export a configuration object
const configuration = {
    'db': 'mongodb+srv://devpatel5330254:YV4eBtPQcMu1lVCK@cluster0.wiwt6fa.mongodb.net/',
    "github":{
        "clientId":"94d0b8afb8c6da68632e",
        "clientSecret": "824834a735cf7f1d6bff19a9272f560fe86102f3",
        "callbackURL" : "http://localhost:3000/github/callback"
    }
}

module.exports = configuration;
