const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration')
const HydrationRepository = require('../src/HydrationRepository')

describe('Hydration', function() {

	it('Should be a function', function() {
		expect(Hydration).to.be.a('function');
	});

	it('Should be an instance of the Hydration class', function() {
		const hydration = new Hydration();
		expect(hydration).to.be.an.instanceOf(Hydration);
	});

	it('Should return the user\'s average fluid ounces drank (over all their documented days)', function() {
		const hydrationRepo = new HydrationRepository('../data/proxy-hydration');
		expect(hydrationRepo.returnHydrationUser(1).returnUserAvgOz()).to.eql(55);
	});

	it('Should return the exact fluid ounces drank on a given day', function() {
		const hydrationRepo = new HydrationRepository('../data/proxy-hydration');
		expect(hydrationRepo.returnHydrationUser(1).hydrationDay("09/05/2019")).to.eql(40);
	});

	it('Should return the fluid ounces drank on each day, during a given week', function() {
		const hydrationRepo = new HydrationRepository('../data/proxy-hydration');
		expect(hydrationRepo.returnHydrationUser(1).hydrationSevenDay('21/05/2019')['19/05/2019']).to.eql(77);
	});

	it('Should return a users all time hydration record', function() {
		const hydrationRepo = new HydrationRepository('../data/proxy-hydration');
		expect(hydrationRepo.returnHydrationUser(1).returnHydrationRecord()).to.eql(100);
	});
})