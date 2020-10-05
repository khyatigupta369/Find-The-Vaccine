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

  var ans11 = document.querySelector(".ans11").value;
  var ans12 = document.querySelector(".ans12").value;
  var ans13 = document.querySelector(".ans13").value;
  var ans14 = document.querySelector(".ans14").value;
  var ans15 = document.querySelector(".ans15").value;

    if(ans1!=="bcwshegjkd"){
      if(ans1==="4"){
        state1.classList.add("right");
      }else{
        state1.classList.add("wrong");
        document.querySelector(".b6").classList.remove("displayBtn");
      }
      document.querySelector(".b1").disabled = true;
    }

if(ans2!=="hgbcjhsd"){
    if(ans2==="5"){
      state2.classList.add("right");
    }else{
      state2.classList.add("wrong");
      document.querySelector(".b7").classList.remove("displayBtn");
    }
    document.querySelector(".b2").disabled = true;
}

if(ans3!=="bsdhdbcjs"){
    if(ans3==="6"){
      state3.classList.add("right");
    }else{
      state3.classList.add("wrong");
      document.querySelector(".b8").classList.remove("displayBtn");
    }
    document.querySelector(".b3").disabled = true;
}

if(ans4!=="hsbjchjgcg"){
    if(ans4==="7"){
      state4.classList.add("right");
    }else{
      state4.classList.add("wrong");
      document.querySelector(".b9").classList.remove("displayBtn");
    }
    document.querySelector(".b4").disabled = true;
}

if(ans5!=="bsjcbjhs"){
    if(ans5==="8"){
      state5.classList.add("right");
    }else{
      state5.classList.add("wrong");
      document.querySelector(".b10").classList.remove("displayBtn");
    }
    document.querySelector(".b5").disabled = true;
}

if(con1!=="hbsvjhsb"){
    if(con1==="9"){
      state1.classList.remove("wrong");
      document.querySelector(".b1").disabled = false;
      document.querySelector(".b1").value = 11;
    }
    document.querySelector(".b6").classList.add("displayBtn");
}

if(con2!=="uashiuaj"){
    if(con2==="10"){
      state2.classList.remove("wrong");
      document.querySelector(".b2").disabled = false;
      document.querySelector(".b2").value = 12;
    }
    document.querySelector(".b7").classList.add("displayBtn");
}

if(con3!=="kjehfish"){
    if(con3==="11"){
      state3.classList.remove("wrong");
      document.querySelector(".b3").disabled = false;
      document.querySelector(".b3").value = 13;
    }
    document.querySelector(".b8").classList.add("displayBtn");
}

if(con4!=="shuegfwh"){
    if(con4==="12"){
      state4.classList.remove("wrong");
      document.querySelector(".b4").disabled = false;
      document.querySelector(".b4").value = 14;
    }
    document.querySelector(".b9").classList.add("displayBtn");
}


if(con5!=="nbsahbkj"){
    if(con5==="13"){
      state5.classList.remove("wrong");
      document.querySelector(".b5").disabled = false;
      document.querySelector(".b5").value = 15;
    }
    document.querySelector(".b10").classList.add("displayBtn");
}

if(ans11!=="sbvjzhbjkws"){
  if(ans11==="2"){
    state1.classList.add("right");
  }else{
    state1.classList.add("wrong");
  }
  document.querySelector(".b1").disabled = true;
}

if(ans12!=="sbvjzhbjkws"){
  if(ans12==="6"){
    state2.classList.add("right");
  }else{
    state2.classList.add("wrong");
  }
  document.querySelector(".b2").disabled = true;
}

if(ans13!=="sbvjzhbjkws"){
  if(ans13==="8"){
    state3.classList.add("right");
  }else{
    state3.classList.add("wrong");
  }
  document.querySelector(".b3").disabled = true;
}

if(ans14!=="sbvjzhbjkws"){
  if(ans14==="10"){
    state4.classList.add("right");
  }else{
    state4.classList.add("wrong");
  }
  document.querySelector(".b4").disabled = true;
}

if(ans15!=="sbvjzhbjkws"){
  if(ans15==="12"){
    state5.classList.add("right");
  }else{
    state5.classList.add("wrong");
  }
  document.querySelector(".b5").disabled = true;
}
