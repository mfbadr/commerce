'use strict';

function Item(obj){
  this.name = obj.name;
  this.dimensions = {l:parseFloat(obj.dimensions.l), w:parseFloat(obj.dimensions.w), h:parseFloat(obj.dimensions.h)};
  this.weight = parseFloat(obj.weight);
  this.color = obj.color;
  this.quantity = parseFloat(obj.quantity);
  this.msrp = parseFloat(obj.msrp);
  this.percentOff = parseFloat(obj.percentOff);
}

module.exports = Item;
