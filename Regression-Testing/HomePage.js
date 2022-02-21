var Home = function() {
	this.get = function() {
		browser.driver.get('http://computer-database.herokuapp.com/computers');
	};
	this.heading = element(by.id('main')).element(by.css('h1'));	
	this.addComputerButton = element(by.id('add'));
};

var AddComputerPage = function() { 
	this.heading = element(by.id('main')).element(by.css('h1'));	
};

describe('Computers database homepage', function() {
	beforeEach(function() {
		return browser.ignoreSynchronization = true;
	});
	
	it('should be displayed', function() {
		var homepage = new Home();
		homepage.get();
		expect(homepage.heading.getText()).toContain(' computers found')
	});

	it('should be able to navigate to Add a computer screen', function() {
		var homepage = new Home();
		homepage.get();
		homepage.addComputerButton.click();

		var addComputerPage = new AddComputerPage();
		
		expect(addComputerPage.heading.getText()).toBe('Add a computer');	
	});
});