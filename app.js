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
mongoose.set('useFindAndModify', false);
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
    const userId = req.params.userId;
        Innerve.findOne({
          _id: userId
        }, function(err, country) {
          if (!err) {
            var name = country.name;
            var ques1 = country.question1,ques2 = country.question2,ques3 = country.question3,ques4 = country.question4,
            ques5 = country.question5,ques11 = country.question11,ques12 = country.question12,ques13 = country.question13,
            ques14 = country.question14,ques15 = country.question15,ques6 = country.containment1,ques7 = country.containment2,
            ques8 = country.containment3,ques9 = country.containment4,ques10 = country.containment5,population = country.population;

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
  const userId = req.params.userId;

  if(buttonName==="1"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question1",{population: found.population, timeLeft1: found.timeLeft1, userId: userId});
      }
    });
  }
  else if(buttonName==="2"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question2",{population: found.population, timeLeft2: found.timeLeft2, userId: userId});
      }
    });
  }
  else if(buttonName==="3"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question3",{population: found.population, timeLeft3: found.timeLeft3, userId: userId});
      }
    });
  }
  else if(buttonName==="4"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question4",{population: found.population, timeLeft4: found.timeLeft4, userId: userId});
      }
    });
  }
  else if(buttonName==="5"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question5",{population: found.population, timeLeft5: found.timeLeft5, userId: userId});
      }
    });
  }
  else if(buttonName==="6"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment1",{population: found.population, timeLeft6: found.timeLeft6, userId: userId});
      }
    });
  }
  else if(buttonName==="7"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment2",{population: found.population, timeLeft7: found.timeLeft7, userId: userId});
      }
    });
  }
  else if(buttonName==="8"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment3",{population: found.population, timeLeft8: found.timeLeft8, userId: userId});
      }
    });
  }
  else if(buttonName==="9"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment4",{population: found.population, timeLeft9: found.timeLeft9, userId: userId});
      }
    });
  }
  else if(buttonName==="10"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("containment5",{population: found.population, timeLeft10: found.timeLeft10, userId: userId});
      }
    });
  }
  else if(buttonName==="11"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question11",{population: found.population, timeLeft11: found.timeLeft11, userId: userId});
      }
    });
  }
  else if(buttonName==="12"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question12",{population: found.population, timeLeft12: found.timeLeft12, userId: userId});
      }
    });
  }
  else if(buttonName==="13"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question13",{population: found.population, timeLeft13: found.timeLeft13, userId: userId});
      }
    });
  }
  else if(buttonName==="14"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question14",{population: found.population, timeLeft14: found.timeLeft14, userId: userId});
      }
    });
  }
  else if(buttonName==="15"){
    Innerve.findOne({_id: userId}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        res.render("question15",{population: found.population, timeLeft15: found.timeLeft15, userId: userId});
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
    var userId = req.body.userId2;
    var infectedPopulation = req.body.infectedPopulation;
    console.log(userId);
    Innerve.findOneAndUpdate({_id: userId}, {question1: answer,population: infectedPopulation}, (err, found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated - " + found.population);
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var timeLeft = req.body.timeLeftData;
    var userId = req.body.userId;
    console.log(userId);
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft1: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        console.log(found._id);
        res.render("question1",{population: found.population, timeLeft1: timeLeft, userId: found._id});
      }
    });
  }
})
// question2

app.post("/question2", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans2;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question2: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft2: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question2",{population: found.population, timeLeft2: timeLeft, userId: found._id});
      }
    });
  }
})
// question3

app.post("/question3", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans3;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question3: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft3: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question3",{population: found.population, timeLeft3: timeLeft, userId: found._id});
      }
    });
  }
});
// question4

app.post("/question4", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans4;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question4: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft4: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question4",{population: found.population, timeLeft4: timeLeft, userId: found._id});
      }
    });
  }
})

// question5
app.post("/question5", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans5;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question5: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft5: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question5",{population: found.population, timeLeft5: timeLeft, userId: found._id});
      }
    });
  }
})

//containment1
app.post("/containmentZone1", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.con1;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {containment1: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft6: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("containment1",{population: found.population, timeLeft6: timeLeft, userId: found._id});
      }
    });
  }
})

//containment2
app.post("/containmentZone2", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.con2;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {containment2: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft7: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("containment2",{population: found.population, timeLeft7: timeLeft, userId: found._id});
      }
    });
  }
})

//containment3
app.post("/containmentZone3", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.con3;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {containment3: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft8: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("containment3",{population: found.population, timeLeft8: timeLeft, userId: found._id});
      }
    });
  }
});

//containment14
app.post("/containmentZone4", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.con4;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {containment4: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft9: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("containment4",{population: found.population, timeLeft9: timeLeft, userId: found._id});
      }
    });
  }
});

//containment5
app.post("/containmentZone5", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.con5;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {containment5: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft10: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("containment5",{population: found.population, timeLeft10: timeLeft, userId: found._id});
      }
    });
  }
});

//question11
app.post("/question11", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans11;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question11: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft11: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question11",{population: found.population, timeLeft11: timeLeft, userId: found._id});
      }
    });
  }
});

//question12
app.post("/question12", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans12;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question12: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft12: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question12",{population: found.population, timeLeft12: timeLeft, userId: found._id});
      }
    });
  }
});

//question13
app.post("/question13", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans13;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question13: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft13: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question13",{population: found.population, timeLeft13: timeLeft, userId: found._id});
      }
    });
  }
});

//question14
app.post("/question14", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans14;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question14: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft14: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question14",{population: found.population, timeLeft14: timeLeft, userId: found._id});
      }
    });
  }
});

//question15
app.post("/question15", (req,res)=>{
  var formButton = req.body.button;
  if(formButton==="1"){
    var userId = req.body.userId2;
    var answer = req.body.ans15;
    var infectedPopulation = req.body.infectedPopulation;
    Innerve.findOneAndUpdate({_id: userId}, {question15: answer,population: infectedPopulation}, (err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("infectedPopulation Updated");
      }
    });
    res.redirect("/map/"+userId);
  }
  else if(formButton==="2"){
    var userId = req.body.userId;
    var timeLeft = req.body.timeLeftData;
    Innerve.findOneAndUpdate({_id: userId}, {timeLeft15: timeLeft}, (err,found)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Time Updated");
        res.render("question15",{population: found.population, timeLeft15: timeLeft, userId: found._id});
      }
    });
  }
});

app.listen(process.env.PORT || 3000, (req,res)=>{
  console.log("Server running on port 3000");
});
