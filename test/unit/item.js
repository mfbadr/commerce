/* jshint expr: true */
/* global describe, it, before, beforeEach */ 
'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');
var Mongo = require('mongodb');
var connect = require('../../app/lib/mongodb');

var ipodObject = {name:'ipod nano', dimensions:{l:'3', w:'2', h:'5'}, weight:'100', color:'red', quantity:'6', msrp:'300', percentOff:'20'};
var ipod;

describe('Item', function(){
  before(function(done){
    connect('commerce-test', function(){
      done();
    });
  });
  beforeEach( function(done){
    Item.collection.remove(function(){
      ipod = new Item(ipodObject);
      var chair = new Item({name:'chair', dimensions:{l:'24', w:'24', h:'36'}, weight:'5000', color:'orange', quantity:'3', msrp:'150', percentOff:'5'});
      var kindle = new Item({name:'kindle', dimensions:{l:'6', w:'8', h:'2'}, weight:'800', color:'black', quantity:'100', msrp:'200', percentOff:'50'});
      ipod.save(function(){
        chair.save(function(){
          kindle.save(function(){
            done();
          });
        });
      });
    });
  });
  describe('constructor', function(){
    it('should create an item with proper attributes', function(){
      ipod = new Item(ipodObject);
      expect(ipod).to.be.instanceof(Item);
      expect(ipod.name).to.equal('ipod nano');
      expect(ipod.dimensions.l).to.equal(3);
      expect(ipod.dimensions.w).to.equal(2);
      expect(ipod.dimensions.h).to.equal(5);
      expect(ipod.weight).to.equal(100);
      expect(ipod.color).to.equal('red');
      expect(ipod.quantity).to.equal(6);
      expect(ipod.msrp).to.equal(300);
      expect(ipod.percentOff).to.equal(20);
    });
  });
  describe('#cost', function(){
    it('should return the cost (msrp - discount) of the item', function(){
      var ipod = new Item(ipodObject);
      expect(ipod.cost()).to.be.closeTo(240, 0.1);
    });
  });
  describe('#save', function(){
    it('should save an item using mongodb', function(done){
      var ipod = new Item(ipodObject);
      ipod.save( function(){
        expect(ipod._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.all', function(){
    it('should return all items in database', function(done){
      Item.all({}, function(items){
        expect(items).to.have.length(3);
        done();
      });
    });
  });
  describe('.findbyID', function(){
    it('should return one object', function(done){
      //console.log(ipod._id.toString());
      Item.findById(ipod._id.toString(), function(item){
        expect(ipod._id).to.eql(item._id);
        done();
      });
    });
  });
  describe('.deleteById', function(){
    it('should delete an object from database', function(done){
      Item.deleteById(ipod._id.toString(), function(){
        Item.all({}, function(items){
          expect(items).to.have.length(2);
          done();
        });
      });
    });
  });


});

