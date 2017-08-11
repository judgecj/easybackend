// Initializes the `users` service on path `/users`
const createService = require('feathers-mongodb');
const hooks = require('./users.hooks');
const filters = require('./users.filters');
const createModel = require('../../models/user.model');
 const randtoken = require('rand-token');
  const nodemailer = require('nodemailer');
module.exports = function () {
  const app = this;
  const UserModel = createModel(app);
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { 
     name: 'users',
     UserModel,
     paginate 
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  //app.get('/reset/:token', createService(options));

  // forget password router 

//    app.get('/auth/google', function(req, res,  next){


//    });
//      app.get('/auth/facebook/',   function(req, res,  next){
      
//     // The request will be redirected to Facebook for authentication, with
//     // extended permissions.
    
//      });;

         
      
     app.post('/password_reset',  function(req, res,  next){

         app.service('users').find({
              query: {
              email:req.body.email
          }
        }).then(users => {
 
               var token = randtoken.generate(300);
                var header =   req.headers.host;

               app.service('users').patch(users.data[0]._id ,{
                        eamil: req.body.email || users.data[0].email,
                        username : req.body.name|| users.data[0].name,
                        name:req.body.name|| users.data[0].name,
                        resetPasswordToken: token || users.data[0].resetPasswordToken,
                        resetPasswordExpires :Date.now() + 3600000 || users.data[0].resetPasswordExpires,
                       
              }).then(function(){
                  console.log(users);
                   endmail(users,token, header);
                   res.json(users);
              }); 
        }) 
           //    console.log("password", users.data[0].email)
                // app.service('users').patch({
                //         eamil: req.body.email || users.data[0].email,
                //         username :req.body.username  || users.data[0].username,
                //         name:req.body.name|| users.data[0].name,
                //         resetPasswordToken: token || users.data[0].resetPasswordToken,
                //         resetPasswordExpires :Date.now() + 3600000 || users.data[0].resetPasswordExpires,
                       
                //     })passwordset
                // .then(users => console.log(users));
            // app.service('users').patch(users.data[0]._id, {
            //            eamil: req.body.email || users.data[0].email,
            //             username :req.body.username  || users.data[0].username,
            //             name:req.body.name|| users.data[0].name,
            //             resetPasswordToken: token || users.data[0].resetPasswordToken,
            //             resetPasswordExpires :Date.now() + 3600000 || users.data[0].resetPasswordExpires,
            // }, params).then(users => console.log(users)
                // user.save(function (err, user) {
                //     if (err) {
                //         res.status(500).send(err)
                //     }
                //      endmail(user, header);
                //     res.send(user);
                // });
               
        

            // console.log( req.body.email );
            //    var token = randtoken.generate(300);
            //     var header =   req.headers.host;
            //    console.log( token,header,users )
            //     const app = req.app;
                app.service('users');
        //   createModel.findOne({ email: req.body.email },function (err, user)  {
        //      console.log( user );
        //     if(err) throw err ;
        //     if(!user){
        //      console.log("no users found")
        //     }
            //   console.log(user.password);
            //   user.eamil = req.body.email || user.email;
            //     user.username = req.body.username  || user.username;
            //     user.name = req.body.name|| user.name;
            //     user.resetPasswordToken = token || user.resetPasswordToken;
            //     user. resetPasswordExpires = Date.now() + 3600000 || user. resetPasswordExpires;
            //     user.save(function (err, user) {
            //         if (err) {
            //             res.status(500).send(err)
            //         }
            //          endmail(user, header);
            //         res.send(user);user
            //     });
            // });  
       });

        // email method 

         function endmail(users,token, header)  {
             console.log("gmail", users)
            console.log("judge love",users, header);
          
                    var transporter = nodemailer.createTransport({
                    service: 'gmail',
                        auth: {
                            user: 'judgechuks@gmail.com',
                            pass: 'Chukwuka1'
                        }
                    });
                    header ="localhost:3030";
                     console.log(header)
                    var mailOptions = {
                        from: 'obirijejohn@gmailcom',
                        to: 'judgechuks@gmail.com',
                        subject: 'Sending Email using Node.js',
                        text: 'That was easy!',
                        html: '<div style="background-color:black;color:white;padding:20px;">' 
                        + 'http://' + header +'/reset/'+ token +  '</div> '
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                   });
              
      }

     // recoverde password email

        app.get('/reset/:token', function(req, res) {
       
             app.service('users').find({
              query: {
              resetPasswordToken:req.params.token
          }
         }).then(users => {
            res.redirect("/passwordset"+ '?token= ' +users.data[0].resetPasswordToken)
            
         })    
      });

      app.post('/passwordset',  function(req, res){
         console.log("judge gujrftuj",req.params.token) 
          res.json({magege:"dgbsdbngushkdf"})
      })

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  mongoClient.then(db => {
    service.Model = db.collection('users');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
