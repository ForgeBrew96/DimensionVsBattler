//----------------------------------------------------
// Author: Christian Mendoza
// Date: 9/27/2024
//----------------------------------------------------
//HTML Variables====================================================

//General Elements
const body = document.querySelector(`body`)
const header = document.querySelector(`header`)

//Text, headings
const TITLE = document.querySelector(`#title`)

//Search Elements
const ALLSEARCHBARS = document.querySelector(`#allSearchBars`)

const SEARCHCONTAINER = document.querySelectorAll(`.searchContainer`)
const INPUTTEXT = document.querySelectorAll(`.inputText`)
console.log(SEARCHCONTAINER[0].childNodes[3])
const SEARCHBUTTON = document.querySelectorAll(`.searchButton`)
console.log(SEARCHCONTAINER[0].childNodes[5])
const IPNAME = document.querySelectorAll(`.iPName`)
console.log(SEARCHCONTAINER[0].childNodes[7])
const TEXTINFODISPLAY = document.querySelectorAll(`.testInfoDisplay`)
console.log(SEARCHCONTAINER[0].childNodes[9])
const WINCOUNTP1 = document.querySelector(`.winCountP1`)
const WINCOUNTP2 = document.querySelector(`.winCountP2`)
const ROUNDCOUNTER = document.querySelector(`.roundNumber`)
const STARTNEXTROUND = document.querySelector(`.startNextRound`)

//CARDS OBJECT===============================================================================================================================
const CARDS = document.querySelectorAll(".card")
console.log(CARDS)
const elementsOfCards = {}
CARDS.forEach((value, index) => {
    elementsOfCards[index] = [CARDS[index].childNodes[3], CARDS[index].childNodes[5], CARDS[index].childNodes[7], CARDS[index].childNodes[9]];
})
console.log(elementsOfCards)

//PLAYER OBJECTS===============================================================================================================================
const PLAYER = document.querySelectorAll(".player")
const PLAYERS = {}
console.log(PLAYER)
PLAYER.forEach((value, index) => {
    PLAYERS[index] = [PLAYER[index].childNodes[1], PLAYER[index].childNodes[3], PLAYER[index].childNodes[5],];
})
//1 = card, 3 = dice, 5 = wincounter-------------------


//Game Logic===============================================================================================================================
//Card Stats/Ability Generator
function rollDice() {
    return Math.floor(Math.random() * (7 - 1) + 1);
}
console.log(rollDice())
const diceButton1 = PLAYERS[0][1]
const diceButton2 = PLAYERS[1][1]

let player1DiceResult = 0;
diceButton1.addEventListener('click', () => {
    const result = rollDice();
    player1DiceResult = result
    elementsOfCards[0][0].textContent = `Pow: ${result}`;
    console.log(elementsOfCards[0][0].textContent);
    diceButton1.disabled = true
})
let player2DiceResult = 0;
diceButton2.addEventListener('click', () => {
    const result = rollDice();
    player2DiceResult = result
    elementsOfCards[1][0].textContent = `Pow: ${result}`;
    console.log(elementsOfCards[1][0].textContent)
    diceButton2.disabled = true
})

//Round Win Condition

function checkAndRunRoundWin() {
    if (player1DiceResult > 0 && player2DiceResult > 0) {
        round1Win()
        round2Win()
        round3Win()
    }
}

function round1Win() {
    if (player1DiceResult != 0 && player1DiceResult > player2DiceResult) {
        console.log(`player 1 wins`)
        result = parseInt(WINCOUNTP1.dataset.increment)
        result += 1
        WINCOUNTP1.innerText = result
        WINCOUNTP1.dataset.increment = result
        console.log(result)
    } else if (player1DiceResult != 0 && player2DiceResult > player1DiceResult) {
        console.log(`player 2 Wins`)
        result = parseInt(WINCOUNTP2.dataset.increment)
        result += 1
        WINCOUNTP2.innerText = result
        WINCOUNTP2.dataset.increment = result
        console.log(result)
    } else {
        diceButton1.disabled = false;
        diceButton2.disabled = false;
        console.log(`This battle is close! Neither character is giving in just yet!`);
        clickCount = 0;
        player1DiceResult = 0;
        player2DiceResult = 0;
        checkAndRunRoundWin()
    }

}

function reset() {

    roundCount = parseInt(ROUNDCOUNTER.dataset.increment)
    roundCount += 1
    ROUNDCOUNTER.innerText = roundCount
    ROUNDCOUNTER.dataset.increment = roundCount

    player1DiceResult = 0;
    player2DiceResult = 0;
    diceButton1.disabled = false;
    diceButton2.disabled = false;

    elementsOfCards[0][0].textContent = 'Pow: 0';
    elementsOfCards[1][0].textContent = 'Pow: 0';

    SEARCHCONTAINER[0].childNodes[9].textContent = '';
    SEARCHCONTAINER[1].childNodes[9].textContent = '';
    SEARCHCONTAINER[2].childNodes[9].textContent = '';
}

function round2Win() {
    if (player1DiceResult != 0 && player1DiceResult > player2DiceResult) {
        console.log(`player 1 wins`)
        result = parseInt(WINCOUNTP1.dataset.increment)
        result += 1
        WINCOUNTP1.innerText = result
        WINCOUNTP1.dataset.increment = result
        console.log(result)
    } else if (player1DiceResult != 0 && player2DiceResult > player1DiceResult) {
        console.log(`player 2 Wins`)
        result = parseInt(WINCOUNTP2.dataset.increment)
        result += 1
        WINCOUNTP2.innerText = result
        WINCOUNTP2.dataset.increment = result
        console.log(result)
    } else {
        diceButton1.disabled = false;
        diceButton2.disabled = false;
        console.log(`This battle is close! Neither character is giving in just yet!`);
        clickCount = 0;
        player1DiceResult = 0;
        player2DiceResult = 0;
        checkAndRunRoundWin()
    }

}

function round3Win() {
    if (player1DiceResult != 0 && player1DiceResult > player2DiceResult) {
        console.log(`player 1 wins`)
        result = parseInt(WINCOUNTP1.dataset.increment)
        result += 1
        WINCOUNTP1.innerText = result
        WINCOUNTP1.dataset.increment = result
        console.log(result)
    } else if (player1DiceResult != 0 && player2DiceResult > player1DiceResult) {
        console.log(`player 2 Wins`)
        result = parseInt(WINCOUNTP2.dataset.increment)
        result += 1
        WINCOUNTP2.innerText = result
        WINCOUNTP2.dataset.increment = result
        console.log(result)
    } else {
        diceButton1.disabled = false;
        diceButton2.disabled = false;
        console.log(`This battle is close! Neither character is giving in just yet!`);
        clickCount = 0;
        player1DiceResult = 0;
        player2DiceResult = 0;
        checkAndRunRoundWin()
    }

}

let clickCount = 0
function handleClick() {
    clickCount++;
    if (clickCount === 2) {
        round1Win();
    } else if (clickCount === 4) {
        round2Win();
    }
    else if (clickCount === 6) {
        round3Win();
    }
}

diceButton1.addEventListener('click', handleClick)
diceButton2.addEventListener('click', handleClick)

STARTNEXTROUND.addEventListener('click', reset)


//Match Win Condition


//-------------------------------------------------------------------------------------------------------------------------------------------



// Searches Anime titles in general====================================================
// const fetchAnimeTitles = async (title) => {
//     const query = `
//     {
//         Page {
//             media (search: "${title}" ) {
//                 title {
//                     romaji
//                 }
//             }
//         }
//     }`;

//     const response = await fetch('https://graphql.anilist.co', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//     });

//     const data = await response.json();

//     const titles = data.data.Page.media.map(anime => anime.title.romaji);

//     console.log(titles);
// };

// fetchAnimeTitles("pokemon")



// character list from One Piece (or any anime by switching the Media (search "")====================================================
// const fetchOnePieceCharacters = async () => {
//     const query = `
//     {
//         Media(search: "One Piece") {
//             characters {
//                 edges {
//                     node {
//                         name {
//                             full
//                         }
//                         image {
//                             medium
//                         }
//                     }
//                 }
//             }
//         }
//     }`;

//     const response = await fetch('https://graphql.anilist.co', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//     });

//     const data = await response.json();

//     const characters = data.data.Media.characters.edges.map(edge => ({
//         name: edge.node.name.full,
//         image: edge.node.image.medium,
//     }));
//     console.log(`Total characters fetched: ${characters.length}`);
//     console.log(characters);
// };

// fetchOnePieceCharacters();




//Search function to search characters from One Piece and the paired click events====================================================

const fetchOnePieceCharacterByName = async (characterName) => {
    const query = `
    {
        Media(search: "One Piece") {
            characters {
                edges {
                    node {
                        name {
                            full
                        }
                        image {
                            medium
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await axios.post('https://graphql.anilist.co', {
            query,
        });

        const characters = response.data.data.Media.characters.edges.map(edge => ({
            name: edge.node.name.full,
            image: edge.node.image.medium,
        }));

        // Filter characters based on the user's input
        const filteredCharacters = characters.filter(character =>
            character.name.toLowerCase().includes(characterName.toLowerCase())
        );

        // Clear previous results in the testInfoDisplay
        SEARCHCONTAINER[0].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                console.log(SEARCHCONTAINER)
                SEARCHCONTAINER[0].childNodes[9].textContent = `Character found: ${character.name}`;
                elementsOfCards[0][1].src = character.image;
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[0].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[0].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[0].childNodes[3].value;
    fetchOnePieceCharacterByName(characterName);
});

SEARCHCONTAINER[0].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[0].childNodes[3].value;
        let searchText = SEARCHCONTAINER[0].childNodes[3].value
        fetchOnePieceCharacterByName(searchText);
        e.preventDefault()
    }
}
)
//Boku no Hero Academia 7==================================================================================================================================================
const listMyHeroAcademia7 = async () => {
    const query = `
    {
        Media(search: "Boku no Hero Academia 7") {
            characters {
                edges {
                    node {
                        name {
                            full
                        }
                        image {
                            medium
                        }
                    }
                }
            }
        }
    }`;

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    const characters = data.data.Media.characters.edges.map(edge => ({
        name: edge.node.name.full,
        image: edge.node.image.medium,
    }));
    console.log(`Total characters fetched: ${characters.length}`);
    console.log(characters);
};
listMyHeroAcademia7();
//---------------------------------------------------------------------------------------------------------
// Above grabs a list of character in console log, below is for the actual user activity of searching. 
//---------------------------------------------------------------------------------------------------------

const fetchmyHeroAcademia7ByName = async (characterName) => {
    const query = `
    {
        Media(search: "Boku no Hero Academia 7") {
            characters {
                edges {
                    node {
                        name {
                            full
                        }
                        image {
                            medium
                        }
                    }
                }
            }
        }
    }`;

    try {
        const response = await axios.post('https://graphql.anilist.co', {
            query,
        });

        const characters = response.data.data.Media.characters.edges.map(edge => ({
            name: edge.node.name.full,
            image: edge.node.image.medium,
        }));

        // Filter characters based on the user's input
        const filteredCharacters = characters.filter(character =>
            character.name.toLowerCase().includes(characterName.toLowerCase())
        );

        // Clear previous results in the testInfoDisplay
        SEARCHCONTAINER[1].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found: ${character.name}`;
                SEARCHCONTAINER[1].childNodes[9].appendChild(characterDiv);
                elementsOfCards[1][1].src = character.image;
                SEARCHCONTAINER[1].childNodes[5].disabled = true;
            });
        } else {
            SEARCHCONTAINER[1].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[1].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[1].childNodes[3].value;
    fetchmyHeroAcademia7ByName(characterName);
});

SEARCHCONTAINER[1].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[1].childNodes[3].value;
        let searchText = SEARCHCONTAINER[1].childNodes[3].value
        fetchmyHeroAcademia7ByName(searchText);
        e.preventDefault()
    }
}
)


//Blue Lock===============================================================================================================================================================
const listBlueLock = async () => {
    const query = `
        {
            Media(search: "Blue Lock") {
                characters {
                    edges {
                        node {
                            name {
                                full
                            }
                            image {
                                medium
                            }
                        }
                    }
                }
            }
        }`;

    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    const characters = data.data.Media.characters.edges.map(edge => ({
        name: edge.node.name.full,
        image: edge.node.image.medium,
    }));
    console.log(`Total characters fetched: ${characters.length}`);
    console.log(characters);
};
listBlueLock();
//---------------------------------------------------------------------------------------------------------
const fetchBlueLockByName = async (characterName) => {
    const query = `
        {
            Media(search: "Blue Lock") {
                characters {
                    edges {
                        node {
                            name {
                                full
                            }
                            image {
                                medium
                            }
                        }
                    }
                }
            }
        }`;

    try {
        const response = await axios.post('https://graphql.anilist.co', {
            query,
        });

        const characters = response.data.data.Media.characters.edges.map(edge => ({
            name: edge.node.name.full,
            image: edge.node.image.medium,
        }));

        // Filter characters based on the user's input
        const filteredCharacters = characters.filter(character =>
            character.name.toLowerCase().includes(characterName.toLowerCase())
        );

        // Clear previous results in the testInfoDisplay
        SEARCHCONTAINER[2].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found: ${character.name}`;
                SEARCHCONTAINER[2].childNodes[9].appendChild(characterDiv);
                elementsOfCards[2][1].src = character.image;
                SEARCHCONTAINER[2].childNodes[5].disabled = true;
            });
        } else {
            SEARCHCONTAINER[2].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[2].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[2].childNodes[3].value;
    fetchBlueLockByName(characterName);
});

SEARCHCONTAINER[2].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[2].childNodes[3].value;
        let searchText = SEARCHCONTAINER[2].childNodes[3].value
        fetchBlueLockByName(searchText);
        e.preventDefault()
    }
}
)

