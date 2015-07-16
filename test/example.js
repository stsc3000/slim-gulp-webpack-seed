var what = require('../app/what');
var $ = require('jquery');

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(what).toBe('It works!');
    $('body').append($('<div>Test</div>'));
    expect($('body').html().indexOf('Test')).not.toEqual(-1);
  });
});
