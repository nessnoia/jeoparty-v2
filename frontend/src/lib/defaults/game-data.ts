import type { GameData, Round } from "$lib/database-models/game-data";

export const customGameData = <GameData>{
    rounds: [{
		num: 1,
		title: 'Round 1',
		type: 'normal',
		categories: [{
			category: 'Category',
			clues: [{
				value: 0,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}]
		}]
	}]
};

export const normalGameData = <GameData>{
	rounds: [{
        num: 1,
		title: 'Round 1',
		type: 'normal',
        maxDailyDoubles: 1,
		categories: [{
			category: 'Category 1',
			clues: [{
				value: 200,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}, {
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
			category: 'Category 2',
			clues: [{
				value: 200,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}, {
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
			category: 'Category 3',
			clues: [{
				value: 200,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}, {
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
			category: 'Category 4',
			clues: [{
				value: 200,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}, {
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
			category: 'Category 5',
			clues: [{
				value: 200,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}, {
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
			category: 'Category 6',
			clues: [{
				value: 200,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}, {
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}]
    }, {
        num: 2,
		title: 'Round 2',
		type: 'normal',
        maxDailyDoubles: 2,
		categories: [{
            category: 'Category 1',
            clues: [{
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1200,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 2000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
            category: 'Category 2',
            clues: [{
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1200,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 2000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
            category: 'Category 3',
            clues: [{
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1200,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 2000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
            category: 'Category 4',
            clues: [{
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1200,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 2000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
            category: 'Category 5',
            clues: [{
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1200,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 2000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}, {
            category: 'Category 6',
            clues: [{
                value: 400,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 800,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1200,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 1600,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }, {
                value: 2000,
                clue: '',
                answer: '',
                isDailyDouble: false,
            }]
		}]
    }, {
        num: 3,
		title: 'Round 3',
		type: 'final',
		categories: [{
			category: 'Final Jeopardy Category',
			clues: [{
				clue: '',
				answer: '',
			}]
		}]
    }]
};