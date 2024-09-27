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

console.log(SEARCHCONTAINER)



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
                const characterDiv = document.createElement('div');
                characterDiv.textContent = `Character found: ${character.name}`;
                SEARCHCONTAINER[0].childNodes[9].appendChild(characterDiv);
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
//==========================================================================================================================================================



