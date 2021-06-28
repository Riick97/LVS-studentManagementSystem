Image


#What is LVS
LVS is a very simple student management system 
It offers the posiblity for students and teachers to interact with eachother
it has a simple login system on which three types of users can log into


#Technology
This app was made using HTML, CSS, and Vanilla JS
The backend is implemented using Node JS with Express.
The database was implemented with MongoDB


#Disclaimer
This is not a complete application and should not be judged as one.
This was made as a year project and can serve as reference for other students looking for examples.
I encourage you to improve on it

#Steps to start app

#1 Install dependencies
npm install

#1 Configure .env
set MongoDB database uri (Local or Cloud)
set random accessToken and refreshToken secret

#2 Start server
npm start

#3 Start authorization server
npm startAuth

#5 Create a new administrator user(Make sure to have "Rest client" VS code extension)
Go intro requests.rest and click on send request under ADD Admin header
You can also run a script using axios to add an admin

#6 Login and checkout the app


START SERVER with npm start
START autServer with npm run startAut