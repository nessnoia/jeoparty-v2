import {
	generateId,
	type CategoryUpdater,
	type ClueUpdater,
	type RoundUpdater
} from '$lib/update-models/game-data';

// RoundId and categoryId are omitted for the embedded catagory/clue to make adding to the database easier (don't have to delete
// the nested fields).
const getAddRoundData = (roundNum: number, title: string, type: string) => {
	let round: RoundUpdater = {
		id: `round-${generateId(10)}`,
		num: roundNum,
		title: title,
		type: type,
		numDailyDoubles: 0,
		add: true,
		categories: [
			{
				id: `category-${generateId(10)}`,
				category: 'Category',
				clues: [
					{
						id: `clue-${generateId(10)}`,
						value: 0,
						clue: '',
						answer: '',
						isDailyDouble: false
					}
				]
			}
		]
	};
	return round;
};

// RoundId and categoryId are omitted for the embedded clue to make adding to the database easier (don't have to delete
// the nested fields).
const getAddCategoryData = (roundId: string) => {
	let category: CategoryUpdater = {
		roundId: roundId,
		id: `category-${generateId(10)}`,
		category: 'Category',
		add: true,
		clues: [
			{
				id: `clue-${generateId(10)}`,
				value: 0,
				clue: '',
				answer: '',
				isDailyDouble: false
			}
		]
	};
	return category;
};

const getAddClueData = (roundId: string, categoryId: string) => {
	let clue: ClueUpdater = {
		roundId: roundId,
		categoryId: categoryId,
		id: `clue-${generateId(10)}`,
		value: 0,
		clue: '',
		answer: '',
		isDailyDouble: false,
		add: true
	};
	return clue;
};

export { getAddRoundData, getAddCategoryData, getAddClueData };
