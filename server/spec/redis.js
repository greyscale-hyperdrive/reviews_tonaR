const redis = require('redis');
const client = redis.createClient();
const express  = require('express');

client.on('connect', function() {
  console.log('connected');
});

client.set('some key', 'some value');

