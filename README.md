//--------------------------------------------------------------- Setting the Stage -----------------------------------------------------------------------------------

                                                             What is DimensionVsBattler?

It's a two player card battler where players choose between select animes, marvel heroes and marvel villains to participate in a battle against their friend. 

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                How does this incorporate API usage? https://developer.marvel.com/  https://anilist.co/

Choosing their two "dimensions" will reveal a search bar that allows them to pull from the long list of characters in each of these dimensions to recruit as team mates. 

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                                        How will it incorporate user interaction?

Players will not only be able to use the search function to pull up team mates from their chosen Dimensions but they will also be able to play a game! That's right, an actual game! It will include of buttons from gathering their team to activating their dimension abilities and to rolling dice to determine their character's power level.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                                                 How will the game work?

Players will battle in 3 rounds. Their character's will battle it off one v one format and have their power determined by a random number generator clothed in a dice mechanic.  The winner will be determined by a math comparison function in Java, that will compare the character's power, but now before Dimension abilities are activated and applied to the equation! The dimension abilities will be applied to dimensions and not each individual character (since that'd be waaaay too many). 

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Project planning link: <https://drive.google.com/file/d/18PLLQcbNmvPCgwfqBYRMMBquK6gGpIxU/view?usp=sharing>          


//-----------------------------------------------------------------------What are the steps?----------------------------------------------------------------------------------
1. Step 1 accessing the API information into search bars space-around the screen. (These can be formatted with image buttons that provide access to the search bars later in the design phase)

2. Step 2 will be formatting the character's information that's gathered from the API into formatted cards. (Simple formatted cards without any abilities, but simple information input on to parent elements that have the key design aspects as child elements on the card)

3. Step 3 will be creating functions that shift around elements to only show the needed components. The idea is Creating your team is part 1 of the experience and Battling with your teams is part 2. (I'm thinking Z-index and opacity as my main tools here for now, but will do more research on other tools I have access to)

4. Step 4 Will be working on the logic for the card battler. 
    a. Dice random number function
    b. Dimension abilities that alter current (owner or opponent's) or future math equations that calculate power. 
    c. how java determines the winner of a round and displays that information and the movement of rounds
    d. how java determines the overall winner after the three rounds are up (All three rounds must be play. It's not best two of three due to summon catch up mechanics incorporated into the dimension abilities)
    c. The reset button to bring the player back to the original position. 

5. Step 5 Responsive Elements to screen size, card changes, board set up, CSS design

//------------------------------------------------------------------------

GitHub repo link: <https://github.com/ForgeBrew96/DimensionVsBattler.git>

Deployed project link: <https://github.com/ForgeBrew96/DimensionVsBattler.git>
