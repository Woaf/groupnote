var expect = require("chai").expect;
var bcrypt = require("bcryptjs");

var Waterline = require("waterline");
var waterlineConfig = require("../config/waterline");
var userCollection = require("./user");
var postCollection = require("./post");

var User;

before(function (done){
    var orm = new Waterline();
    
    orm.loadCollection(Waterline.Collection.extend(userCollection));
    orm.loadCollection(Waterline.Collection.extend(postCollection));
    waterlineConfig.connections.default.adapter = 'memory';
    
    orm.initialize(waterlineConfig, function(err, models){
        if(err) throw err;
        User = models.collections.user;
        done();
    });
});

describe('UserModel', function () {
    function getUserData() {
        return {
            username: 'testUser', 
            password: 'testPassword', 
            firstname: 'Te',
            lastname: 'St', 
            avatar: '', 
            role: 'standard', 
        };
    }
    
    beforeEach(function(done){
        User.destroy({}, function(err) {
            done();
        });
    });
    
    it('should create a new user', function() {
        return User.create({
            username: 'testUser', 
            password: 'testPassword', 
            firstname: 'Te',
            lastname: 'St', 
            avatar: '', 
            role: 'standard', 
        })
        .then(function(user){
            expect(user.username).to.equal('testUser');
            expect(bcrypt.compareSync('testPassword', user.password)).to.be.true;
            expect(user.firstname).to.equal('Te');
            expect(user.lastname).to.equal('St');
            expect(user.avatar).to.equal('');
            expect(user.role).to.equal('stander');
        });
    });
    
    it('should find the tesu user', function(){
        return User.create(getUserData())
        .then(function(user){
            expect(user.username).to.equal('testUser');
            expect(bcrypt.compareSync('testPassword', user.password)).to.be.true;
            expect(user.firstname).to.equal('Te');
            expect(user.lastname).to.equal('St');
            expect(user.avatar).to.equal('');
            expect(user.role).to.equal('standard');
        });
    });
    
    describe('#validPassword', function(){
        it('should return true with the right password', function(){
            return User.create(getUserData()).then(function(user){
                expect(user.validPassword('testPassword')).to.be.true;
            })
        });
        it('should return false with any wrong password', function(){
            return User.create(getUserData()).then(function(user) {
                expect(user.validPassword('invalid')).to.be.false;
            })
        });
    });
    
});