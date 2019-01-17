const Model = require('../models');
const app = require('../index');
const randomColor = require('../utils/randomColor');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



exports.createUser = (req,res) => {
    let user = new Model.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role.toLowerCase(),
        avatar: 'https://ui-avatars.com/api/?size=1024&background='+randomColor()+'&color=fff&name='+req.body.name.charAt(0)+'+'+req.body.name.charAt(1)
    });

    user.save((err,user) => {
        if(err) throw (res.json({success:false}));
        console.log("register =>",user);
        app.io.sockets.emit('update');
        res.json({success:true,data:user})
    });
};

exports.user = (req,res) => {
    Model.User.findById({_id:req.params.id}, (err,response) => {
        if(err) throw (res.json({success: false}));
        app.io.sockets.emit('update');
        res.status(200).json({success:true,data:response});
    })
};

exports.userAll = (req,res) => {
    Model.User.find({},(err,response) => {
        if(err) throw (res.json({success: false}));
        app.io.sockets.emit('update');
        res.status(200).json({success:true,data:response});
    });
} ;


exports.updateInfoProfile = (req,res) => {
    Model.User.findOneAndUpdate({ _id: req.params.id }, { $set: {
            name: req.body.name,
            email: req.body.email,
            avatar: 'https://ui-avatars.com/api/?size=1024&background='+randomColor()+'&color=fff&name='+req.body.name.charAt(0)+'+'+req.body.name.charAt(1)
        } }, { new: true }, (err, response) => {
        if(err) throw res.status(500).json({success:false});
        app.io.sockets.emit('update');
        res.status(200).json({success:true,data:response});
    });
};

exports.setPassword = (req,res) => {
    Model.User.findOneAndUpdate({ _id: req.params.id }, { $set: {
            password: req.body.password,
        } }, { new: true }, (err, response) => {
        if(err) throw res.status(500).json({success:false});
        app.io.sockets.emit('update');
        res.status(200).json({success:true,data:response});
    });
};


exports.createSuperUser = (req,res) => {
    let user = new Model.User({
        name: 'Administrator',
        email: 'admin@ria.cl',
        password: 'ria2018',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?size=1024&background='+randomColor()+'&color=fff&name='+req.body.name.charAt(0)+'+'+req.body.name.charAt(1)
    });

    user.save((err,user) => {
        if(err) throw (res.json({success:false}));
        console.log("register =>",user);
        res.json({success:true,data:user})
    });
};


exports.delete = (req,res) =>{
    Model.User.remove({_id:req.params.id},(err,response) => {
        if(err){
            res.status(500).json({status:false,err:err});
        } else {
            res.status(200).json({status:true,data:response});
        }
    })
}