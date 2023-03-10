import type { CategoryUpdater, ClueUpdater, RoundUpdater } from "$lib/update-models/game-data";

const getAddRoundData = (roundNum: number, title: string, type: string) => {
    let round: RoundUpdater = {
        num: roundNum,
        title: title,
        type: type,
        numDailyDoubles: 0,
        categories: [
            {
                category: 'Category',
                clues: [
                    {
                        value: 0,
                        clue: '',
                        answer: '',
                        isDailyDouble: false
                    }
                ]
            }
        ]
    }  
    return round; 
};

const getAddCategoryData = (roundIdx: number) => {
    let category: CategoryUpdater = {
        roundIdx: roundIdx,
        category: 'Category',
        clues: [
            {
                value: 0,
                clue: '',
                answer: '',
                isDailyDouble: false
            }
        ]
    }
    return category;
};

const getAddClueData = (roundIdx: number, categoryIdx: number) => {
    let clue: ClueUpdater =  {
        roundIdx: roundIdx,
        categoryIdx: categoryIdx,
        value: 0,
        clue: '',
        answer: '',
        isDailyDouble: false
    }
    return clue;
};

export { getAddRoundData, getAddCategoryData, getAddClueData };