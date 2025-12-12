
const database = {
  "limit team": { "direct": "limit" },
  "l.i.m.i.t team": { "direct": "limit" },
  "l.i.m.i.t": { "direct": "limit" },
  "limit": {
    "prefix": "[boxcolor:cyan]",
    "date": "2 Nissan 1994",
    "entry": `[color:cyan]
              L.I.M.I.T (aka)`,
  },
  "universe id number": { "direct": "universe id" },
  "universe id": {
    "prefix": "[boxcolor:cyan]",
    "date": "15 Tishrei 1991",
    "entry": `[color:#ff8800]
              Transportation infrastructure utilizing non-Euclidean geometry to compress 
              travel distances. Vehicles enter hyperbolic space through stabilized rifts, 
              reducing 500km journeys to approximately 12km subjective distance. 
              Side effects include minor temporal displacement (±3 minutes) and occasional 
              [color:#ff0000]reality bleed-through from adjacent universes.`,
  },
  
  "reality bleed": {
    "prefix": "[boxcolor:#ff0000]",
    "universeid": "ΩQ·CORE.0001·ΦALERT·R0",
    "date": "1 Tevet 1988",
    "entry": `[color:#ff0000]
              ALERT LEVEL: HIGH · Phenomenon where unstable universe boundaries allow 
              matter, energy, or information to leak between parallel realities. 
              Symptoms include: objects with impossible properties, memories of events 
              that never occurred, and visual distortions. [color:#ffff00]If experiencing 
              reality bleed, immediately query LIMIT for local stabilization protocols.`,
  },
  
  "quantum anchor": {
    "prefix": "[boxcolor:#00ff00]",
    "universeid": "ΩQ·5B82.9156·Φ44ε673m1·R2",
    "date": "22 Iyar 1989",
    "entry": `[color:#00ff00]
              Device that stabilizes local spacetime by establishing a fixed quantum 
              reference point. Essential equipment for LIMIT field agents operating in 
              unstable realities. Generates a 50-meter sphere of normalized causality. 
              Battery life: 72 hours. [color:#ff8800]WARNING: Do not operate near 
              hyperbolic highways or active rifts.`,
  },
  
  "limit team": {
    "prefix": "[boxcolor:cyan]",
    "universeid": "ΩQ·2E4A.7193·Φ18ε299r8·R1",
    "date": "9 Av 1987",
    "entry": `[color:cyan]
              Interdimensional research organization responsible for documenting parallel 
              universes and providing aid to realities experiencing instability. 
              Field agents wear black suits and operate primarily in stable universes, 
              collecting data while maintaining minimal interference with local populations. 
              [color:#ffff00]If you can see this message, your reality is stable enough 
              to receive LIMIT transmissions.`,
  },
  
  "temporal displacement": {
    "prefix": "[boxcolor:#ff00ff]",
    "universeid": "ΩQ·3C94.4521·Φ67ε881p9·R3",
    "date": "18 Elul 1990",
    "entry": `[color:#ff00ff]
              Minor time desynchronization caused by interdimensional travel or exposure 
              to reality bleeds. Typically ranges from seconds to hours. Subjects report 
              "arriving before they left" or experiencing duplicate moments. [color:#00ffff]
              Chronic displacement can lead to causality fragmentation - seek LIMIT 
              medical immediately if symptoms persist beyond 48 hours.`,
  },
  
  "causality fragmentation": {
    "prefix": "[boxcolor:#ff0000]",
    "universeid": "ΩQ·CORE.0003·ΦALERT·R0",
    "date": "30 Shevat 1992",
    "entry": `[color:#ff0000]
              CRITICAL CONDITION · Occurs when an individual's personal timeline becomes 
              unstable due to repeated temporal displacement or severe reality bleed exposure. 
              Symptoms: [color:#ff8800]memory loops, experiencing multiple presents 
              simultaneously, gradual erasure from causal history. [color:#ff0000]
              SURVIVAL RATE: 23% · Requires immediate quantum anchor attachment and 
              timeline reconstruction.`,
  },

  "help": {
    "prefix": "[boxcolor:#00ffff]",
    "date": "1 Nissan 1887",
    "entry": `[color:#00ffff]
              AVAILABLE COMMANDS: <br>
              · lim - Information about L.I.M.I.T system <br>
              · hyperbolic highway - Non-Euclidean transport tech <br>
              · reality bleed - Universe boundary instability <br>
              · quantum anchor - Spacetime stabilization device <br>
              · limit team - About the field operatives <br>
              · temporal displacement - Time desynchronization <br>
              · causality fragmentation - Critical timeline instability <br>
              <br>
              [color:#ffff00]Type any query to search the database.`,
  },
};

setInterval(() => GlobalUpdate(), 1000 / 24);

var requestedText = `
This is the L.I.M.I.T Database <br>
last update: 2 Nissan 1887 - 33 A.M.`;
var inputAllowed = true;
var queryNumber = 0;
var contentNumber = 0;
var color = "#ffff00";
var borderColor = "#ffff00";
var resetColorPerContent = true;
var resetColorPerQuery = true;
var skipstart = 0;
var skipend = 0;
var skip = false;

function PartialParseNumber(wholeText) {
  var i = 0;
  var b = false;
  while ((![" ", "·"].includes(wholeText[i]) || b) && i < wholeText.length && i < 20) {
    if (wholeText[i] == "<") {
      i += wholeText.indexOf(">") - i + 1;
      continue;
    }
    if (wholeText[i] == "[") {
      skipstart = i;
      let index = wholeText.indexOf("]");
      RunCommand(wholeText.substring(i, index - i + 1));
      skipend = i+index;
      // i+=1;
      skip = true;
      break;
    }
    i+=1;
  }
  // while ([" ", "·", "."].includes(wholeText[i+1]) && i < wholeText.length && i < 10) {
  //   i+=1;
  // }
  // if (i==0) {
  //   i+=1;
  //   console.log("i had to be increased");
  // }
  return i+1;
}

function RunCommand(text) {
  if (text[0]=="[") {
      const command = text.substring(1, text.indexOf(":"));
      const input = text.substring(text.indexOf(":")+1, text.indexOf("]"));
      console.log(command + ":" + input);
      if (command == "color") {
        if (input) color = input;
        else color = "#ffff00";
        contentNumber+=1;
        document.querySelector('#out'+queryNumber).innerHTML += 
        `<p id="con${contentNumber}" class="crt-glow crt-text" style="--color:${color};"></p>`;
      } else if (command == "wait") {

      } else if (command == "boxcolor" || command == "bordercolor") {
        if (input) borderColor = input;
        else borderColor = "#ffff00";
        document.getElementById('out' + queryNumber).style.setProperty('--color', borderColor);
      }
    }
}

function GlobalUpdate() {
  // console.log(requestedText);
  if (requestedText) {
    if (inputAllowed) {
      queryNumber+=1;
      console.log(queryNumber);
      document.querySelector('#output').innerHTML += 
      `<div id="out${queryNumber}" class="crt-outline" style="--color:${borderColor}">
      <p id="con${contentNumber}" class="crt-glow crt-text" style="--color:${color};"></p>
      </div>`;
      inputAllowed = false;
      document.getElementById("input").style.setProperty("--color", "#ff8800");
    }
    let cutLength = PartialParseNumber(requestedText);
    if (skip) {
      requestedText = requestedText.slice(0, skipstart) + requestedText.slice(skipend+1);
      skip = false;
      skipstart = 0;
      skipend = 0;
    }
    document.querySelector('#out' + queryNumber).querySelector('#con' + contentNumber).innerHTML += requestedText.substring(0, cutLength);
    requestedText = requestedText.slice(cutLength);
    window.scrollTo(0, document.body.scrollHeight - 1800);
  } else {
    if (inputAllowed==false && resetColorPerContent) {
        color = "#ffff00";
    }
    if (inputAllowed==false && resetColorPerQuery) {
      borderColor = "#ffff00";
    }
    inputAllowed = true;
    document.getElementById("input").style.setProperty("--color", "#ffff00");
  }
}

document.querySelector('#input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && inputAllowed) {
    
    const inputText = event.target.value.toLowerCase();

    var htmlValue = "";
    if (database[inputText]) {
      var entry = inputText;
      if (database[inputText]["direct"])
        entry = database[inputText]["direct"]; 
      if (database[entry]["prefix"])
        htmlValue += `${database[entry]["prefix"]}`
      htmlValue += `UPDATED:     ${database[entry]["date"]} <br>`
      if (database[entry]["universeid"])
        htmlValue += `UNIVERSE ID: ${database[entry]["universeid"]} <br>`
      htmlValue += `
      <br>
      ENTRY:<br>
      ${database[entry]["entry"]}
      `;
    } else {
      htmlValue = `[color:#ff2424]
      [boxcolor:#ff2424]  UNKNOWN QUERY: "${inputText}"
      `;
    }
    
    
    requestedText = htmlValue;
    
      // requestedText = `<div>Command not found: ${inputText}</div>`;
    

    window.scrollTo(0, document.body.scrollHeight - 1800);

    document.querySelector(".scroller").innerHTML

    event.target.value = '';
    
  }

})