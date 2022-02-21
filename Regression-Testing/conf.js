exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['HomePage.js',
		  'AddComputer.js',
		  'UpdateComputer.js'
		]
}