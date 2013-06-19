//  .d8888b.  888      8888888888 888     888 8888888888 8888888b.  
// d88P  Y88b 888      888        888     888 888        888   Y88b 
// 888    888 888      888        888     888 888        888    888 
// 888        888      8888888    Y88b   d88P 8888888    888   d88P 
// 888        888      888         Y88b d88P  888        8888888P"  
// 888    888 888      888          Y88o88P   888        888 T88b   
// Y88b  d88P 888      888           Y888P    888        888  T88b  
//  "Y8888P"  88888888 8888888888     Y8P     8888888888 888   T88b                                                  
//
// Clever - Copyright (C) 2013 B^Dub - dubbytt@gmail.com - Last update June 18th 2013
// (subset of Chatty's 3000+ lines of code... clever "turntable.fm" bot)
//
// A NodeJS Turntable.fm bot that interfaces with the surprisingly real
// Cleverbot.com API, allowing an unlimited number of users to hold
// unique conversations with your bot via PM.  The conversation history
// is stored in an array so the conversation can be picked up right 
// where you left off.  Time stamps are added as well, in case you would
// like to add a way to delete old conversations to reduce memory usage.
// In practice this has run for a month without any pruning and never 
// consumed more than 10MB or so for the node process.
//
// This API was converted from Ruby to Javascript for NodeJS.
// Origin: v0.0.3 of https://github.com/gabrielecirulli/cleverbot-api
//
// Not to be re-distributed for profit, or sold. Make it free, or die.
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
//
// This software is best viewed with Sublime Text http://www.sublimetext.com
//
// ASCII GEN http://patorjk.com/software/taag/#p=display&f=Colossal&t=STALKBOT
//------------------------------------------------------------------------------

var http        = require('http');
var querystring = require('querystring');
var crypto      = require('crypto');
var Bot         = require('ttapi');
// FIGURE OUT YOUR AUTH, USERID, ROOMID with this tool: 
// http://alaingilbert.github.io/Turntable-API/bookmarklet.html
var AUTH    = 'xxxxxxxxxxxxxxxxxxxxxxxx';
var USERID  = 'xxxxxxxxxxxxxxxxxxxxxxxx';
var ROOMID  = 'xxxxxxxxxxxxxxxxxxxxxxxx';
var BOTNAME = 'Clever';
var ADMIN   = 'xxxxxxxxxxxxxxxxxxxxxxxx';

//Cleverbot stuff
var version = "v1.0.0";
var clever_result = {};

// Create a new instance of the Bot, and connect to TT.FM!
var bot = new Bot(AUTH, USERID, ROOMID);

// set this to 'true' to see lots and LOTS of debug data :-/
bot.debug = false;

// 8888888b.  8888888888        d8888 8888888b. Y88b   d88P 
// 888   Y88b 888              d88888 888  "Y88b Y88b d88P  
// 888    888 888             d88P888 888    888  Y88o88P   
// 888   d88P 8888888        d88P 888 888    888   Y888P    
// 8888888P"  888           d88P  888 888    888    888     
// 888 T88b   888          d88P   888 888    888    888     
// 888  T88b  888         d8888888888 888  .d88P    888     
// 888   T88b 8888888888 d88P     888 8888888P"     888    
bot.on('ready', function () {
  console.log("[ " + BOTNAME + " " + version + " is READY FREDDY! ] ");
});

//  .d8888b.  8888888b.  8888888888        d8888 888    d8P  
// d88P  Y88b 888   Y88b 888              d88888 888   d8P   
// Y88b.      888    888 888             d88P888 888  d8P    
//  "Y888b.   888   d88P 8888888        d88P 888 888d88K     
//     "Y88b. 8888888P"  888           d88P  888 8888888b    
//       "888 888        888          d88P   888 888  Y88b   
// Y88b  d88P 888        888         d8888888888 888   Y88b  
//  "Y8888P"  888        8888888888 d88P     888 888    Y88b 
bot.on('speak', function(data) {
  //log chat to the console
  console.log(data.name + ': ' + data.text);
  data.text = data.text.trim(); //Get rid of any surrounding whitespace
});

// 8888888b.  888b     d888 888b     d888 8888888888 8888888b.  
// 888   Y88b 8888b   d8888 8888b   d8888 888        888  "Y88b 
// 888    888 88888b.d88888 88888b.d88888 888        888    888 
// 888   d88P 888Y88888P888 888Y88888P888 8888888    888    888 
// 8888888P"  888 Y888P 888 888 Y888P 888 888        888    888 
// 888        888  Y8P  888 888  Y8P  888 888        888    888 
// 888        888   "   888 888   "   888 888        888  .d88P 
// 888        888       888 888       888 8888888888 8888888P"  
bot.on('pmmed', function(data) {
  bot.getProfile(data.senderid, function(data2) {
    if(data2.success) {
      var sender = data2.name;
      cleverbot(data, sender);
    }
  });
});

//  .d8888b.  888      8888888888 888     888 8888888888 8888888b.  888888b.    .d88888b. 88888888888 
// d88P  Y88b 888      888        888     888 888        888   Y88b 888  "88b  d88P" "Y88b    888     
// 888    888 888      888        888     888 888        888    888 888  .88P  888     888    888     
// 888        888      8888888    Y88b   d88P 8888888    888   d88P 8888888K.  888     888    888     
// 888        888      888         Y88b d88P  888        8888888P"  888  "Y88b 888     888    888     
// 888    888 888      888          Y88o88P   888        888 T88b   888    888 888     888    888     
// Y88b  d88P 888      888           Y888P    888        888  T88b  888   d88P Y88b. .d88P    888     
//  "Y8888P"  88888888 8888888888     Y8P     8888888888 888   T88b 8888888P"   "Y88888P"     888     
function cleverbot (data, sender) {
  var thought = data.text.trim();
  var userid = data.senderid;
  console.log("[QUE]: "+ sender + " [ " + thought + " ]");

  // Build the post string from an object
  var post_data = querystring.stringify({
    'start': 'y',
    'icognoid': 'wsf',
    'fno': '0',
    'sub': 'Say',
    'islearning': '1',
    'cleanslate': 'false',
    'stimulus': thought
    //'icognocheck':'4224969d7d1662220aa6a6c2182334fa'
    // possible to hardcode this, but since we can
    // we will calculate it below...
  });
  var substr = post_data.substr(9, 20);
  //console.log("SUBSTR: " + substr);
  var md5_hash = crypto.createHash('md5').update(substr).digest("hex");
  //console.log("MD5_HASH: " + md5_hash);
  post_data = post_data + "&" + querystring.stringify({ 'icognocheck': md5_hash });
  post_data = post_data + "&" + querystring.stringify(clever_result);

  // An object of options to indicate where to post to
  var post_options = {
    host: 'www.cleverbot.com',
    port: '80',
    path: '/webservicemin',
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      'connection': 'keep-alive',
      'Content-Length': post_data.length
    }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
    var response = [];
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      //console.log('Response: ' + chunk);
      response += chunk;
    });
    res.on('end', function(chunk) {
      // Important! If the Cleverbot API goes down, this try/catch block 
      // will protect your bot from crashing when someone PM's the bot
      try{
        response = response.split('\r');
        console.log("[ANS]: " + sender + " [ " + response[16].replace(/cleverbot/gi, BOTNAME) + " ]");
        bot.pm(response[16].replace(/cleverbot/gi, BOTNAME), userid);
        if (typeof clever_result[userid] === "undefined") clever_result[userid] = {};
        clever_result[userid].sessionid = response[1];
        clever_result[userid].logurl = response[2];
        clever_result[userid].vText8 = response[3];
        clever_result[userid].vText7 = response[4];
        clever_result[userid].vText6 = response[5];
        clever_result[userid].vText5 = response[6];
        clever_result[userid].vText4 = response[7];
        clever_result[userid].vText3 = response[8];
        clever_result[userid].vText2 = response[9];
        clever_result[userid].prevref = response[10];
        // skip response[11]
        clever_result[userid].emotionalhistory = response[12];
        clever_result[userid].ttsLocMP3 = response[13];
        clever_result[userid].ttsLocTXT = response[14];
        clever_result[userid].ttsLocTXT3 = response[15];
        clever_result[userid].ttsText = response[16];
        clever_result[userid].lineRef = response[17];
        clever_result[userid].lineURL = response[18];
        clever_result[userid].linePOST = response[19];
        clever_result[userid].lineChoices = response[20];
        clever_result[userid].lineChoicesAbbrev = response[21];
        clever_result[userid].typingData = response[22];
        clever_result[userid].divert = response[23];
        clever_result[userid].lastseen = Date.now(); // timestamp so we can prune these after a while
      } 
      catch(err) {
        Log('[ CLEVERBOT RESPONSE ERROR ]:' + err);
      }
    });
  }).on('error', function(e) {
    console.log("[ CLEVERBOT ERROR ]: " + e.message);
  });

  //console.log("POST_DATA: " + post_data);
  // post the data
  post_req.write(post_data);
  post_req.end();
}
