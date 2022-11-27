@google-cloud/local-auth library is using for auth.
To perform auth you need go to https://console.cloud.google.com/apis/credentials and create OAUTH client Id creadentials:
- press Create Credentials
- select OAUTH Client ID
- select Desktop app
- press create
- download JSON and paste it to src folder of this project(if file already exist just change it for a new one. If token.json file is exist also remove it before first run).
*If you update SCOPES array in auth.js file you need remove token.json file to regenerate it.