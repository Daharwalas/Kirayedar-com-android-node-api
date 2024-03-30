const express = require('express');
const auth = require('../middleware/user_jwt');

const Property = require('../models/Property');

const router = express.Router();

// desc    Create new property task
// method POST
router.post('/', auth, async (req, res, next) => {
    try {
        const property = await Property.create({ title: req.body.title, city: req.body.city, user: req.user.id, locality :req.body.locality, price : req.body.price, imageUrl: req.body.imageUrl,description: req.body.description,booked: req.body.booked});
        if(!property) {
            return res.status(400).json({
                success: false,
                msg: 'Something went wrong'
            });
        }

        res.status(200).json({
            success: true,
            property: property,
            msg: 'Successfully created.'
        });
    } catch (error) {
        next(error);
    }
});


//desc   Fetch all property
//mehod  GET
router.get('/', auth, async(req, res, next) => {
    try {
        const property = await Property.find({user: req.user.id, booked: false});

        if(!property) {
            return res.status(400).json({ success: false, msg: 'Something error happened'});
        }

        res.status(200).json({ success: true, count: property.length, propertys: property, msg: 'Successfully fetched'})
    } catch (error) {
        next(error);
    }
});




//desc   Fetch all propertys of finished: true
//mehod  GET
router.get('/booked', auth, async(req, res, next) => {
    try {
        const property = await Property.find({user: req.user.id, booked: true});

        if(!property) {
            return res.status(400).json({ success: false, msg: 'Something error happened'});
        }

        res.status(200).json({ success: true, count: property.length, propertys: property, msg: 'Successfully fetched'})
    } catch (error) {
        next(error);
    }
});

// get properties in explore tab random
router.get('/explore', auth, async(req, res, next) => {
    try {
        const property = await Property.find({booked:false}).limit(15);

        if(!property) {
            return res.status(400).json({ success: false, msg: 'Something error happened'});
        }

        res.status(200).json({ success: true, count: property.length, propertys: property, msg: 'Successfully fetched'})
    } catch (error) {
        next(error);
    }
});

// desc   Update a property
// method PUT
router.put('/:id', async (req, res, next) => {
    try {
        let property = await Property.findById(req.params.id);
        if(!property) {
            return res.status(400).json({ success: false, msg: 'Property not exits' });
        }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true,property: property, msg: 'Successfully updated' });
        
    } catch (error) {
        next(error);
    }
});

// desc Delete a task property
// method Delete
router.delete('/:id', async (req, res, next) => {
    try {
        let property = await Property.findById(req.params.id);
        if(!property) {
            return res.status(400).json({ success: false, msg: 'Property not exits' });
        }
    
        property = await Property.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
            success: true, msg: 'Successfully Deleted property.'
        });
    } catch (error) {
        next(error);
    }
});
module.exports = router;
