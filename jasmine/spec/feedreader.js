/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // the allFeeds list should exist and have length > 0
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have urls', function() {
            // loop thru each feed and check for url defined & length > 0
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
            // loop thru each feed and check for name defined & length > 0
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */         
        it('is hidden by default', function() {
            // by default we expect the menu to be hidden
            expect( $('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays when clicked and hides when clicked again', function() {
            // first click we expect the menu to NOT be hidden
            $('.menu-icon-link').click();
            expect( $('body').hasClass('menu-hidden')).toBe(false);

            // 2nd click we expect the menu to be hidden
            $('.menu-icon-link').click();
            expect( $('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         
        // create an entry list variable to store the result of the google feed load
        var entryList = [];
         
        // since loadFeed is asynchronous, get it with a beforeEach call using done
        beforeEach(function(done) {
            loadFeed(0, function(entries) {
                entryList = entries;
                done();
            });
        });
         
        // create a test to check for at least 1 entry in the feed container
        it('are loaded', function(done) {
            expect(entryList.length > 0).toBe(true);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // since loadFeed is asynchronous, get it with a beforeEach call using done
        // we want to check if feeds change so use a loop & array for a couple of feed id's
        var contentList = [];
        var numFeeds = 2;

        for (var i=0; i < numFeeds; i++) {

            //use an iffe to capture the loop variable, feed id
            ( function(feedId) {

                beforeEach(function(done) {
             
                    loadFeed(feedId, function() {

                        // get & store the feed content
                        var container = $('.feed');
                        if (container[0].children.length > 0) {
                            contentList[feedId] = (container[0].children[0].innerText);
                        }            
                        
                        done();
                    });
                });            
            }(i));
        }       

        // after the tests, set the feed shown back to the original: feed id == 0
        afterEach(function(done) {
            loadFeed(0, function() {
                done();
            });            
        });
               
        // create a test to check that the feed content has changed
        it('feed content is changed', function(done) {
            expect(contentList[0] != contentList[1]).toBe(true);
            done();
        });
        
         
    });
}());
