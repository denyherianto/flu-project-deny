const ObjectID = require('mongodb').ObjectID;

module.exports = (express, db, dbCol) => {
  const router = express.Router();

  router.get('/user', function (_, response) {
    db.collection(dbCol).find().toArray((err, result) => {
      if (err) return console.log(err)
      response.json({message: 'data retrieved', data: result});
    });
  });

  router.get('/user/:id', function (request, response) {
    console.log('request.params.id', request.params.id);
    db.collection(dbCol).findOne({_id: ObjectID(request.params.id)}, (err, result) => {
      if (err) throw err;
      response.json({message: 'data retrieved', data: result});
    });
  });

  router.post('/user', function (request, response) {
    db.collection(dbCol).save(request.body, (err) => {
      if (err) return console.log(err);
      response.json({message: 'data saved', data: request.body});
    });
  });

  router.patch('/user/:id', function (request, response) {
    db.collection(dbCol).updateOne({_id: ObjectID(request.params.id)}, { $set: request.body }, (err) => {
      if (err) return console.log(err);
      response.json({message: 'data updated', data: request.body});
    });
  });

  router.delete('/user/:id', function (request, response) {
    db.collection(dbCol).deleteOne({_id: ObjectID(request.params.id)}, function(err) {
      if (err) return console.log(err);
      response.json({message: 'data deleted'});
    });
  });
  return router;
};

