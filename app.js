const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const scoreboard = require("./public/scoreboard.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
var ques1="bcwshegjkd", ques2="hgbcjhsd", ques3="bsdhdbcjs", ques4="hsbjchjgcg", ques5="bsjcbjhs", population=8000;
var ques6="hbsvjhsb", ques7="uashiuaj", ques8="kjehfish", ques9="shuegfwh", ques10="nbsahbkj";

app.get("/", (req,res)=>{
  res.render("map",{ques1: ques1, ques2: ques2, ques3: ques3, ques4: ques4, ques5: ques5, ques6: ques6, ques7: ques7, ques8: ques8, ques9: ques9, ques10: ques10, population: population});
});
// question1
app.post("/",(req,res)=>{
  var buttonName = req.body.btn;
  if(buttonName==="1"){
    res.render("question1",{population: population})
  }
  else if(buttonName==="2"){
    res.render("question2",{population: population})
  }
  else if(buttonName==="3"){
    res.render("question3",{population: population})
  }
  else if(buttonName==="4"){
    res.render("question4",{population: population})
  }
  else if(buttonName==="5"){
    res.render("question5",{population: population})
  }
  else if(buttonName==="6"){
    res.render("containment1",{population: population})
  }
  else if(buttonName==="7"){
    res.render("containment2",{population: population})
  }
  else if(buttonName==="8"){
    res.render("containment3",{population: population})
  }
  else if(buttonName==="9"){
    res.render("containment4",{population: population})
  }
  else if(buttonName==="10"){
    res.render("containment5",{population: population})
  }
});

app.post("/question1", (req,res)=>{
  var answer = req.body.ans1;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques1 = answer;
  res.redirect("/");
})
// question2

app.post("/question2", (req,res)=>{
  var answer = req.body.ans2;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques2 = answer;
  res.redirect("/");
})
// question3

app.post("/question3", (req,res)=>{
  var answer = req.body.ans3;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques3 = answer;
  res.redirect("/");
})
// question4

app.post("/question4", (req,res)=>{
  var answer = req.body.ans4;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques4 = answer;
  res.redirect("/");
})

// question5
app.post("/question5", (req,res)=>{
  var answer = req.body.ans5;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques5 = answer;
  res.redirect("/");
})

//containment1
app.post("/containmentZone1", (req,res)=>{
  var answer = req.body.con1;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques6 = answer;
  res.redirect("/");
})

//containment2
app.post("/containmentZone2", (req,res)=>{
  var answer = req.body.con2;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques7 = answer;
  res.redirect("/");
})

//containment1
app.post("/containmentZone3", (req,res)=>{
  var answer = req.body.con3;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques8 = answer;
  res.redirect("/");
})

//containment1
app.post("/containmentZone4", (req,res)=>{
  var answer = req.body.con4;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques9 = answer;
  res.redirect("/");
})

//containment1
app.post("/containmentZone5", (req,res)=>{
  var answer = req.body.con5;
  var infectedPopulation = req.body.infectedPopulation;
  population = infectedPopulation;
  ques10 = answer;
  res.redirect("/");
})

app.listen(3000, (req,res)=>{
  console.log("Server running on port 3000");
})
