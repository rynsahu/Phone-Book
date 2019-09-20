const express = require('express');
const router = express.Router();
const { Contact, validate } = require('../models/contact');

router.get('/', async (req, res) => {
    const contacts = await Contact.find().select('-__v').sort('name');
    res.send(contacts);
});

router.post('/', async (req, res) => {
    let { error }  = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    let contact = await Contact.findOne({ phone: req.body.phone });
    if( contact ) return res.status(400).send('Contact already exists!');

    contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        isFavorite: req.body.isFavorite
    });
    await contact.save();

    res.send(contact);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    const contact = await Contact.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        phone: req.body.phone,
        isFavorite: req.body.isFavorite
    }, { new: true });
    if(!contact) return res.status(400).send('Contact was not found with the given Id.');

    res.send(contact);
});

router.delete('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if(!contact) return res.status(400).send('Contact was not found with the given Id.');

    res.send(contact);
});

module.exports = router;
