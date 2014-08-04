'use strict';

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

module.exports = Item;
