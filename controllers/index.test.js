var Browser = require('zombie');

Browser.localhost(process.env.IP, process.env.PORT);

describe('A felhasználó meglátogatja az index oldalt', function(){
    var browser = new Browser();
    
    before(function() {
        return browser.visit('/');
    });
    
    it('Működnie kellene...', function(){
        browser.assert.success();
    });
    
    it('A bejelentkező oldalt kellene látnia...', function(){
        browser.assert.text('div.page-header > h1', 'GroupNote')
    });
    
});