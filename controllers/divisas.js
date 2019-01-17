const Divisas = require('../models/Divisas');
const app = require('../index');

module.exports = {

    get(req,res){
        Divisas.find({},(err,response) => {
            if(err){
                res.status(500).json({status:false,err:err});
            } else {
                res.status(200).json({status:true,data:response});
            }
        })
    },

    post(req,res){
        let divisa = new Divisas({
            name: req.body.name,
            valor1: req.body.valor1,
            valor2: req.body.valor2,
            valor3: req.body.valor3,
            symbol: req.body.symbol
        });

        divisa.save((err,response) => {
            if(err){
                res.status(500).json({status:false,err:err});
            } else {
                app.io.sockets.emit('update');
                res.status(200).json({status:true,data:response});
            }
        })
    },

    put(req,res){
        console.log('llega')
        console.log(req.params.id)
        let doc = new Divisas({
            _id:req.params.id,
            name: req.body.name,
            valor1: req.body.valor1,
            valor2: req.body.valor2,
        });

        Divisas.update({_id:req.params.id},doc,(err,response) => {
            if(err){
                res.status(500).json({status:false,err:err});
            } else {
                console.log('success',response)
                app.io.sockets.emit('update');
                res.status(200).json({status:true,data:response});
            }
        })

        // // Divisas.findOneAndUpdate({ _id: req.params.id }, { $set: {
        // //         name: req.body.name,
        // //         valor1: req.body.valor1,
        // //         valor2: req.body.valor2
        // //     } }, { new: true }, (err, response) => {
        // //     if(err) throw res.status(500).json({success:false});
        // //     app.io.sockets.emit('update');
        // //     res.status(200).json({status:true,data:response});
        // // });

        // Divisas.findById({_id:req.params.id},(err,response) => {
        //     if(err){
        //         res.status(500).json({status:false,err:err});
        //     } else {
        //         response.name = req.body.name;
        //         response.valor1 = req.body.valor1;
        //         response.valor2 = req.body.valor2;
        //         response.save((error,doc) => {
        //             if(error){
        //                 res.status(500).json({status:false,err:error});
        //             } else {
        //                 console.log(doc)
        //                 console.log('success')
        //                 app.io.sockets.emit('update');
        //                 res.status(200).json({status:true,data:doc});
        //             }
        //         });
        //     }
        // })
    },

    delete(req,res){
        Divisas.remove({_id:req.params.id},(err,response) => {
            if(err){
                res.status(500).json({status:false,err:err});
            } else {
                app.io.sockets.emit('update');
                res.status(200).json({status:true,data:response});
            }
        })
    }
}