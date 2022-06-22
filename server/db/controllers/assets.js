const Assets = require('../models/assets.js');



// This is where I will house my CRUD functions to my DB

// Gets all of the entries from the database whose values aren't 0
exports.getAll = async () => {
  const data = await Assets.find({ amount : { $ne: 0}});
  return data;
}

exports.addToDb = async (input) => {
  // This updates the input based on the name of the asset, like 'bitcoin' or 'ethereum'
  // If it doesn't exist, it creates a new entry for this asset
  const data = await Assets.findOneAndUpdate({name: input.name}, {...input}, {new: true, upsert: true});

  // Returns the updated input object. Might be unneccesary
  return data;
}


// Don't actually delete from db, just set the amount to zero and filter out in frontend
exports.deleteFromDb = async (input) => {
  const data = await Assets.findOneAndUpdate({name: input}, {amount: 0}, {new: true});
  return data;
}



// Instead of deleting from the db, let's just update the amount to be zero and filter
// that out on the front end. This way I can still keep my urls and such
// exports.deleteFromDb = async (input) => {
//   // input will be the name of the thing we want to delete
//   const data = await Assets.findOneAndDelete({name: input});

//   return data;
// }
