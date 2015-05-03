'use strict';

describe('The photo wall view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Flickr Search By Terms');
  });

  it('list more than 10 4mation photos', function () {
    expect(page.thumbnailEls.count()).toBeGreaterThan(10);
  });

});
