/* jshint expr: true */
/* global describe, it */ 
'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');

var ipodObject = {name:'ipod nano', dimensions:{l:'3', w:'2', h:'5'}, weight:'100', color:'red', quantity:'6', msrp:'300', percentOff:'20'};

describe('Item', function(){
  describe('constructor', function(){
    it('should create an item with proper attributes', function(){
      var ipod = new Item(ipodObject);
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
});

