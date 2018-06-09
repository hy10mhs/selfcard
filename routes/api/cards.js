const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const isEmpty = require('../../validation/is-empty');

// Load Input Validation
const validateCardInput = require('../../validation/card');

// Load Card Model
const Card = require('../../models/Card');
// Load User Model
const User = require('../../models/User');

// @route   GET api/cards/test
// @desc    Tests card route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Cards Works"}));

// @route   GET api/cards
// @desc    Get current user's cards
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Card.find( { user: req.user.id })
      .populate('user', 'name')
      .then(cards => {
        if(isEmpty(cards)) {
          errors.nocards = 'There are no cards for this user';
          return res.status(404).json(errors);
        }
        return res.json(cards);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/cards/handle/:handle
// @desc    Get card by handle
// @access  Public
router.get(
  '/handle/:handle',
  (req, res) => {
    const errors = {};

    Card.findOne( { handle: req.params.handle })
      .populate('user', 'name')
      .then(card => {
        if(!card) {
          errors.nocard = 'There is no card for this handle';
          return res.status(404).json(errors);
        }
        return res.json(card);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/cards
// @desc    CREATE or EDIT current user's card (except page)
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let newCard = req.body;
    const { errors, isValid } = validateCardInput(req.body);

    // Check Validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    // const cardFields = {};
    // cardFields.user = req.user.id;
    // if(req.body.handle) cardFields.handle = req.body.handle;

    // cardFields.detail = {};
    // cardFields.detail.nav = {};
    // cardFields.detail.backmusic = {};
    // cardFields.detail.scroll = {};
    // cardFields.detail.isopen = {};

    // if(req.body.nav_isuse) cardFields.detail.nav.isuse = req.body.nav_isuse;
    // if(req.body.nav_numofbtn) cardFields.detail.nav.numofbtn = req.body.nav_numofbtn;
    // const btn = [];
    // const btn1 = {};
    // const btn2 = {};
    // const btn3 = {};
    // const btn4 = {};
    // const btn5 = {};
    // if(req.body.nav_btn1_src) btn1.src = req.body.nav_btn1_src;
    // if(req.body.nav_btn1_pageidx) btn1.pageidx = req.body.nav_btn1_pageidx;
    // if(req.body.nav_btn2_src) btn2.src = req.body.nav_btn2_src;
    // if(req.body.nav_btn2_pageidx) btn2.pageidx = req.body.nav_btn2_pageidx;
    // if(req.body.nav_btn3_src) btn3.src = req.body.nav_btn3_src;
    // if(req.body.nav_btn3_pageidx) btn3.pageidx = req.body.nav_btn3_pageidx;
    // if(req.body.nav_btn4_src) btn4.src = req.body.nav_btn4_src;
    // if(req.body.nav_btn4_pageidx) btn4.pageidx = req.body.nav_btn4_pageidx;
    // if(req.body.nav_btn5_src) btn5.src = req.body.nav_btn5_src;
    // if(req.body.nav_btn5_pageidx) btn5.pageidx = req.body.nav_btn5_pageidx;
    // btn.push(btn1,btn2,btn3,btn4,btn5);
    // cardFields.detail.nav.btn = btn;

    // if(req.body.backmusic_isuse) cardFields.detail.backmusic.isuse = req.body.backmusic_isuse;
    // if(req.body.backmusic_src) cardFields.detail.backmusic.src = req.body.backmusic_src;
    // if(req.body.backmusic_isrepeated) cardFields.detail.backmusic.isrepeated = req.body.backmusic_isrepeated;

    // if(req.body.scroll_isuse) cardFields.detail.scroll.isuse = req.body.scroll_isuse;
    // if(req.body.scroll_typeofscroll) cardFields.detail.scroll.typeofscroll = req.body.scroll_typeofscroll;

    // if(req.body.isopen_isuse) cardFields.detail.isopen.isuse = req.body.isopen_isuse;
    Card.findOne({
      handle: req.body.handle
    })
    .then(card => {
      if(card) {
        return res.status(400).json({handle: 'Card address is already used by someone'});
      } else {
        Card.findOne({
          user: req.user.id,
          handle: req.body.handle
        })
          .then(card => {
            if(card) {
              // Update
              Card.findOneAndUpdate({
                user: req.user.id,
                handle: req.body.handle
              },
              { $set: cardFields },
              { new: true})
                .then(card => res.json(card));
            } else {
              // Create
              newCard.user = req.user.id;
              console.log(newCard)
              new Card(newCard).save().then(card => res.json(card));
            }
          });
      }
    })
    .catch(err => res.json(err));
  }
);

// @route   DELETE api/cards/:handle
// @desc    DELETE current user's card by handle
// @access  Private
router.delete(
  '/:handle',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Card.deleteOne({
      user: req.user.id,
      handle: req.params.handle
    })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);


// @route   POST api/cards/page
// @desc    CREATE or EDIT current user's card page
// @access  Private
router.post(
  '/page',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get fields
    const newPage = {};
    if(req.body.type1) newPage.type1 = req.body.type1;
    if(req.body.type2) newPage.type2 = req.body.type2;

    newPage.text = [];
    newPage.img = [];
    newPage.movie = [];

    if(req.body.text) newPage.text = newPage.text.concat(req.body.text);
    if(req.body.img) newPage.img = newPage.img.concat(req.body.img);
    if(req.body.movie) newPage.movie = newPage.movie.concat(req.body.movie);

    Card.findOne({
      user: req.user.id,
      handle: req.body.handle
    })
      .then(card => {
        if(card) {
          // null idx -> add last index
          // null isedit -> add
          if(!req.body.idx) req.body.idx = card.page.length;
          if(!req.body.isedit) req.body.isedit = 0;

          card.page.splice(req.body.idx, req.body.isedit, newPage);
          card.save().then(card => res.json(card));
        }
      });
    }
);

// @route   DELETE api/cards/page/:page_id
// @desc    DELETE current user's card page by page_id
// @access  Private
router.delete(
  '/page/:page_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Card.findOne({
      user: req.user.id,
      handle: req.body.handle
    })
      .then(card => {
        // Get remove index
        const removeIndex = card.page
          .map(item => item.id)
          .indexOf(req.params.page_id);

        // Splice out of array
        card.page.splice(removeIndex, 1);

        // Save
        card.save().then(card => res.json(card));
      });
  }
);

module.exports = router;
