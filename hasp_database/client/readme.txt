in folder client:
   npm install -g create-react-app
to check installed global modules:
   npm list -g --depth 0

Creating app:
   create-react-app hasp-react-web
in folder hasp-react-web:
   npm start

https://www.youtube.com/watch?v=gGlTr_ruiW8&list=PLwoh6bBAszPrES-EOajos_E9gvRbL27wz&index=120
installing bootstrap
  download bootstrap "Compiled CSS and JS", then in hasp-react-web in "public" folder create folders "css" and "js"
  move files "bootstrap.min.js" into "js" folder, and "bootstrap.min.css" into "css" folder.
Download the compressed, production jQuery 3.4.1 "jquery-3.3.1.min.js" and move it into folder "js".
Download file "tether.min.js" and move it into "js" folder.
Then include all these files in "index.html".
Then install react developer tool for google crome.

creating folders
https://www.youtube.com/watch?v=KIC7qqJKEGk&list=PLwoh6bBAszPrES-EOajos_E9gvRbL27wz&index=123
installing module t odeal with web requests (apis)
   npm install --save whatwg-fetch
(error Access to fetch has been blocked by CORS policy)
trying to yse axios:
   npm install --save axios
same mistake.

TO FIX PROBLEM IN FILE server.js (folder "server")
   npm install cors
https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
var express = require('express');
// Import the library:
var cors = require('cors');
var app = express();
// Then use it before your routes are set up:
app.use(cors());
