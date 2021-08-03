const express = require('express');
const router = express.Router();
const model = require('../models/schema');


//route for get request - promise is returned
router.get('/', (req, res) => {
    model.find()
        .then(data => {
            res.json(data);
        })
        .catch(err =>{
            res.json({msg : 'Error while handling the GET request'});
        })
});


//route for post request - promise is returned
router.post('/', (req, res) => {
    const new_entry = new model({
        itemID: req.body.itemID,
        item: req.body.item,
        description: req.body.description,
        price: req.body.price
    })

    new_entry.save()
        .then(data => {
            res.json({msg: 'Data successfully uploaded.'});
        })
        .catch(err => {
            res.json({msg: 'Error while handling the POST request'});
        })
});


//get specific element by ID
router.get('/:itemID', (req, res) =>{
    model.find({itemID : req.params.itemID})
        .then(data => {
            if(data.length === 0){
                res.json({msg: `Not item with the ID ${req.params.itemID}`}); 
            }
            else{
                res.json(data);
            }
        })
        .catch(err => {
            res.json({msg: 'Error while fetching the data from database.'}); 
        })
})

//delete a specific post
router.delete('/:itemID', async (req, res) => {
    try{
        const removed = await model.deleteOne({itemID: req.params.itemID})
        res.json({msg: `Removed item with ID ${req.params.itemID}`, itemRemoved: removed});
    }
    catch (err) {
        res.json({msg: `No item with the ID ${req.params.itemID}`});
    }
})


//update post with a specific id
router.patch('/:itemID', async (req, res) => {
    try{
        const update = await model.updateOne({itemID: req.params.itemID}, {$set: {price: req.body.price}});
        res.json({msg: 'Updates made successfully'});
    }
    catch (err) {
        res.json({msg: `No item with the ID ${itemID}`});
    }
})



module.exports = router;