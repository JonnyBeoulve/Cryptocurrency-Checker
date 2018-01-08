# Cryptocurrency Checker
This is an in-development React Redux app that will display trending cryptocurrencies and provide pricing information. Users will be able to register and signin to follow and track cryptocurrencies of their choice. Files are served by a back-end built in Node/Express, with a MongoDB database that stores a hashed user login and cryptocurrency preferences.

## How to Use
1. From terminal, install node dependencies by typing 'npm install' in the root folder.
2. Type 'npm start' in the root folder to initiate the program.
3. You can interface with the program by visiting 'http://localhost:5000'.

## Programming
* Axios (https://www.npmjs.com/package/axios)
* BCrypt (https://www.npmjs.com/package/bcrypt)
* Body Parser (https://www.npmjs.com/package/body-parser)
* Connect Mongo (https://www.npmjs.com/package/connect-mongo)
* Express (https://www.npmjs.com/package/express)
* Express Session (https://www.npmjs.com/package/express-session)
* MongoDB (https://www.npmjs.com/package/mongodb)
* Mongoose (https://www.npmjs.com/package/mongoose)
* Morgan (https://www.npmjs.com/package/morgan)
* Path (https://www.npmjs.com/package/path)
* React (https://www.npmjs.com/package/react)
* React Bootstrap (https://www.npmjs.com/package/react-bootstrap)
* React Redux (https://www.npmjs.com/package/react-redux)
* Request (https://www.npmjs.com/package/request)
* Validator (https://www.npmjs.com/package/validator)

## Note
This is an in-development app that will soon be hosted on Heroku. The front-end and back-end are working locally.

Features yet to be implemented:

* Session storing after login to avoid losing session if the page is reloaded.
* Links on each crypto to load a full detail container.
* A follow/unfollow button in the full detail container of each crypto that allows users to follow/unfollow that crypto.
* A button to show only the cryptos that the user is following.
