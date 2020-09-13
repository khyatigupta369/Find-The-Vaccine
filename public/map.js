var state1 = document.querySelector(".c1");
var state2 = document.querySelector(".c2");
var state3 = document.querySelector(".c3");
var state4 = document.querySelector(".c4");
var state5 = document.querySelector(".c5");

  var ans1 = document.querySelector(".ans1").value;
  var ans2 = document.querySelector(".ans2").value;
  var ans3 = document.querySelector(".ans3").value;
  var ans4 = document.querySelector(".ans4").value;
  var ans5 = document.querySelector(".ans5").value;

  var con1 = document.querySelector(".con1").value;
  var con2 = document.querySelector(".con2").value;
  var con3 = document.querySelector(".con3").value;
  var con4 = document.querySelector(".con4").value;
  var con5 = document.querySelector(".con5").value;

    if(ans1!=="bcwshegjkd"){
      if(ans1==="4"){
        state1.classList.add("right");
      }else{
        state1.classList.add("wrong");
        document.querySelector(".b6").classList.remove("displayBtn");
      }
      document.querySelector(".b1").disabled = true;
    }

    // var timeOver1 = document.querySelector(".timeOver1").value;
    // if(timeOver1 === "qwerty"){
    //   document.querySelector(".b1").disabled = true;
    //   document.querySelector(".b6").classList.remove("displayBtn");
    // }

if(ans2!=="hgbcjhsd"){
    if(ans2==="5"){
      state2.classList.add("right");
    }else{
      state2.classList.add("wrong");
      document.querySelector(".b7").classList.remove("displayBtn");
    }
    document.querySelector(".b2").disabled = true;
}

// var timeOver2 = document.querySelector(".timeOver2").value;
// if(timeOver2 === "qwerty"){
//   document.querySelector(".b2").disabled = true;
//   document.querySelector(".b7").classList.remove("displayBtn");
// }

if(ans3!=="bsdhdbcjs"){
    if(ans3==="6"){
      state3.classList.add("right");
    }else{
      state3.classList.add("wrong");
      document.querySelector(".b8").classList.remove("displayBtn");
    }
    document.querySelector(".b3").disabled = true;
}
//
// var timeOver3 = document.querySelector(".timeOver3").value;
// if(timeOver3 === "qwerty"){
//   document.querySelector(".b3").disabled = true;
//   document.querySelector(".b8").classList.remove("displayBtn");
// }

if(ans4!=="hsbjchjgcg"){
    if(ans4==="7"){
      state4.classList.add("right");
    }else{
      state4.classList.add("wrong");
      document.querySelector(".b9").classList.remove("displayBtn");
    }
    document.querySelector(".b4").disabled = true;
}

// var timeOver4 = document.querySelector(".timeOver4").value;
// if(timeOver4 === "qwerty"){
//   document.querySelector(".b4").disabled = true;
//   document.querySelector(".b9").classList.remove("displayBtn");
// }

if(ans5!=="bsjcbjhs"){
    if(ans5==="8"){
      state5.classList.add("right");
    }else{
      state5.classList.add("wrong");
      document.querySelector(".b10").classList.remove("displayBtn");
    }
    document.querySelector(".b5").disabled = true;
}

// var timeOver5 = document.querySelector(".timeOver5").value;
// if(timeOver5 === "qwerty"){
//   document.querySelector(".b5").disabled = true;
//   document.querySelector(".b10").classList.remove("displayBtn");
// }

if(con1!=="hbsvjhsb"){
    if(con1==="9"){
      state1.classList.remove("wrong");
    }
    document.querySelector(".b6").classList.add("displayBtn");
    document.querySelector(".b1").disabled = false;
}

// var timeOver6 = document.querySelector(".timeOver6").value;
// if(timeOver6 === "qwerty"){
//   document.querySelector(".b1").disabled = false;
//   document.querySelector(".b6").classList.add("displayBtn");
// }

if(con2!=="uashiuaj"){
    if(con2==="10"){
      state2.classList.remove("wrong");
    }
    document.querySelector(".b7").classList.add("displayBtn");
    document.querySelector(".b2").disabled = false;
}

// var timeOver7 = document.querySelector(".timeOver7").value;
// if(timeOver7 === "qwerty"){
//   document.querySelector(".b2").disabled = false;
//   document.querySelector(".b7").classList.add("displayBtn");
// }

if(con3!=="kjehfish"){
    if(con3==="11"){
      state3.classList.remove("wrong");
    }
    document.querySelector(".b8").classList.add("displayBtn");
    document.querySelector(".b3").disabled = false;
}

// var timeOver8 = document.querySelector(".timeOver8").value;
// if(timeOver8 === "qwerty"){
//   document.querySelector(".b3").disabled = false;
//   document.querySelector(".b8").classList.add("displayBtn");
// }

if(con4!=="shuegfwh"){
    if(con4==="12"){
      state4.classList.remove("wrong");
    }
    document.querySelector(".b9").classList.add("displayBtn");
    document.querySelector(".b4").disabled = false;
}
//
// var timeOver9 = document.querySelector(".timeOver9").value;
// if(timeOver9 === "qwerty"){
//   document.querySelector(".b4").disabled = false;
//   document.querySelector(".b9").classList.add("displayBtn");
// }

if(con5!=="nbsahbkj"){
    if(con5==="13"){
      state5.classList.remove("wrong");
    }
    document.querySelector(".b10").classList.add("displayBtn");
    document.querySelector(".b5").disabled = false;
}
// 
// var timeOver10 = document.querySelector(".timeOver10").value;
// if(timeOver10 === "qwerty"){
//   document.querySelector(".b5").disabled = false;
//   document.querySelector(".b10").classList.add("displayBtn");
// }
