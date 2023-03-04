const getAddRoundData = (roundNum: number) => {
    return {
        num: roundNum,
        title: 'Round ' + roundNum,
        type: 'normal',
        numCategories: 1,
        categories: [
            {
                category: 'Category',
                numClues: 1,
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
};

const getAddCategoryData = (roundIdx: number) => {
    return {
        roundIdx: roundIdx,
        category: 'Category',
        numClues: 1,
        clues: [
            {
                value: 0,
                clue: '',
                answer: '',
                isDailyDouble: false
            }
        ]
    }
};

const getAddClueData = (roundIdx: number, categoryIdx: number) => {
    return {
        roundIdx: roundIdx,
        categoryIdx: categoryIdx,
        value: 0,
        clue: '',
        answer: '',
        isDailyDouble: false
    }
};

export { getAddRoundData, getAddCategoryData, getAddClueData };