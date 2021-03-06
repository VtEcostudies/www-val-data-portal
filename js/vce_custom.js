var begEvent = new Event('xhttpBeg');
var endEvent = new Event('xhttpEnd');
var xhrTimeout = 10000;
var stats = [];
var datas = [];

function loadStats() {
    var xmlhttp = new XMLHttpRequest();
    var reqHost = "https://biocache-ws.vtatlasoflife.org";
    var reqRoute = "/explore/groups";
    var reqQuery = "?q=*&wkt=POLYGON((-73.3427%2045.0104,-73.1827%2045.0134,-72.7432%2045.0153,-72.6100%2045.0134,-72.5551%2045.0075,-72.4562%2045.0090,-72.3113%2045.0037,-72.0964%2045.0066,-71.9131%2045.0070,-71.5636%2045.0138,-71.5059%2045.0138,-71.5294%2044.9748,-71.4949%2044.9123,-71.5567%2044.8296,-71.6281%2044.7506,-71.6061%2044.7077,-71.5677%2044.6481,-71.5388%2044.5817,-71.6006%2044.5533,-71.5746%2044.5308,-71.5883%2044.4955,-71.6556%2044.4504,-71.7146%2044.4093,-71.7957%2044.3975,-71.8163%2044.3563,-71.8698%2044.3327,-71.9138%2044.3484,-71.9865%2044.3386,-72.0346%2044.3052,-72.0428%2044.2432,-72.0662%2044.1930,-72.0360%2044.1349,-72.0580%2044.0698,-72.1101%2044.0017,-72.0937%2043.9671,-72.1252%2043.9088,-72.1733%2043.8682,-72.1994%2043.7899,-72.1994%2043.7899,-72.2392%2043.7384,-72.3010%2043.7056,-72.3271%2043.6391,-72.3436%2043.5893,-72.3793%2043.5814,-72.3972%2043.5027,-72.3807%2043.4988,-72.3999%2043.4150,-72.4123%2043.3601,-72.3903%2043.3591,-72.4081%2043.3282,-72.3999%2043.2762,-72.4370%2043.2342,-72.4493%2043.1852,-72.4480%2043.1311,-72.4507%2043.0679,-72.4438%2043.0067,-72.4699%2042.9846,-72.5276%2042.9645,-72.5331%2042.8951,-72.5633%2042.8639,-72.5098%2042.7863,-72.5166%2042.7652,-72.4741%2042.7541,-72.4590%2042.7289,-73.2761%2042.7465,-73.2912%2042.8025,-73.2850%2042.8357,-73.2678%2043.0679,-73.2472%2043.5022,-73.2561%2043.5615,-73.2939%2043.5774,-73.3049%2043.6271,-73.3557%2043.6271,-73.3976%2043.5675,-73.4326%2043.5883,-73.4285%2043.6351,-73.4079%2043.6684,-73.3907%2043.7031,-73.3516%2043.7701,-73.3928%2043.8207,-73.3832%2043.8533,-73.3969%2043.9033,-73.4086%2043.9365,-73.4134%2043.9795,-73.4381%2044.0427,-73.4141%2044.1058,-73.3928%2044.1921,-73.3427%2044.2393,-73.3186%2044.2467,-73.3406%2044.3484,-73.3385%2044.3690,-73.2946%2044.4328,-73.3296%2044.5367,-73.3832%2044.5919,-73.3770%2044.6569,-73.3681%2044.7477,-73.3317%2044.7857,-73.3324%2044.8043,-73.3818%2044.8398,-73.3564%2044.9040,-73.3392%2044.9181,-73.3372%2044.9643,-73.3537%2044.9799,-73.3447%2045.0046,-73.3447%2045.0109,-73.3426%2045.0104,-73.3427%2045.0104))";
    var elemOccurrn = document.getElementById("vt_occurrences");
    var elemSpecies = document.getElementById("vt_species");

    document.dispatchEvent(begEvent);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                stats = JSON.parse(xmlhttp.responseText);
                console.log(`${reqHost+reqRoute} occurrences: ${stats[0].count}, species: ${stats[0].speciesCount}`);
                //console.dir(stats);
                if (elemOccurrn) {
                  elemOccurrn.innerHTML = numeral(stats[0].count).format('0,0');
                } else {
                  console.log('HTML element id="vt_occurrences" NOT found.')
                }
                if (elemSpecies) {
                  elemSpecies.innerHTML = numeral(stats[0].speciesCount).format('0,0');
                } else {
                  console.log('HTML element id="vt_species" NOT found.')
                }
            } else {
                console.log(`An http ${xmlhttp.status} result was returned from ${reqHost}.`);
                if (elemOccurrn) {
                  elemOccurrn.style="font-size:8pt";
                  elemOccurrn.innerHTML = `(http ${xmlhttp.status} from ${reqHost+reqRoute})`;
                } else {
                  console.log('HTML element id="vt_occurrences" NOT found.')
                }
                if (elemSpecies) {
                  elemSpecies.style="font-size:8pt";
                  elemSpecies.innerHTML = `(http ${xmlhttp.status} from ${reqHost+reqRoute})`;
                } else {
                  console.log('HTML element id="vt_species" NOT found.')
                }
            }
            document.dispatchEvent(endEvent);
        }
    };

    console.log('AJAX GET request:', reqHost+reqRoute);

    xmlhttp.open("GET", reqHost+reqRoute+reqQuery, true);
    //xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xmlhttp.setRequestHeader("Accept", "*/*");
    //xmlhttp.setRequestHeader("Cache-Control", "no-cache");
    xmlhttp.timeout = xhrTimeout; // Set timeout to 10 seconds
    xmlhttp.ontimeout = function () { console.log(`AJAX GET request ${reqHost+reqRoute} timed out. (${xhrTimeout/1000} seconds).`); }
    xmlhttp.async = true;
    xmlhttp.send();
}

function loadDatasets() {
  var xmlhttp = new XMLHttpRequest();
  var reqHost = "https://collectory.vtatlasoflife.org/ws";
  var reqRoute = "/dataResource.json";
  var reqQuery = "";
  var elemDatasets = document.getElementById("vt_datasets");

  document.dispatchEvent(begEvent);

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
              datas = JSON.parse(xmlhttp.responseText);
              var count = Object.keys(datas).length;
              console.log(`${reqHost+reqRoute} count:`, count);
              if (elemDatasets) {
                elemDatasets.innerHTML = numeral(count).format('0,0');
              } else {
                console.log('HTML element id="vt_datasets" NOT found.')
              }
          } else {
              console.log(`An http ${xmlhttp.status} result was returned from ${reqHost}.`);
              if (elemDatasets) {
                elemDatasets.style="font-size:8pt";
                elemDatasets.innerHTML = `(http ${xmlhttp.status} from ${reqHost+reqRoute})`;
              } else {
                console.log('HTML element id="vt_datasets" NOT found.')
              }
          }
          document.dispatchEvent(endEvent);
      }
  };

  console.log('AJAX GET request:', reqHost+reqRoute);

  xmlhttp.open("GET", reqHost+reqRoute+reqQuery, true);
  xmlhttp.timeout = xhrTimeout; // Set timeout to 10 seconds
  xmlhttp.ontimeout = function () { console.log(`AJAX GET request ${reqHost+reqRoute} timed out. (${xhrTimeout/1000} seconds).`); }
  xmlhttp.async = true;
  xmlhttp.send();
}

/*
  Navigate to BIE Search page with the search value from html elment bie_search
*/
function searchBIE() {
  var search_value = document.getElementById("bie_search").value;
  //alert(`searchBIE(${search_value})`);
  console.log(`searchBIE(${search_value})`);
	window.location.assign("https://bie.vtatlasoflife.org/search?q=" + search_value);
}

/*
  Navigate to Occurrence Search page with the search value from html elment occ_search
*/
function searchOcc() {
  var search_value = document.getElementById("occ_search").value;
  console.log(`searchOcc(${search_value})`);
	window.location.assign("https://biocache.vtatlasoflife.org/occurrences/search?q=" + search_value);
}

window.onload = function() {

    console.log('window.onload()');

    //page reloads (F5) don't get xhttpBeg event - set loading class onload...
    if (document.getElementById("modal_vce_loading")) {
      var d = document.getElementById("modal_vce_loading");
      if (d) d.className = "vce_modal vce_loading";
    }

    document.addEventListener("xhttpBeg", function() {
      if (document.getElementById("modal_vce_loading")) {
        var d = document.getElementById("modal_vce_loading");
        if (d) d.className = "vce_modal vce_loading";
        console.log(`got xhttpBeg: ${d.className}`);
      }
    });

    document.addEventListener("xhttpEnd", function() {
      if (document.getElementById("modal_vce_loading")) {
        var d = document.getElementById("modal_vce_loading");
        if (d) d.className = "vce_modal";
        console.log(`got xhttpEnd: ${d.className}`);
      }
    });
};

/*
  Add listeners to activate search results on Enter key.

  TODO: Make this work in a more generalized manner, ie.
  for Enter, Tab, and on button press.

*/
function addListeners() {

      if (document.getElementById("bie_search")) {
          document.getElementById("bie_search").addEventListener("keypress", function(e) {
              //console.log('bie_search got keypress', e);
              if(e.which == 13){
                  searchBIE();
              }
          });
      }

      if (document.getElementById("bie_search_button")) {
          document.getElementById("bie_search_button").addEventListener("mouseup", function(e) {
              //console.log('bie_search_button got mouseup', e);
              searchBIE();
          });
      }

      if (document.getElementById("occ_search")) {
          document.getElementById("occ_search").addEventListener("keypress", function(e) {
              //console.log('occ_search got keypress', e);
              if(e.which == 13){
                  searchOcc();
              }
          });
      }

      if (document.getElementById("occ_search_button")) {
          document.getElementById("occ_search_button").addEventListener("mouseup", function(e) {
              //console.log('occ_search_button got mouseup', e);
              searchOcc();
          });
      }
  }

addListeners();
loadStats();
loadDatasets();
