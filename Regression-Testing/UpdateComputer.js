var Home = function() {
	this.get = function() {
		browser.driver.get('http://computer-database.herokuapp.com/computers');
	};
	this.heading = element(by.id('main')).element(by.css('h1'));	
	this.notificationMessage = element(by.css('.alert-message.warning'));	
	this.filterInput = element(by.id('searchbox'));
	this.filterButton = element(by.id('searchsubmit'));
};

var UpdateComputerPage = function() { 
	this.heading = element(by.id('main')).element(by.css('h1'));	
	this.computerNameInput = element(by.id('name'));
	this.computerNameError = element(by.css('.clearfix.error'));	
	this.introducedDateInput = element(by.id('introduced'));
	this.discontinuedDateInput = element(by.id('discontinued'));
	this.companySelectList = element(by.id('company'));	
	this.saveComputerButton = element(by.css('.btn.primary'));
	this.cancelButton = element.all(by.css('.btn')).last();
	this.deleteButton = element.all(by.css('.btn.danger')).last();
};

describe('Edit computer page', function() {
	beforeEach(function() {
		return browser.ignoreSynchronization = true;
	});

	it('should be able to display a computer', function() {
		var homepage = new Home();
		homepage.get();
		homepage.filterInput.sendKeys('Sample-Computer');
		homepage.filterButton.click();
		element(by.linkText('Sample-Computer')).click();
		
		var updateComputerPage = new UpdateComputerPage();
		
		expect(updateComputerPage.heading.getText()).toBe('Edit computer');	
	});
	
	it('should be able to update a computer name', function() {
		var homepage = new Home();
		homepage.get();
		homepage.filterInput.sendKeys('Sample-Computer');
		homepage.filterButton.click();
		element(by.linkText('Sample-Computer')).click();
		
		var updateComputerPage = new UpdateComputerPage();
		updateComputerPage.computerNameInput.sendKeys('-001');
		updateComputerPage.saveComputerButton.click();
		
		expect(homepage.notificationMessage.getText()).toBe('Done! Computer Sample-Computer-001 has been updated');	
	});
	
	it('should display error when updating a computer and not providing a computer name', function() {
		var homepage = new Home();
		homepage.get();
		homepage.filterInput.sendKeys('Sample-Computer-001');
		homepage.filterButton.click();
		element(by.linkText('Sample-Computer-001')).click();
		
		var updateComputerPage = new UpdateComputerPage();
		updateComputerPage.computerNameInput.clear();
		updateComputerPage.saveComputerButton.click();
		
		expect(updateComputerPage.computerNameError.getText()).toBe('Computer name\nRequired');	
	});
	
	it('should return to Home page when Cancel button clicked whilst updating a computer', function() {
		var homepage = new Home();
		homepage.get();
		homepage.filterInput.sendKeys('Sample-Computer-001');
		homepage.filterButton.click();
		element(by.linkText('Sample-Computer-001')).click();
		
		var updateComputerPage = new UpdateComputerPage();
		updateComputerPage.cancelButton.click();
		
		expect(homepage.heading.getText()).toContain(' computers found');	
	});
	
	it('should be able to update a computer by inputting valid data in all form fields', function() {
		var homepage = new Home();
		homepage.get();
		homepage.filterInput.sendKeys('Sample-ComputerAllFields');
		homepage.filterButton.click();
		element(by.linkText('Sample-ComputerAllFields')).click();
		
		var updateComputerPage = new UpdateComputerPage();
		updateComputerPage.computerNameInput.clear();
		updateComputerPage.computerNameInput.sendKeys('Sample-ComputerUpdate');
		updateComputerPage.introducedDateInput.clear();
		updateComputerPage.introducedDateInput.sendKeys('2022-02-21');
		updateComputerPage.discontinuedDateInput.clear();
		updateComputerPage.discontinuedDateInput.sendKeys('2023-03-20');
		updateComputerPage.companySelectList.$('[value="10"]').click();
		updateComputerPage.saveComputerButton.click();
		
		expect(homepage.notificationMessage.getText()).toBe('Done! Computer Sample-ComputerUpdate has been updated');	
	});
	
	 it('should return to Home page when Delete button clicked whilst editing a computer', function() {
		var homepage = new Home();
		homepage.get();
		homepage.filterInput.sendKeys('Sample-ComputerUpdate');
		homepage.filterButton.click();
		element(by.linkText('Sample-ComputerUpdate')).click();
		
		var updateComputerPage = new UpdateComputerPage();
		updateComputerPage.deleteButton.click();
		
		expect(homepage.notificationMessage.getText()).toBe('Done! Computer has been deleted');	
	});
});