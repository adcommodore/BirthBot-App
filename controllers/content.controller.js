const Content = require('../models/content.model');

module.exports = {

    // @description create content
    // @route POST /content/
    // @access Private

    createContent: (req, res) => {
        Content.create(req.body)
            .then((newContent) => {
                console.log(newContent);
                res.json(newContent);
            })
    },

    // @description find one piece of content
    // @route GET /content/:id
    // @access Private

    findContent: (req, res) => {
        Content.findOne({_id: req.params.id})
            .then((content) => {
                console.log(content);
                res.json(content);
            })
    },

    // @description find all content
    // @route GET /content/
    // @access Private

    findAllContent: (req, res) => {
        Content.find()
            .then((content) => {
                console.log(content);
                res.json(content);
            })
    },


    // @description update content
    // @route PUT /content/:id
    // @access Private

    updateContent: (req, res) => {
        Content.findOneAndUpdate({_id: req.params.id}, {
            index: req.body.index,
            gestationalDay: req.body.gestationalDay,
            body: req.body.body
        }, {
            new: true,
            runValidators: true,
        })
            .then((updatedContent) => {
                console.log(updatedContent);
                res.json(updatedContent);
            })
    }
}
