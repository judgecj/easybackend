module.exports = function (app) {
  
  const  mongose   = require('mongoose');
  const users = new  mongose.Schema({
  
   
   
    roles: { type: String },
    phone: { type: String },
    username: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires : String,
    email:{type:String, unique:true, index:{unique :true}},
    username: { type: String, required:true, index: {unique :true} },
    password: { type: String, select:false},

    

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return  mongose.model('users', users);
};
