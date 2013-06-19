Clever
======

Clever - Copyright (C) 2013 B^Dub - dubbytt@gmail.com - Last update June 18th 2013
(subset of Chatty's 3000+ lines of code... clever "turntable.fm" bot)

A NodeJS Turntable.fm bot that interfaces with the surprisingly real
Cleverbot.com API, allowing an unlimited number of users to hold
unique conversations with your bot via PM.  The conversation history
is stored in an array so the conversation can be picked up right 
where you left off.  Time stamps are added as well, in case you would
like to add a way to delete old conversations to reduce memory usage.
In practice this has run for a month without any pruning and never 
consumed more than 10MB or so for the node process.

This API was converted from Ruby to Javascript for NodeJS.
Origin: v0.0.3 of https://github.com/gabrielecirulli/cleverbot-api

Not to be re-distributed for profit, or sold. Make it free, or die.

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

This software is best viewed with Sublime Text http://www.sublimetext.com

ASCII GEN http://patorjk.com/software/taag/#p=display&f=Colossal&t=CLEVER

This bot uses the Turntable API by Alain Gilbert here:
https://github.com/alaingilbert/Turntable-API

QUICKSTART (advanced users)
===========================
Install Node.js
Install the TTAPI
Setup your Clever.js bot AUTH, USERID, ROOMID, ADMIN, BOTNAME variables
In the directory of your bot type "node clever.js" to run the bot
