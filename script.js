let _estates = [0, 0, 0, 0, 0, 0, 0, 0];

function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

function test(states) {
  visitState(states);
  if (states[2] === "CLEAN" && states[1] === "CLEAN") {
    let random = Math.random();
    if (random > 0.4) {
      states[1] = "DIRTY";
      states[2] = "DIRTY";
      document.getElementById("log").innerHTML += "<br> A & B DIRTY";
    } else if (random > 0.25) {
      states[1] = "DIRTY";
      document.getElementById("log").innerHTML += "<br> A DIRTY";
    } else {
      states[2] = "DIRTY";
      document.getElementById("log").innerHTML += "<br> B DIRTY";
    }
    visitState(states);
  }

  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);
  document.getElementById("log").innerHTML += "<br>Location: "
    .concat(location)
    .concat(" | Action: ")
    .concat(action_result);
  let output = "";
  let i = 0
  _estates.forEach((x) => {
    output += '<div class="data-card">';
    output += "<h3>" + x + "</h3>";
    switch(x){
        case 0:
            output += '<h4>Location: A</br>Dirty-Dirty</h4>';
            break;
        case 1:
            output += '<h4>Location: B</br>Dirty-Dirty</h4>';
            break;
        case 2:
            output += '<h4>Location: A</br>Dirty-Clean</h4>';
            break;
        case 3:
            output += '<h4>Location: B</br>Dirty-Clean</h4>';
            break;
        case 4:
            output += '<h4>Location: A</br>Clean-Dirty</h4>';
            break;
        case 5:
            output += '<h4>Location: B</br>Clean-Dirty</h4>';
            break;
        case 6:
            output += '<h4>Location: A</br>Clean-Clean</th>';
            break;
        case 7:
            output += '<h4>Location: B Clean-Clean</h4>';
            break;
    }
    output += "</div>";
    if (i == 3)
        output += '</section><section class="page-contain">';

    i++;
  });

  document.getElementById("estados").innerHTML = `<section class="page-contain">${output}</section>`;

  if (action_result == "CLEAN") {
    if (location == "A") states[1] = "CLEAN";
    else if (location == "B") states[2] = "CLEAN";
  } else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";

  if (_estates.filter((x) => x >= 2).length == 8) {
    document.getElementById("status").innerHTML = "<h2>Finalizado!</h2>";

    return;
  }

  setTimeout(function () {
    test(states);
  }, 1000);
}

function visitState(states) {
  let position = 0;

  if (states[1] === "CLEAN") {
    position = 4;
  }
  if (states[0] === "B" && states[2] === "DIRTY") {
    position += 1;
  } else if (states[0] === "A" && states[2] === "CLEAN") {
    position += 2;
  } else if (states[0] === "B" && states[2] === "CLEAN") {
    position += 3;
  }
  _estates[position] = _estates[position] + 1;
  return;
}

var states = ["A", "DIRTY", "DIRTY"];
test(states);