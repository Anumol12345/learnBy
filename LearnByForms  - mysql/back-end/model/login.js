const db = require('../util/db');

module.exports = class ModelData {
    constructor(username ,email, password) {
       
     this.username = username;
     this.email = email;
     this.password = password;
    }
    
  SelectUser() {
      return db.execute('SELECT * FROM user_data WHERE email ="'+this.email+'"');
  }
  SaveUser() {
        //var create = db.execute("CREATE TABLE user_data (username VARCHAR(255), email VARCHAR(255) , password VARCHAR(255))");
      
        return db.execute(
            'INSERT INTO user_data(username,email,password) VALUES (?, ?, ?)',
            [ this.username , this.email ,this.password ]
          );
  }
  UpdateUser(name , email){
      var sql = "UPDATE user_data SET username =?   WHERE email='"+email+"' ";
      return db.query(sql, [name]);

        // return db.execute(
        //   'UPDATE  profile_data SET name = "'+name+'"  email ="'+email+'" , location="'+location+'", role="'+role+'", about="'+about+'"   WHERE email ="'+email+'" ');
  }


  SelectSession(userid){
      return db.execute(
            'SELECT * FROM session_data WHERE userid ="'+userid+'"');
  }
  SaveSession(userid , sessionkey){
      return db.execute(
            'INSERT INTO session_data(userid,sessionkey) VALUES (?, ?)',
            [ userid,sessionkey ]
          );
  }
  DeleteSession(email){
      var sql ="DELETE FROM session_data WHERE userid='"+email+"' " ;
      return db.query(sql);
  }


  SelectProfile(email) {
        return db.execute('SELECT * FROM profile_data WHERE email ="'+email+'"');
  }
  SaveProfile(name,email,location ,role,about,image){
        return db.execute(
          'INSERT INTO profile_data(name , email ,location,role, about,image) VALUES (?, ?, ? ,?,?,?)',
          [ name , email ,location,role, about ,image]
        );
  }
  UpdateProfile(name,email,location ,role,about,image){
      var sql = "UPDATE profile_data SET name =? , email =? , location =? , role =?,about =? ,image=?  WHERE email='"+email+"' ";
      return db.query(sql, [name,email,location ,role,about,image]);

        // return db.execute(
        //   'UPDATE  profile_data SET name = "'+name+'"  email ="'+email+'" , location="'+location+'", role="'+role+'", about="'+about+'"   WHERE email ="'+email+'" ');
  }
    

  SelectProfileLink(email) {
      return db.execute('SELECT * FROM profile_links WHERE email ="'+email+'"');
  }
  SaveProfileLink(email,links){
      return db.execute(
        'INSERT INTO profile_links(email ,links) VALUES (?, ?)',
        [email,links]
      );
  }
  UpdateProfileLink(email,links){
    var sql = "UPDATE profile_links  SET   links ='"+JSON.stringify(links)+"'    WHERE email='"+email+"' ";
    console.log(JSON.stringify(links));
    return db.query(sql);

      // return db.execute(
      //   'UPDATE  profile_data SET name = "'+name+'"  email ="'+email+'" , location="'+location+'", role="'+role+'", about="'+about+'"   WHERE email ="'+email+'" ');
  }
}
