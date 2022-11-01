const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchData = require('../middleware/fetchData');
const Notes = require('../models/Notes');

router.get('/', (req, res) => {

    res.json([])
})

router.get('/fetchallnotes', fetchData, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        res.send("Internal server error");
    }
})

router.post('/addnote', fetchData, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
})

router.put('/updatenote/:id', fetchData, async (req, res) => {
    try {
        let { title, description, tag } = req.body;

        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found');
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('UnAuthorised Access');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        res.status(400).send('Internal Error Occur')
    }

})

router.delete('/deletenote/:id', fetchData, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);


        if (!note) {
            return res.status(404).send('NOt Found');
        }

        if (req.user.id != note.user.toString()) {
            return res.status(401).send('unAuthorized Access');
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({ Success: "Sucessfully Deleted", note: note })

    } catch (error) {
        return res.status(404).send('Internal server Error');
    }

})
module.exports = router