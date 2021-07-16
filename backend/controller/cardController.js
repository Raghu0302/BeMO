const Card = require("../model/card");

exports.getAllCards = async(req,res, next) => {
    try{
        const cards = await Card.find();
        if(!cards){
            const error = new Error('cannot get all cards');
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json(({
            success: true, data: cards
        }))
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
    }
}

exports.getAllCardsById = async(req,res, next) => {
    try{
        const cards = await Card.find({coloum_id: req.body.coloum_id});
        if(!cards){
            const error = new Error('cannot get cards for this column');
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json(({
            success: true, data: cards
        }))
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
    }
}

exports.createCard = async(req, res, next) => {
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            const errors = new Error()
            errors.message = error.errors[0].msg
            errors.statusCode = 400
            throw errors;
        }
        await Card.create(req.body).then((card) => {
            return res.status(200).json({
                success: tru, data: column
            })
        })
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    }
}

exports.editCard = async (res, req, next) =>{
    try{
        const error = validationResult(req);
        if(!error.isEmpty()){
            const errors = new Error()
            errors.message = error.errors[0].msg
            errors.statusCode = 400
            throw errors;
        }
        await Card.findByIdAndUpdate(req.body._id, {$set: req.body.update}).then((card) => {
            return res.status(200).json({
                success: true, data: card
            })
        })
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    }
}

exports.cardAction = async (req, res, next) => {
    // original_card_id, new_position, old_position, other_card_id,old_column_id,new_column_id
    try{
        // upward and downward action
        if(req.body.old_column_id===req.body.new_column_id){
                await Card.findbyIdAndUpdate(req.body.other_card_id, {$set: {position:req.body.old_position} });
                await Card.findbyIdAndUpdate(req.body.original_card_id, {$set:{position: req.body.new_position}});
                return res.status(200).json({
                    success: true
                })
        } else {
            await Card.updateMany({column_id: req.body.new_column_id,position:{$gte:req.body.new_position}},{$inc:{position:+1}})
            await Card.findbyIdAndUpdate(req.body.original_card_id, {$set: {position:req.body.new_position,column_id:req.body.new_column_id}});
            await Card.updateMany({column_id: req.body.old_column_id,position:{$gt:req.body.old_position}},{$inc:{position:-1}})
           
        }
    } catch{

    }
}