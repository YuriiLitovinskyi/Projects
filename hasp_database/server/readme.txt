https://www.youtube.com/watch?v=v0t42xBIYIs    (12:05) proxy

creating file server.js
then creating file
   npm init
installing express
   npm install --save express
to install all dependencies from package.json:
   npm install
to run server: 
   node server.js
or
   nodemon server
in browser:
   http://localhost:3004/hasp/
or send GET request from POSTMAN
installing body-parser (otherwise post, put requests won't be working)
   npm install --save body-parser
...........................(template saved)...............
buinding apis with database.
   npm install --save mongoose


(error Access to fetch has been blocked by CORS policy)
TO FIX PROBLEM IN FILE server.js (folder "server")
   npm install cors
https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
var express = require('express');
// Import the library:
var cors = require('cors');
var app = express();
// Then use it before your routes are set up:
app.use(cors());

we can add whitelist to cors rools, but in that case we need to add Head in request in Postman: Key: Origin; Value: http://localhost:3000