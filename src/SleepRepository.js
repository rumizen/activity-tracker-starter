class SleepRepository {
	constructor(dataFilepath) {
		this.dataFilepath = dataFilepath;
	}

	returnSleep(userId) {
		return this.instantiateSleeps().find(slp => slp.userSleepData.userID === userId);
	}

	instantiateSleeps() {
		if (typeof module !== 'undefined') {
			return require(this.dataFilepath).map(user => new Sleep(user));
		} else {
			return sleepData.map(user => new Sleep(user));
		}
	}

	returnAvgSleepQuality() {
		const qualities = [];		
		this.instantiateSleeps().forEach(el => el.userSleepData.sleepData.forEach(el => qualities.push(el.sleepQuality)));
		return Math.round((10 * qualities.reduce((sum, num) => sum + num)) / qualities.length) / 10;
	}

	returnGreatSleepers(givenDate) {
		return this.instantiateSleeps().reduce((final, user) => {
			const todayIndex = user.userSleepData.sleepData.findIndex(el => el.date === givenDate);
			const avgQual = user.userSleepData.sleepData.reduce((sum, el, index) => {
				if (index <= todayIndex && index >= todayIndex - 6) {
					sum += el.sleepQuality;
				}
				return sum;
			}, 0)
				if ((avgQual / 7) > 3) {
					final.push(user.userSleepData.userID);
				}
			return final;
		}, []);
	}

	returnLongestSleepers(givenDate) {
		const reduced = this.instantiateSleeps().reduce((acc, user) => {
			let matchingDate = user.userSleepData.sleepData.filter(day => day.date === givenDate);
			matchingDate = { id: user.userSleepData.userID, ...matchingDate };
			acc.push(matchingDate);
			return acc;
		}, [])
		reduced.sort((a, b) => b['0'].hoursSlept - a['0'].hoursSlept);
		const result = reduced.filter(item => item['0'].hoursSlept === reduced[0]['0'].hoursSlept)
		return result.map(item => item.id);
	}



}

if (typeof module !== 'undefined') {
	Sleep = require('../src/Sleep');
	module.exports = SleepRepository;
}