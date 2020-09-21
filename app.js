const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
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

mongoose.connect("mongodb://localhost:27017/innerveDB", {useNewUrlParser: true, useUnifiedTopology: true});
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
let name;

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

app.get("/map/:name", (req, res) => {
  if (req.isAuthenticated()) {
    name = req.params.name;
    mapNames.mapNames().forEach(function(item) {
      if (item === name) {
        Innerve.findOne({
          name: name
        }, function(err, country) {
          if (!err) {
            ques1 = country.question1;
            ques2 = country.question2;
            ques3 = country.question3;
            ques4 = country.question4;
            ques5 = country.question5;
            ques11 = country.question11;
            ques12 = country.question12;
            ques13 = country.question13;
            ques14 = country.question14;
            ques15 = country.question15;
            ques6 = country.containment1;
            ques7 = country.containment2;
            ques8 = country.containment3;
            ques9 = country.containment4;
            ques10 = country.containment5;
            population = country.population;
            console.log("population:" + population);
            res.render("map", {
              name: name,
              ques1: ques1,
              ques2: ques2,
              ques3: ques3,
              ques4: ques4,
              ques5: ques5,
              ques6: ques6,
              ques7: ques7,
              ques8: ques8,
              ques9: ques9,
              ques10: ques10,
              ques11: ques11,
              ques12: ques12,
              ques13: ques13,
              ques14: ques14,
              ques15: ques15,
              population: population
            });
          } else {
            console.log(err);
          }
        })
      }
    });
  }
});

app.get("/signup",(req,res)=>{
  res.render("signup");
})

// SignUp POST
app.post("/signup",(req,res)=>{
  Innerve.register({username: req.body.username, name: req.body.username}, req.body.password, (err,user)=>{
    if(err){
      console.log(err);
      res.redirect("/");
    }else{
      res.redirect("/map/"+user.name);
    }
  })
})

//Login Post
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/map/' + req.user.username);
  });
// app.post("/login", (req,res)=>{
//   const user = new Innerve({
//     username: req.body.username,
//     password: req.body.password
//   })
//
//   req.login(user, (err)=>{
//     if(err){
//       console.log(err);
//     }else{
//       passport.authenticate("local")(req,res, ()=>{
//         Innerve.findOne({_id: req.user._id}, (err,foundUser)=>{
//           res.redirect("/map/" + foundUser.name);
//         })
//       })
//     }
//   })
// })

// question1
app.post("/map/:name",(req,res)=>{
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
  else if(buttonName==="11"){
    res.render("question11",{population: population})
  }
  else if(buttonName==="12"){
    res.render("question12",{population: population})
  }
  else if(buttonName==="13"){
    res.render("question13",{population: population})
  }
  else if(buttonName==="14"){
    res.render("question14",{population: population})
  }
  else if(buttonName==="15"){
    res.render("question15",{population: population})
  }
});

app.post("/question1", (req,res)=>{
  var answer = req.body.ans1;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques1 = answer;
  Innerve.updateOne({name: name}, {question1: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
})
// question2

app.post("/question2", (req,res)=>{
  var answer = req.body.ans2;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  Innerve.updateOne({name: name}, {question2: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  // ques2 = answer;
  res.redirect("/map/"+name);
})
// question3

app.post("/question3", (req,res)=>{
  var answer = req.body.ans3;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques3 = answer;
  Innerve.updateOne({name: name}, {question3: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
})
// question4

app.post("/question4", (req,res)=>{
  var answer = req.body.ans4;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques4 = answer;
  Innerve.updateOne({name: name}, {question4: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
})

// question5
app.post("/question5", (req,res)=>{
  var answer = req.body.ans5;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques5 = answer;
  Innerve.updateOne({name: name}, {question5: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
})

//containment1
app.post("/containmentZone1", (req,res)=>{
  var answer = req.body.con1;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques6 = answer;
  Innerve.updateOne({name: name}, {containment1: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
})

//containment2
app.post("/containmentZone2", (req,res)=>{
  var answer = req.body.con2;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques7 = answer;
  Innerve.updateOne({name: name}, {containment2: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
})

//containment1
app.post("/containmentZone3", (req,res)=>{
  var answer = req.body.con3;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques8 = answer;
  Innerve.updateOne({name: name}, {containment3: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

//containment1
app.post("/containmentZone4", (req,res)=>{
  var answer = req.body.con4;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques9 = answer;
  Innerve.updateOne({name: name}, {containment4: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
    res.redirect("/map/"+name);
  });
});

//containment1
app.post("/containmentZone5", (req,res)=>{
  var answer = req.body.con5;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques10 = answer;
  Innerve.updateOne({name: name}, {containment5: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

//question11
app.post("/question11", (req,res)=>{
  var answer = req.body.ans11;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques11 = answer;
  Innerve.updateOne({name: name}, {question11: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

//question12
app.post("/question12", (req,res)=>{
  var answer = req.body.ans12;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques12 = answer;
  Innerve.updateOne({name: name}, {question12: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

//question13
app.post("/question13", (req,res)=>{
  var answer = req.body.ans13;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques13 = answer;
  Innerve.updateOne({name: name}, {question13: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

//question14
app.post("/question14", (req,res)=>{
  var answer = req.body.ans14;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques14 = answer;
  Innerve.updateOne({name: name}, {question14: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

//question15
app.post("/question15", (req,res)=>{
  var answer = req.body.ans15;
  var infectedPopulation = req.body.infectedPopulation;
  // population = infectedPopulation;
  // ques15 = answer;
  Innerve.updateOne({name: name}, {question15: answer,population: infectedPopulation}, (err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("infectedPopulation Updated");
    }
  });
  res.redirect("/map/"+name);
});

app.listen(3000, (req,res)=>{
  console.log("Server running on port 3000");
});
