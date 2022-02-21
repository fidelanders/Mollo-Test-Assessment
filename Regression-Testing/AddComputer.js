var AddComputer = function() { 
	this.get = function() {
		browser.driver.get('http://computer-database.herokuapp.com/computers/new');
	};
	this.heading = element(by.id('main')).element(by.css('h1'));	
	this.computerNameInput = element(by.id('name'));
	this.computerNameError = element(by.css('.clearfix.error'));	
	this.introducedDateInput = element(by.id('introduced'));
	this.discontinuedDateInput = element(by.id('discontinued'));
	this.companySelectList = element(by.id('company'));	
	this.createComputerButton = element(by.css('.primary'));
	this.cancelButton = element.all(by.css('.btn')).last();
};

var Home = function() {
	this.heading = element(by.id('main')).element(by.css('h1'));	
	this.notificationMessage = element(by.css('.alert-message'));	
};
describe('add a computer page', function() {
	beforeEach(function() {
		return browser.ignoreSynchronization = true;
	});
	
	it('should be displayed', function() {
		var addComputerPage = new AddComputer();
		addComputerPage.get();
		expect(addComputerPage.heading.getText()).toBe('Add a new computer');	
	});
	
	it('should be able to add a new computer by entering a computer name', function() {
		var addComputerPage = new AddComputer();
		addComputerPage.get();

		addComputerPage.computerNameInput.sendKeys('Sample-Computer');
		addComputerPage.createComputerButton.click();
					
		var homepage = new Home();
		
		expect(homepage.notificationMessage.getText()).toBe('Done! Computer Sample-Computer has been created');	
	});
	
	it('should display error message clicking Create this computer button and not providing a computer name', function() {
		var addComputerPage = new AddComputer();
		addComputerPage.get();

		addComputerPage.createComputerButton.click();
					
		expect(addComputerPage.computerNameError.getText()).toBe('Computer name\nRequired');	
	});
	
	it('should return to Home page when Cancel button clicked', function() {
		var addComputerPage = new AddComputer();
		addComputerPage.get();

		addComputerPage.cancelButton.click();
		
		var homepage = new Home();
		expect(homepage.heading.getText()).toContain(' Computers found');	
	});
	
	it('should be able to add a new computer by inputting valid data in all form fields', function() {
		var addComputerPage = new AddComputer();
		addComputerPage.get();
		addComputerPage.computerNameInput.sendKeys('Sample-Computer-AllFields');
		addComputerPage.introducedDateInput.sendKeys('2022-02-21');
		addComputerPage.discontinuedDateInput.sendKeys('2022-03-20');
		addComputerPage.companySelectList.$('[value="10"]').click();
		addComputerPage.createComputerButton.click();
					
		var homepage = new Home();
		
		expect(homepage.notificationMessage.getText()).toBe('Done! Computer Sample-Computer-AllFields has been created');	
	});
});