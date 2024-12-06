const ModelData = require('../model/login');
const tokenData = require('./token');
//var crypto = require('crypto');
// var generate_key = function() {
//     return crypto.randomBytes(4).toString('dec');
//    //return (Math.floor(100000 + Math.random() * 900000))
// };

const axios = require('axios');
const  {google}  = require('googleapis');
  const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URL = "http://localhost:4200/login"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;



exports.login = async(req, res, next) => {
    const sendData =JSON.parse(req.body.inputObjs)[0];
    console.log(req.body.id);
    const email =sendData.email
    const password =sendData.password
    
    const loginModel = new ModelData(null ,email,null);
    const usersign =await loginModel.SelectUser();
    console.log(usersign[0])

    if(!usersign[0][0]){
        res.send({error : "The User does not existed"}) 
    }
    else{
      if(usersign[0][0].password == password){

        const token =tokenData.createToken(email);
        console.log(token);

       
       
       const prof_data = await new ModelData().SelectProfile(email);
       var name ='';
       if(prof_data[0][0]){
          name = prof_data[0][0].name;
          await new ModelData().UpdateUser(name,email);

       }
       else{
        name =usersign[0][0].username;
       }
       var session = req.session;
       session.sessionkey  = token;
       session.userid  = usersign[0][0].email;
       session.username  = name;
       if(prof_data[0][0]){
        if(prof_data[0][0].image){
        session.userimg = prof_data[0][0].image
        }
       }
      
       console.log(session);
      
      
       await new ModelData().SaveSession(session.userid ,session.sessionkey );

       const resultobj={
        sessionkey :session.sessionkey,
        userid :session.userid,
        username:session.username,
        profileImage : session.userimg
        }
    
       console.log(resultobj);
       res.send(resultobj) ;
      }
      else{
        res.send({error : "Incorrect password , Please try again"})
      }
    }
};;
exports.register = async(req, res, next) => {
    const sendData =JSON.parse(req.body.inputObjs)[0];
    console.log(req.body.id);
    const username =sendData.userid
    const email =sendData.email
    const password =sendData.password

    const RegModel = new ModelData(username ,email,password);

    const useremail =await RegModel.SelectUser();
    
    console.log(useremail[0]);
    if(useremail[0][0]){
        res.send({error : "The User already existed"}) 
    }
    else{
        const result =await RegModel.SaveUser(); 
        if(result){
          const token =tokenData.createToken(email);
          console.log(token);

  
          var session = req.session;
            session.sessionkey  = token;
            session.userid  = email;
            session.username  = username;
            console.log(session);

             await new ModelData().SaveSession(session.userid ,session.sessionkey )
           
             const resultobj={
                 sessionkey :session.sessionkey,
                 userid :session.userid,
                 username:session.username,
              }
            console.log(resultobj);
            res.send(resultobj) ;
         }
         if(!result){
            res.send({error : "Something wrong"})
         }
    }
};;

exports.logout = async(req, res, next) => {
     const email = req.body.userid;
      authed = false;
      req.session.destroy();
      await new ModelData().DeleteSession(email)
      console.log(req.session);
  
      res.send({result :"success"});
    
    
};;


exports.auth = async(req, res, next) => {
    if (!authed) {
      // Generate an OAuth URL and redirect there
      const url = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: ['https://www.googleapis.com/auth/gmail.readonly',
              'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/userinfo.email']
        });
      console.log(url)
      res.send({url:url});
     } else {
      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
      gmail.users.labels.list({
          userId: 'me',
      }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const labels = res.data.labels;
          if (labels.length) {
              console.log('Labels:');
              labels.forEach((label) => {
                  console.log(`- ${label.name}`);
              });
          } else {
              console.log('No labels found.');
          }
      });
      res.send('Logged in')
  }
};;

exports.callback = async(req, res, next) => {
    const sendData =JSON.parse(req.body.inputObjs)[0];
    console.log(req.body.id);
    const code = sendData.Code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
                  {
                    headers: {
                      Authorization: `Bearer ${tokens.id_token}`,
                    },
                  }
                )
                .then(async function(result) {
                    console.log(result.data);
                    const email = result.data.email;
                    const loginModel = new ModelData(null ,email,null);
                    const usersign =await loginModel.SelectUser();

                    if(usersign[0][0]){
                      const token =tokenData.createToken(email);
                        console.log(token);  
                     
                     
                        const prof_data = await new ModelData().SelectProfile(email);
                        var name ='';
                        if(prof_data[0][0]){
                           name = prof_data[0][0].name;
                           await new ModelData().UpdateUser(name,email);
                 
                        }
                        else{
                         name =usersign[0][0].username;
                        }
                        var session = req.session;
                        session.sessionkey  = token;
                        session.userid  = usersign[0][0].email;
                        session.username  = name;
                        if(prof_data[0][0]){
                          if(prof_data[0][0].image){
                          session.userimg = prof_data[0][0].image
                          }
                         }
                       
                        console.log(session);
                       
                       
                        await new ModelData().SaveSession(session.userid ,session.sessionkey );
                 
                        const resultobj={
                          sessionkey :session.sessionkey,
                          userid :session.userid,
                          username:session.username,
                          profileImage : session.userimg
                       }
                      
                        console.log(resultobj);
                        res.send(resultobj) ;
                    }
                    else{
                      const username = result.data.name;
                      const email = result.data.email;
                      const RegModel = new ModelData(username ,email,null);

                      const result1 =await RegModel.SaveUser(); 
                      if(result1){

                        const token =tokenData.createToken(email);
                        console.log(token);
                
                        var session = req.session;
                        session.sessionkey  = token;
                        session.userid  = email;
                        session.username  = username;
                        console.log(session);
                        await new ModelData().SaveSession(session.userid ,session.sessionkey )
                       
                         
                       const resultobj={
                           sessionkey :session.sessionkey,
                           userid :session.userid,
                           username:session.username,
                           
                        }
                        console.log(resultobj);
                        res.send(resultobj) ;
                     }
                     if(!result1){
                        res.send({error : "Something wrong"})
                     }
                    }

                })
                .catch(error => {
                  throw new Error(error.message);
                });
               
                
            }
        });
    }
};;
exports.profile = async(req,res,next)=>{
  console.log(req.session);
  const token =req.body.sessionKey;
  const email =req.body.userid
 

  if (!token) {
		return res.status(401).end()
	}
try{
  const payload = tokenData.verifyToken(token);
  console.log(payload);

 const prof_data = await new ModelData().SelectProfile(email);

 const ProfileLink = await new ModelData().SelectProfileLink(email);
 console.log(prof_data[0]);
 console.log(ProfileLink[0]);
 if(ProfileLink[0]){
  res.send({profile:prof_data[0][0] ,links:ProfileLink[0][0]} );
 }
 else{
  res.send({profile:prof_data[0][0] });
 }
 
}
catch(e){
  console.log(e.name);
   if(e.name == 'TokenExpiredError'){
   //const newToken = tokenData.renewToken(email);

   res.send({error:'TokenExpired'})
   }

}
	//res.send({userId:payload.email});
}

exports.addProfile =  async(req,res,next)=>{
 const token =req.body.sessionKey;

  const sendData =JSON.parse(req.body.inputObjs)[0];
  const linkData =JSON.parse(req.body.inputObjs)[1];

  const email =sendData.email;
  const name = sendData.name
  const location =sendData.location;
  const role = sendData.roles;
  const about =sendData.about;
  const image =sendData.uploadedImage;

  console.log(linkData);

  console.log(sendData);
 
  if (!token) {
		return res.status(401).end()
	}
try{
  const payload = tokenData.verifyToken(token);
  console.log(payload);

  const IsProfile = await new ModelData().SelectProfile(email);
 
  if(IsProfile[0][0]){
    console.log(" existed")
    await new ModelData().UpdateProfile(name,email,location ,role,about,image);
  }
  else{
    console.log("not exist")
    await new ModelData().SaveProfile(name,email,location ,role,about,image);
  }
  
  const IsProfileLink = await new ModelData().SelectProfileLink(email);
  if(IsProfileLink[0][0]){
    console.log(" existed")
    await new ModelData().UpdateProfileLink(email,linkData);
  }
  else{
    console.log("not exist")
    await new ModelData().SaveProfileLink(email,linkData);
  }
 res.send({result:'profile updated'});
}
catch(e){
  console.log(e);
  if(e.name == 'TokenExpiredError'){
  //const newToken = tokenData.renewToken(email);

  res.send({error:'TokenExpired'})
  }

}
	//res.send({userId:payload.email});
}
   