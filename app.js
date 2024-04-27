const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
var serveIndex = require('serve-index');
var http = require('http');
const https = require('https');
const PORT = process.env.PORT || 3030;
//const secure_port = 3000;

//const options = {
//  key: fs.readFileSync('key.pem'),
//  cert: fs.readFileSync('cert.pem')
//};

const app = express();

app.engine('html', require('ejs').renderFile);

//var secure_server = https.createServer(options, app);

//secure_server.listen(secure_port, () => {
//  console.log("Secure server starting on port : " + secure_port)
//});

var server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server started on port ${PORT}");
});

// server css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/robots.txt", (req, res) => {
  res.sendFile(__dirname + "/robots.txt");
});

app.get("/admin", (req, res) => {
  var msg = "";
  res.render(__dirname + "/admin.html", {msg:msg});
});

app.post("/admin", (req, res) => {
  if (req.body.name == "admin" && req.body.password == "admin"){
    res.redirect("/dashboard");
  } else {
    var msg = "Try Again";
    res.render(__dirname + '/admin.html', {msg:msg});
  }
  
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/orders", (req, res) => {
  res.sendFile(__dirname + "/orders.html");
});

app.get("/search", (req, res) => {
  res.sendFile(__dirname + "/search.html");
});

app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});

app.get("/response", (req, res) => {
  res.header('Server1','IIS/7.0' )
  res.header('Server2' , 'Response headers can leak server versions! They should be hidden on production. Btw, here is your next flag - ORG{server_version_should_be_hidden}' )
  res.sendFile(__dirname + "/response.html");
});

app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});

app.get("/flag9", (req, res) => {
  res.sendFile(__dirname + "/flag9.html");
});

app.get("/github", (req, res) => {
  res.sendFile(__dirname + "/github.html");
});

app.get("/dependency", (req, res) => {
  res.sendFile(__dirname + "/dependency.html");
});

app.get("/flag10", (req, res) => {
  res.sendFile(__dirname + "/flag10.html");
});

app.get("/hash", (req, res) => {
  res.sendFile(__dirname + "/hash.html");
});

app.get("/download", (req, res) => {
  res.sendFile(__dirname + "/download.html");
});

app.get("/idor", (req, res) => {
  var goodName = "Good User";
  var goodEmail = "goodUser@org.com";
  var goodMsg = "Find the email of User with UserID '1337' to get the Flag";
  var smartName = "Smart User";
  var smartEmail = "smartUser@org.com";
  var smartMsg = "You are a Smart User! You tried something different! Find the email of User with UserID '1337' to get the Flag";
  var leetName = "Pro User";
  var leetEmail = "proUser@org.com";
  var leetMsg = "You did it! This is an IDOR vulnerability. It can be very dangerous  Here is your flag - ORG{IDOR_can_be_very_dangerous}";

  if(req.query.userid == 1){
    res.render(__dirname + "/idor.html", {name:goodName,email:goodEmail,msg:goodMsg});
  }else if(req.query.userid == 1337){
    res.render(__dirname + "/idor.html", {name:leetName,email:leetEmail,msg:leetMsg});
  }else{
    res.render(__dirname + "/idor.html", {name:smartName,email:smartEmail,msg:smartMsg});
  }
  
});

app.use(express.static(__dirname + "/"))
app.use('/public', serveIndex(__dirname + '/public'));

app.get("/dirlist", (req, res) => {
  res.sendFile(__dirname + "/dirlist.html");
});
