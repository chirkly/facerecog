# Magic Camera
This is a proof of concept React app that will highlight the faces present in any image URL entered by a registered user. Users are also shown thier rank based on the number of images submitted over time.

A custom API (facerecog-api) built in Node.js is used to manage comunication between the app and both the Clarifai Face Detection API as well as with a PostgreSQL database used for managing user login and rank information. 

A working version of the app can be seen at: https://face-recogni.herokuapp.com/

# Dependencies
This code is already set up to connect to a hosted version of the facerecog-api, however the code for this API can also be accessed at https://github.com/chirkly/facerecog-api

A PostgreSQL database will also need to be establed with the following tables and columns:
  - users
    - id - smallint (primary Key)
    - name - varchar(100)
    - email - text (Unique Key)
    - entries - bigint
    - joined - timestamp
  - login
    - id - smallint (primary Key)
    - hash - varchar(100)
    - email - text (Unique Key)

A free Clarifai API key will also be needed, and can be obtained at https://www.clarifai.com.

All other dependencies are in the package.json file and can be installed through npm.
