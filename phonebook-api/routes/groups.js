const express = require('express');
const router = express.Router();
const { Group, validate } = require('../models/group');
const { Contact } = require('../models/contact');

router.get('/', async (req, res) => {
    const group = await Group.find().select('-__v').sort('name');
    res.send(group);
});

router.post('/', async (req, res) => {
    let { error }  = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    let group = await Group.findOne({ name: req.body.name });
    if( group ) return res.status(400).send('Group already exists!');

    group = new Group({
        name: req.body.name
    });
    
    group = await updateGroup(req.body.contactsId, group, Contact, 'contacts');
    if(group.status && group.status === 400) 
        return res.status(400).send(`Contact was not found with the given Id: ${group.itemId}`);

    res.send(group);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    let group  = await Group.findById(req.params.id);
    if(!group) return res.status(400).send('Group was not found with the given Id.');

    group.name = req.body.name;
    group.contacts.splice(0, group.contacts.length);

    group = await updateGroup(req.body.contactsId, group, Contact, 'contacts');
    if(group.status && group.status === 400) 
        return res.status(400).send(`Contact was not found with the given Id: ${group.itemId}`);
    
    res.send(group);
});

router.delete('/:id', async (req, res) => {
    const group = await Group.findByIdAndRemove(req.params.id);
    if(!group) return res.status(400).send('Group was not found with the given Id.');

    res.send(group);
});

async function updateGroup(items, collection, Model, obj) {
    for(let itemId of items){
        const document = await Model.findById(itemId);
        if(!document) return { status: 400, itemId };
        
        collection[obj].push({ _id: document._id, name: document.name });
    }

    return await collection.save();
}

module.exports = router;