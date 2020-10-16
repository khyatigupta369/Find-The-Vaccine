const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const syntaxError = require("syntax-error");
const mapNames = require("./mapNames.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(session({
  secret: "Innerve - Find the Vaccine",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://admin123:Thisisfindthevaccine@cluster0-shard-00-00.rwtqh.mongodb.net:27017,cluster0-shard-00-01.rwtqh.mongodb.net:27017,cluster0-shard-00-02.rwtqh.mongodb.net:27017/innerveDB?ssl=true&replicaSet=atlas-w87s30-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const innerveSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  question5: String,
  population: Number,
  question11: String,
  question12: String,
  question13: String,
  question14: String,
  question15: String,
  containment1: String,
  containment2: String,
  containment3: String,
  containment4: String,
  containment5: String,
  timeLeft1: Number,
  timeLeft2: Number,
  timeLeft3: Number,
  timeLeft4: Number,
  timeLeft5: Number,
  timeLeft6: Number,
  timeLeft7: Number,
  timeLeft8: Number,
  timeLeft9: Number,
  timeLeft10: Number,
  timeLeft11: Number,
  timeLeft12: Number,
  timeLeft13: Number,
  timeLeft14: Number,
  timeLeft15: Number

},
{ collection: 'country' }
)

innerveSchema.plugin(passportLocalMongoose);

const Innerve = new mongoose.model("Innerve",innerveSchema);

passport.use(Innerve.createStrategy());

passport.serializeUser(Innerve.serializeUser());
passport.deserializeUser(Innerve.deserializeUser());

let mapUrl = [];
let names = [];
let name, userId;

var ques1="bcwshegjkd", ques2="hgbcjhsd", ques3="bsdhdbcjs", ques4="hsbjchjgcg", ques5="bsjcbjhs", population=8000;
var ques6="hbsvjhsb", ques7="uashiuaj", ques8="kjehfish", ques9="shuegfwh", ques10="nbsahbkj";
var ques11="sbvjzhbjkws",  ques12="sbvjzhbjkws", ques13="sbvjzhbjkws", ques14="sbvjzhbjkws", ques15="sbvjzhbjkws";

// app.get("/", (req,res)=>{
//   mapNames.mapNames().forEach(function(item){
//     names.push(item);
//     let newUrl = "/map/"+item;
//     mapUrl.push(newUrl);
//   })
//   res.render("home", {mapNames: names, mapUrl: mapUrl});
// });

app.get("/",(req,res)=>{
  res.render("test");
})

app.get("/login", (req,res)=>{
  res.render("login");
})

app.get("/about", (req,res)=>{
  res.render("about");
})

app.get("/instruction", (req,res)=>{
  res.render("instruction");
})

app.get("/map/:userId", (req, res) => {
  if (req.isAuthenticated()) {
    userId = req.params.userId;
        Innerve.findOne({
          _id: userId
        }, function(err, country) {
          if (!err) {
            name = country.name;
            ques1 = country.question1;ques2 = country.question2;ques3 = country.question3;ques4 = country.question4;
            ques5 = country.question5;ques11 = country.question11;ques12 = country.question12;ques13 = country.question13;
            ques14 = country.question14;ques15 = country.question15;ques6 = country.containment1;ques7 = country.containment2;
            ques8 = country.containment3;ques9 = country.containment4;ques10 = country.containment5;population = country.population;
            console.log("population:" + population);
            res.render("map", {name: name,userId: userId,ques1: ques1,ques2: ques2,ques3: ques3,ques4: ques4,ques5: ques5,
              ques6: ques6,ques7: ques7,ques8: ques8,ques9: ques9,ques10: ques10,ques11: ques11,
              ques12: ques12,ques13: ques13,ques14: ques14,ques15: ques15,population: population
            });
          }else {
            console.log(err);
          }
        })
  }else{
    res.redirect("/login");
  }
});

app.get("/InnSignUpervePage-Find-The-Vaccine",(req,res)=>{
  res.render("signup");
})

// SignUp POST
app.post("/signup",(req,res)=>{
  Innerve.register({username: req.body.username, name: req.body.username, question1: req.body.ques1,
                    question2: req.body.ques2, question3: req.body.ques3, question4: req.body.ques4,
                    question5: req.body.ques5, containment1: req.body.con1, containment2: req.body.con2,
                    containment3: req.body.con3,containment4: req.body.con4, containment5: req.body.con5,
                    question11: req.body.ques11, question12: req.body.ques12,question13: req.body.ques13,
                    question14: req.body.ques14, question15: req.body.ques15},
    req.body.password, (err,user)=>{
    if(err){
      console.log(err);
      res.redirect("/");
    }else{
      res.redirect("/map/"+user.name);
    }
  })
})

//Login Post
// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     res.redirect('/map/' + req.user.username);
//   });
app.post("/login", (req,res)=>{
  const user = new Innerve({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, (err)=>{
    if(err){
      console.log(err);
    }else{
      passport.authenticate("local")(req,res, ()=>{
        Innerve.findOne({_id: req.user._id}, (err,foundUser)=>{
          res.redirect("/map/" + foundUser._id);
        })
      })
    }
  })
})

// question1
app.post("/map/:userId",(req,res)=>{
  var buttonName = req.body.btn;
  if(buttonName==="1"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question1",{population: population, timeLeft1: found.timeLeft1});
      }
    });
  }
  else if(buttonName==="2"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question2",{population: population, timeLeft2: found.timeLeft2});
      }
    });
  }
  else if(buttonName==="3"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question3",{population: population, timeLeft3: found.timeLeft3});
      }
    });
  }
  else if(buttonName==="4"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question4",{population: population, timeLeft4: found.timeLeft4});
      }
    });
  }
  else if(buttonName==="5"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question5",{population: population, timeLeft5: found.timeLeft5});
      }
    });
  }
  else if(buttonName==="6"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment1",{population: population, timeLeft6: found.timeLeft6});
      }
    });
  }
  else if(buttonName==="7"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment2",{population: population, timeLeft7: found.timeLeft7});
      }
    });
  }
  else if(buttonName==="8"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment3",{population: population, timeLeft8: found.timeLeft8});
      }
    });
  }
  else if(buttonName==="9"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment4",{population: population, timeLeft9: found.timeLeft9});
      }
    });
  }
  else if(buttonName==="10"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment5",{population: population, timeLeft10: found.timeLeft10});
      }
    });
  }
  else if(buttonName==="11"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question11",{population: population, timeLeft11: found.timeLeft11});
      }
    });
  }
  else if(buttonName==="12"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question12",{population: population, timeLeft12: found.timeLeft12});
      }
    });
  }
  else if(buttonName==="13"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question13",{population: population, timeLeft13: found.timeLeft13});
      }
    });
  }
  else if(buttonName==="14"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question14",{population: population, timeLeft14: found.timeLeft14});
      }
    });
  }
  else if(buttonName==="15"){
    Innerve.findOne({name: name}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question15",{population: population, timeLeft15: found.timeLeft15});
      }
    });
  }else if(buttonName=="16"){
    res.render("end");
  }
});

app.post("/question1", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans1;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question1: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft1: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question1",{population: population, timeLeft1: timeLeft});
  }
})
// question2

app.post("/question2", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans2;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question2: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft2: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question2",{population: population, timeLeft2: timeLeft});
  }
})
// question3

app.post("/question3", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans3;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question3: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft3: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question3",{population: population, timeLeft3: timeLeft});
  }
});
// question4

app.post("/question4", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans4;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question4: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft4: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question4",{population: population, timeLeft4: timeLeft});
  }
})

// question5
app.post("/question5", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans5;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question5: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft5: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question5",{population: population, timeLeft5: timeLeft});
  }
})

//containment1
app.post("/containmentZone1", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.con1;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {containment1: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft6: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("containment1",{population: population, timeLeft6: timeLeft});
  }
})

//containment2
app.post("/containmentZone2", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.con2;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {containment2: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft7: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("containment2",{population: population, timeLeft7: timeLeft});
  }
})

//containment3
app.post("/containmentZone3", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.con3;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {containment3: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft8: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("containment3",{population: population, timeLeft8: timeLeft});
  }
});

//containment14
app.post("/containmentZone4", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.con4;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {containment4: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft9: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("containment4",{population: population, timeLeft9: timeLeft});
  }
});

//containment5
app.post("/containmentZone5", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.con5;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {containment5: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft10: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("containment5",{population: population, timeLeft10: timeLeft});
  }
});

//question11
app.post("/question11", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans11;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question11: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft11: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question11",{population: population, timeLeft11: timeLeft});
  }
});

//question12
app.post("/question12", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans12;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question12: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft12: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question12",{population: population, timeLeft12: timeLeft});
  }
});

//question13
app.post("/question13", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans13;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question13: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft13: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question13",{population: population, timeLeft13: timeLeft});
  }
});

//question14
app.post("/question14", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans14;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question14: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft14: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question14",{population: population, timeLeft14: timeLeft});
  }
});

//question15
app.post("/question15", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var answer = req.body.ans15;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.updateOne({name: name}, {question15: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    Innerve.updateOne({name: name}, {timeLeft15: timeLeft}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
      }
    });
    res.render("question15",{population: population, timeLeft15: timeLeft});
  }
});

app.listen(process.env.PORT || 3000, (req,res)=>{
  console.log("Server running on port 3000");
});
