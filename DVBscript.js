//----------------------------------------------------
// Author: Christian Mendoza
// Date: 10/3/2024
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
console.log(WINCOUNTP1)
const WINCOUNTP2 = document.querySelector(`.winCountP2`)
const ROUNDCOUNTER = document.querySelector(`.roundNumber`)
const STARTNEXTROUND = document.querySelector(`.startNextRound`)
const PLAYAGAIN = document.querySelector(".newGame")
const WINANNCOUNCEMENTS = document.querySelector(".winAnnouncments")
const CARDABILITY = document.querySelectorAll('.cardAbility')
console.log(STARTNEXTROUND)
//CARDS OBJECT===============================================================================================================================
const CARDS = document.querySelectorAll(".card")
console.log(CARDS)
const elementsOfCards = {}
CARDS.forEach((value, index) => {
    elementsOfCards[index] = [CARDS[index].childNodes[3], CARDS[index].childNodes[5], CARDS[index].childNodes[7], CARDS[index].childNodes[9]];
})

//PLAYER OBJECTS===============================================================================================================================
const PLAYER = document.querySelectorAll(".player")
const PLAYERS = {}
console.log(PLAYER)
PLAYER.forEach((value, index) => {
    PLAYERS[index] = [PLAYER[index].childNodes[1].childNodes[1], PLAYER[index].childNodes[1].childNodes[3], PLAYER[index].childNodes[1].childNodes[5],];
})
//1 = card, 3 = dice, 5 = wincounter-------------------

//Game Logic===============================================================================================================================
//Card Stats/Ability Generator

function rollDice() {
    return Math.floor(Math.random() * (7 - 1) + 1);
}

console.log(PLAYERS[0][1])
console.log(PLAYER)
console.log(rollDice())
const diceButton1 = PLAYERS[0][0]
const diceButton2 = PLAYERS[1][0]

let player1DiceResult = 0;
diceButton1.addEventListener('click', () => {
    const result1 = rollDice();
    player1DiceResult = result1
    elementsOfCards[0][0].textContent = `Pow: ${result1}`;
    console.log(elementsOfCards[0][0].textContent);
    diceButton1.disabled = true
    diceButton1.style.animation = 'roll 0.7s ease';
    diceButton1.addEventListener('animationend', () => {
        diceButton1.style.animation = '';
    }, { once: true });

})
let player2DiceResult = 0;
diceButton2.addEventListener('click', () => {
    const result2 = rollDice();
    player2DiceResult = result2
    elementsOfCards[1][0].textContent = `Pow: ${result2}`;
    console.log(elementsOfCards[1][0].textContent)
    diceButton2.disabled = true
    diceButton2.style.animation = 'roll 0.7s ease';
    diceButton2.addEventListener('animationend', () => {
        diceButton2.style.animation = '';
    }, { once: true });
})

const ABILITYUNLOCK = document.querySelectorAll(`.abilityUnlock`)

ABILITYUNLOCK.disabled = true
console.log(CARDABILITY)
function applyingAbility1() {
    const newPower = player1DiceResult + 2
    CARDABILITY[0].textContent = "Ability: +2 Power"
    elementsOfCards[0][0].textContent = `Pow: ${newPower}`;
}
function applyingAbility2() {
    const newPower = player2DiceResult + 2
    CARDABILITY[1].textContent = "Ability: +2 Power"
    elementsOfCards[1][0].textContent = `Pow: ${newPower}`;
}

ABILITYUNLOCK[0].addEventListener(`click`, applyingAbility1)
ABILITYUNLOCK[1].addEventListener(`click`, applyingAbility2)
ABILITYUNLOCK[0].addEventListener('click', abilityHandleClick)
ABILITYUNLOCK[1].addEventListener('click', abilityHandleClick)

//Round and Match Win Conditions and Logic
STARTNEXTROUND.disabled = true
function checkAndRunRoundWin() {
    if (player1DiceResult > 0 && player2DiceResult > 0 && abilityClickCount == 2) {
        roundWin()
    }
}
function roundWin() {
    if (player1DiceResult != 0 && player1DiceResult > player2DiceResult) {
        console.log(`player 1 wins`)
        WINANNCOUNCEMENTS.innerText = `Player 1 Wins!`
        result1 = parseInt(WINCOUNTP1.dataset.increment)
        result1 += 1
        WINCOUNTP1.innerText = result1
        WINCOUNTP1.dataset.increment = result1
    } else if (player1DiceResult != 0 && player2DiceResult > player1DiceResult) {
        console.log(`player 2 Wins`)
        WINANNCOUNCEMENTS.innerText = `Player 2 Wins!`
        result2 = parseInt(WINCOUNTP2.dataset.increment)
        result2 += 1
        WINCOUNTP2.innerText = result2
        WINCOUNTP2.dataset.increment = result2
    } else if (player2DiceResult === player1DiceResult) {
        player1DiceResult = 0;
        player2DiceResult = 0;

        diceButton1.disabled = false;
        diceButton2.disabled = false;

        elementsOfCards[0][0].textContent = `Pow: ${player1DiceResult}`;
        elementsOfCards[1][0].textContent = `Pow: ${player2DiceResult}`;
        CARDABILITY[0].textContent = "Ability:"
        CARDABILITY[1].textContent = "Ability:"

        clickCount = 0;
        abilityClickCount = 0;

        console.log(`This battle is close! Neither character is giving in just yet!`);
        WINANNCOUNCEMENTS.innerText = `This battle is close! Neither character is giving in just yet!`
    }
}

function reset() {


    roundCount = parseInt(ROUNDCOUNTER.dataset.increment)
    roundCount += 1
    ROUNDCOUNTER.innerText = roundCount
    ROUNDCOUNTER.dataset.increment = roundCount

    player1DiceResult = 0;
    player2DiceResult = 0;
    diceButton1.disabled = false
    diceButton2.disabled = false
    CARDABILITY[0].textContent = "Ability:"
    CARDABILITY[1].textContent = "Ability:"

    elementsOfCards[0][0].textContent = 'Pow: 0';
    elementsOfCards[1][0].textContent = 'Pow: 0';
    elementsOfCards[0][1].src = "http://127.0.0.1:5500/index.html"
    elementsOfCards[1][1].src = "http://127.0.0.1:5500/index.html"


    SEARCHCONTAINER[0].childNodes[9].textContent = '';
    SEARCHCONTAINER[1].childNodes[9].textContent = '';
    SEARCHCONTAINER[2].childNodes[9].textContent = '';
    STARTNEXTROUND.disabled = true
    elementsOfCards[0][2].innerText = "Name"
    elementsOfCards[1][2].innerText = "Name"
    WINANNCOUNCEMENTS.innerText = `GET READY AND FIGHT!`
    abilityClickCount = 0
}
let abilityClickCount = 0
function abilityHandleClick() {
    abilityClickCount++;
    for (i = abilityClickCount; abilityClickCount === 2 && abilityClickCount != 0; abilityClickCount = 0) {
        checkAndRunRoundWin()
        STARTNEXTROUND.disabled = false
    }
    if (WINCOUNTP2.innerText == 2) {
        ROUNDCOUNTER.innerText = "FINISHED"
        STARTNEXTROUND.disabled = true
        diceButton1.disabled = true;
        diceButton2.disabled = true;
        console.log(`Player 2 is the Dimension Champion!`)
        WINANNCOUNCEMENTS.innerText = `Player 2 is the DIMENSION CHAMPION!`
    } else if (WINCOUNTP1.innerText == 2) {
        ROUNDCOUNTER.innerText = "FINISHED"
        STARTNEXTROUND.disabled = true
        diceButton1.disabled = true;
        diceButton2.disabled = true;
        console.log(`Player 1 is the Dimension Champion!`)
        WINANNCOUNCEMENTS.innerText = `Player 1 is the DIMENSION CHAMPION!`
    }

}

let clickCount = 0
diceButton1.addEventListener('click', handleClick)
diceButton2.addEventListener('click', handleClick)
function handleClick() {
    clickCount++;
}

STARTNEXTROUND.addEventListener('click', reset)
function newGame() {
    ROUNDCOUNTER.innerText = 1
    ROUNDCOUNTER.dataset.increment = 1

    elementsOfCards[0][2].innerText = "Name"
    elementsOfCards[1][2].innerText = "Name"
    CARDABILITY[0].textContent = "Ability:"
    CARDABILITY[1].textContent = "Ability:"
    player1DiceResult = 0;
    player2DiceResult = 0;
    diceButton1.disabled = false
    diceButton2.disabled = false

    elementsOfCards[0][0].textContent = 'Pow: 0';
    elementsOfCards[1][0].textContent = 'Pow: 0';
    SEARCHCONTAINER.forEach((container) => {
        container.childNodes[3].value = '';
        container.childNodes[9].innerText = '';
        container.childNodes[5].disabled = false;
    });

    elementsOfCards[0][1].src = "http://127.0.0.1:5500/index.html"
    elementsOfCards[1][1].src = "http://127.0.0.1:5500/index.html"
    STARTNEXTROUND.disabled = true;
    WINCOUNTP1.innerText = 0;
    WINCOUNTP2.innerText = 0;
    WINCOUNTP1.dataset.increment = 0;
    WINCOUNTP2.dataset.increment = 0;
    WINANNCOUNCEMENTS.innerText = `CHOOSE YOUR CHAMPION!`
    abilityClickCount = 0
}


PLAYAGAIN.addEventListener(`click`, newGame)

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
        console.log(elementsOfCards[0][1])
        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                console.log(SEARCHCONTAINER)
                SEARCHCONTAINER[0].childNodes[9].textContent = `Character found!`;
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
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
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[1].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
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


//Blue Lock============================================================
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
//--------------------------------------------------------------------------
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
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[2].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
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

//Re:Zero================================================================================
const fetchReZeroByName = async (characterName) => {
    const query = `
        {
            Media(search: "Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season Part 2") {
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
        SEARCHCONTAINER[3].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[3].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[3].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[3].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[2].childNodes[3].value;
    fetchReZeroByName(characterName);
});

SEARCHCONTAINER[3].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[3].childNodes[3].value;
        let searchText = SEARCHCONTAINER[3].childNodes[3].value
        fetchReZeroByName(searchText);
        e.preventDefault()
    }
}
)
//FULLMETAL ALCHEMIST====================================================================
const fetchFULLMETALALCHEMISTByName = async (characterName) => {
    const query = `
        {
            Media(search: "Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST") {
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
        SEARCHCONTAINER[4].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[4].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[4].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[4].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[4].childNodes[3].value;
    fetchFULLMETALALCHEMISTByName(characterName);
});

SEARCHCONTAINER[4].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[4].childNodes[3].value;
        let searchText = SEARCHCONTAINER[4].childNodes[3].value
        fetchFULLMETALALCHEMISTByName(searchText);
        e.preventDefault()
    }
}
)
//Rise of The Shield Hero====================================================
const fetchRiseOfTheShieldHeroByName = async (characterName) => {
    const query = `
        {
            Media(search: "Tate no Yuusha no Nariagari") {
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
        SEARCHCONTAINER[5].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[5].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[5].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[5].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[5].childNodes[3].value;
    fetchRiseOfTheShieldHeroByName(characterName);
});

SEARCHCONTAINER[5].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[5].childNodes[3].value;
        let searchText = SEARCHCONTAINER[5].childNodes[3].value
        fetchRiseOfTheShieldHeroByName(searchText);
        e.preventDefault()
    }
}
)
//Tower of God========================================================================
const listTowerOfGod = async () => {
    const query = `
        {
            Media(search: "Kami no Tou: Tower of God 2nd Season") {
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
listTowerOfGod();
//--------------------------------------------------
const fetchTowerOfGodByName = async (characterName) => {
    const query = `
        {
            Media(search: "Kami no Tou: Tower of God 2nd Season") {
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
        SEARCHCONTAINER[6].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[6].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[6].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[6].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[2].childNodes[3].value;
    fetchTowerOfGodByName(characterName);
});

SEARCHCONTAINER[6].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[6].childNodes[3].value;
        let searchText = SEARCHCONTAINER[6].childNodes[3].value
        fetchTowerOfGodByName(searchText);
        e.preventDefault()
    }
}
)
//Jujutsu Kaisen=================================================================
const fetchJujutsuKaisenByName = async (characterName) => {
    const query = `
        {
            Media(search: "Jujutsu Kaisen") {
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
        SEARCHCONTAINER[7].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[7].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[7].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[7].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[7].childNodes[3].value;
    fetchJujutsuKaisenByName(characterName);
});

SEARCHCONTAINER[7].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[7].childNodes[3].value;
        let searchText = SEARCHCONTAINER[7].childNodes[3].value
        fetchJujutsuKaisenByName(searchText);
        e.preventDefault()
    }
}
)
//Demon Slayer=====================================================================
const fetchDemonSlayerByName = async (characterName) => {
    const query = `
        {
            Media(search: "Kimetsu no Yaiba") {
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
        SEARCHCONTAINER[8].childNodes[9].innerHTML = '';

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found!`;
                SEARCHCONTAINER[8].childNodes[9].appendChild(characterDiv);
                if (elementsOfCards[0][1].src === "http://127.0.0.1:5500/index.html") {
                    elementsOfCards[0][1].src = character.image
                    elementsOfCards[0][2].innerText = character.name
                } else {
                    elementsOfCards[1][1].src = character.image
                    elementsOfCards[1][2].innerText = character.name
                };
                SEARCHCONTAINER[0].childNodes[5].disabled = true
            });
        } else {
            SEARCHCONTAINER[8].childNodes[9].textContent = `No characters found for: ${characterName}`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

SEARCHCONTAINER[8].childNodes[5].addEventListener('click', () => {
    const characterName = SEARCHCONTAINER[8].childNodes[3].value;
    fetchDemonSlayerByName(characterName);
});

SEARCHCONTAINER[8].childNodes[3].addEventListener(`keypress`, (e) => {
    if (e.key === `Enter`) {
        const characterName = SEARCHCONTAINER[8].childNodes[3].value;
        let searchText = SEARCHCONTAINER[8].childNodes[3].value
        fetchDemonSlayerByName(searchText);
        e.preventDefault()
    }
}
)


// function releaseGameButtons() {
//     diceButton1.disabled = false
//     diceButton2.disabled = false
// }

// console.log(elementsOfCards[0][2])

// function searchBarClicks() {
//     if (elementsOfCards[0][2] !== "Name" && elementsOfCards[1][2] !== "Name") {
//         releaseGameButtons()
//     }
// }

// SEARCHBUTTON.forEach(button => {
//     button.addEventListener('click', searchBarClicks);
//     }
// );