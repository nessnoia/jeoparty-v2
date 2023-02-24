const getAddRoundData = (roundNum: number) => {
    return {
        num: roundNum,
        title: 'TestRound',
        type: 'normal',
        categories: [
            {
                category: 'TestCategory',
                clues: [
                    {
                        value: 200,
                        clue: 'TestClue',
                        clueImage: null,
                        answer: 'Test Answer',
                        isDailyDouble: false
                    }
                ]
            }
        ]
    }   
};

const getAddCategoryData = () => {
    return {
        category: 'TestCategory',
        clues: [
            {
                value: 200,
                clue: 'TestClue',
                clueImage: null,
                answer: 'Test Answer',
                isDailyDouble: false
            }
        ]
    }
};

const getAddClueData = () => {
    return {
        value: 200,
        clue: 'TestClue',
        clueImage: null,
        answer: 'Test Answer',
        isDailyDouble: false
    }
};

export { getAddRoundData, getAddCategoryData, getAddClueData };