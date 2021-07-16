const Column = require('../model/column');
const {validationResult} = require('express-validator')
const Card = require('../model/card');
const {v4: uuidv4} = require('uuid');

exports.getAllColumns = async(req, res, next) => {
    try{
        const columns = await Column.find()
        if(!columns) {
            const error = new Error ('cannot get all columns')
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({success: true, data: columns})
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.createColumn = async(req, res, next) => {
    try { 
        console.log(req)
        await Column.create(req.body).then((column) => {
            return res.status(200).json({
                success: true, data: column
            })
        })
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    }
}

exports.deleteColumn = async(req, res, next) => {
    try {
        const card = await Card.deleteMany({column_id:req.body._id});
        if(!card){            
             const error = new Error('error deleting cards')
            error.statusCode = 400;
            throw error
        }
        const column = await Column.findByIdAndDelete(req.body._id)
        if(!column) {
            const error = new Error('error deleting column')
            error.statusCOde = 400;
            throw error
        }
        res.status(200).json({
            success: true, data: column
        })

    } catch (err) {
        if(!err.statusCode){
            if(!err.sttusCode){
                err.statusCode = 500;
            }
            next(err);
        }
    }
}