'use strict';

var Item = require('../models/item');

exports.index = function(req, res){
  Item.all({}, function(items){
    res.render('items/index', {items:items});
  });
};

exports.init = function(req, res){
  res.render('items/init');
};

exports.create = function(req, res){
  console.log(req.body);
  var item = new Item(req.body);
  item.save(function(){
    res.redirect('/');
  });
};
exports.show = function(req, res){
  Item.findById(req.params.id, function(item){
    res.render('items/show', {item:item});
  });
};
