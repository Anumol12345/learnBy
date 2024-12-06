const ModelData = require('../model/home');

exports.home = async(req, res, next) => {
      console.log(req.body.id)
       const home_data =await ModelData.select();
       console.log(home_data);
        res.send(home_data[0])
   };;
exports.homedata = async(req, res, next) => {
  
     const home_data1 =await ModelData.selectAll();
     console.log(home_data1);
      res.send(home_data1[0])
 };;
 exports.reviewdata = async(req, res, next) => {
  
     const home_data1 =await ModelData.SelectProfile();
     console.log(home_data1);
      res.send(home_data1[0])
 };;
 exports.reviewData = async(req, res, next) => {
     const sendData =JSON.parse(req.body.inputObjs)[0];
     console.log(sendData);
     const home_data1 =await ModelData.SelectRevProfile(sendData.id);
     const IsProfileLink = await  ModelData.SelectProfileLink(home_data1[0][0].email);
     console.log(IsProfileLink[0]);
     if(IsProfileLink[0]){
          res.send({profile:home_data1[0][0] ,links:IsProfileLink[0][0]})
     }
     else{
          res.send({profile:home_data1[0][0] })  
     }
      
 };;