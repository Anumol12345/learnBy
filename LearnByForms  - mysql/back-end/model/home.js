const db = require('../util/db');

exports.select =function() {
        return db.execute(
            'SELECT * FROM home_data '
          );
      }
exports.selectAll =function() {
    return db.execute(
        'SELECT * FROM home_urls '
        );
}
exports.SelectProfile = ()=> {
    return db.execute('SELECT * FROM profile_data WHERE role ="Reviewer"');
}
exports.SelectRevProfile = (id)=> {
  return db.execute('SELECT * FROM profile_data WHERE id ="'+id+'"');
}
exports.SelectProfileLink =(email)=> {
  return db.execute('SELECT * FROM profile_links WHERE email ="'+email+'"');
}
