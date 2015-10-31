module.exports = {
    identity : 'post', 
    connection: 'default', 
    attributes: {
        date: {
            type:'datetime',
            defaultsTo: function () { return new Date();},
            required: true,
        },
        status: {
            type:'string',
            enum: ['newPrivate', 'newPublic', 'oldPrivate', 'oldPublic'],
            required: true, 
        },
        location: {
            type: 'string', 
            required: true,
        },
        description: {
            type: 'string',
            required: true
        },
        user: {
            model: 'user',
        },
    }
}