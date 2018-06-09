const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    // required: true,
    max: 40
  },
  page: [
    {
      type1: String,
      type2: String,
      text: [String],
      img: [{
        url: String,
        name: String,
        hash: String
      }],
      movie: [String]
    }
  ],
  detail: {
    nav: {
      isuse: Boolean,
      numofbtn: Number,
      btn: [
        {
          src: String,
          pageidx: Number
        }
      ]
    },
    backmusic: {
      isuse: Boolean,
      src : String,
      isrepeated: Boolean
    },
    scroll : {
      isuse: Boolean,
      typeofscroll : Number
    },
    isopen: {
      isuse: Boolean
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Card = mongoose.model('cards', CardSchema);
