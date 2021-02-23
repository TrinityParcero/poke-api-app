## PokéAPI App

# Summary

This is a simple app I started during a coding challenge. I realized I was a little rusty on spooling up a new web app during the challenge, so I decided to keep working on this for practice and as a neat little portfolio piece.

The Pokémon API this integrates with was created by Paul Hallett and other contributors - see https://pokeapi.co/ for more info.

# Noted Bugs / Planned Improvements

-   add css handling for smaller screens
-   add a timeout on get pokemon and dex entry so if something goes wrong it doesnt hang
-   finalize styles - add diagonals
-   filter by color, generation, second type
-   change colors on pokedex display based on pokemon type
-   add text search which includes prefix and fuzzy matching for pokemon names
-   fix react warnings in console
-   fix weird text thing where it misses a space sometimes (probably a newline intended?)
-   add special handling for eeveelutions in evolution chain
-   remove special forms from results i.e tornadus-incarnate which break when clicked

# Design Sketch / Inspiration

I have a lot of fond memories of flipping through The Official Pokemon Handbook as a kid, so I pretty quickly decided that I wanted to try and imitate its (very 1999) design sensibilities for this.
</br>
<img src="./public/images/pokemonHandbook.jpg" alt="Official Pokemon Handbook (1999) by Maria S. Barbo" height="300px"/>
<img src="./public/images/pageLayout.PNG" alt="Spread from Official Pokemon Handbook" height="300px"/>

Here's my initial rough draft thumbnail, featuring a very good drawing of a Charmander.
</br>
<img src="./public/images/pokeAppSketch.jpg" alt="Thumbnail design sketch" height="300px"/>
