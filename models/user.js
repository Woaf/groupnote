var bcrypt = require("bcryptjs");

module.exports = {
    identity: 'user', 
    connection: 'default', 
    attributes: {
        username: {
            type: 'string', 
            required: true,
            unique: true,
        },
        password: {
            type: 'string', 
            required: true, 
        },
        firstname: {
            type: 'string', 
            required: true,
        },
        lastname: {
            type: 'string', 
            required: false,
        },
        avatar: {
            type: 'string', 
            url: true,
        },
        role: {
            type: 'string', 
            enum: ['admininstrator', 'standard'],
            required: true,
            defaultsTo: 'standard', 
        },
        
        posts: {
            collection: 'post', 
            via: 'user',
        },
        
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        }
        
    }, 
    
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash){
            if(err){
                return next(err);
            }
            values.password = hash;
            next();
        });
    }
};