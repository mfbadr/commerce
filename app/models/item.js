'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

Object.defineProperty(Item, 'collection', {
  get: function(){
    return global.mongodb.collection('items');
  }
});

function Item(obj){
  this.name = obj.name;
  this.dimensions = {l:parseFloat(obj.dimensions.l), w:parseFloat(obj.dimensions.w), h:parseFloat(obj.dimensions.h)};
  this.weight = parseFloat(obj.weight);
  this.color = obj.color;
  this.quantity = parseFloat(obj.quantity);
  this.msrp = parseFloat(obj.msrp);
  this.percentOff = parseFloat(obj.percentOff);
}

Item.prototype.cost = function(){
  return this.msrp - (this.msrp * (this.percentOff / 100));
};

Item.prototype.save = function(cb){
  Item.collection.save(this, cb);
};

Item.all = function(query, cb){
  Item.collection.find(query).toArray( function( err, obj){
    //loop thru obj to reproto
    for( var i = 0; i < obj.length; i++){
      obj[i] = reProto(obj[i]);
    }
    cb(obj);
  });
};

Item.findById = function(id, cb){
  id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  Item.collection.findOne({_id:id}, function(err, item){
    cb(reProto(item));
  });
};

Item.deleteById = function (id, cb){
  id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  Item.collection.remove( {_id:id}, function(){
    cb();
  } );
};


module.exports = Item;


// HELPER
function reProto(item){
  item = _.create(Item.prototype, item);
  return item;
}
