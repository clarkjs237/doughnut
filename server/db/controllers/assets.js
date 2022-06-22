const Assets = require('../models/assets.js');



// This is where I will house my CRUD functions

exports.getAll = () => {
  // console.log('i am in controllers')
  // const data = await Assets.find({});
  // console.log(data)
  // return data;
  return Assets.find({});
}

exports.addToDb = (input) => {
  console.log(input);
  // input is the object we want to add to the db

  // return Rsvp.findOneAndUpdate(
  //   {
  //     name: input.name,
  //     class: input.class,
  //     curr: input.currPrice,
  //   }, { $set: input }, { upsert: true }
  // )
  // return Assets.findOneAndUpdate(input, { $set: input}, {upsert: true});

  return Assets.findOneAndUpdate(input, { $set: input}, {upsert: true});

}