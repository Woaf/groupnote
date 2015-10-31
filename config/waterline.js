var memoryAdapter = require("sails-memory");
var diskAdapter = require('sails-disk');
var postgresqlAdapter = require('sails-postgresql');

//config
var config = {
    adapters: {
        memory:         memoryAdapter,
        disk:           diskAdapter,
        postgresql:     postgresqlAdapter
    },
    connections: {
        default: {
            adapter:    'disk',
        },
        memory: {
            adapter:    'memory', 
        },
        disk: {
            adapter:    'disk', 
        },
        postgresql: {
            adapter:    'postgresql', 
            database:   'notes', 
            host:       'localhost', 
            user:       'admin', 
            password:   'admin', 
        }
    }, 
    defaults: {
        migrate:        'alter', 
    },
};

module.exports = config;
