import type { GameData, Round } from "$lib/models/game-data";

export const customGameData = <GameData>{
    rounds: [{
		num: 1,
		title: 'Round 1',
		type: 'normal',
		numCategories: 1,
		categories: [{
			category: 'Category 1',
            numClues: 1,
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
		numCategories: 6,
		categories: [{
			category: 'Category 1',
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
		numCategories: 6,
		categories: [{
            category: 'Category 1',
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
            numClues: 5,
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
		numCategories: 1,
		categories: [{
			category: 'Final Jeopardy Category',
            numClues: 1,
			clues: [{
				value: 0,
				clue: '',
				answer: '',
				isDailyDouble: false,
			}]
		}]
    }]
};