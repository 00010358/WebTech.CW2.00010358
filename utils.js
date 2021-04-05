const path = require('path')

class Validator {
    isValid(data) {
      if (data.name.trim() === "" || data.surname.trim() === "" || data.dob.trim() === "" || data.position.trim() === "" || data.about.trim() === "") {
        return false;
      } else {
        return true;
      }
    }
}


function id () {
	return '_' + Math.random().toString(36).substr(2, 9);
}


const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)

const DB = `${ rootFolder }/data/employees.json`



module.exports.Validator = Validator;
module.exports.DB = DB;
module.exports.id = id;