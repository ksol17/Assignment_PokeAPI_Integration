// Step 1: Add an event listener to allow pressing "Enter" to search
document.getElementById('pokemonInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fetchPokemon();
    }
});

// Step 2: Create an asynchronous function to fetch Pokémon data
async function fetchPokemon() {
    const pokemonNameOrId = document.getElementById('pokemonInput').value.toLowerCase();
    const container = document.getElementById('pokemon-container');

    // Clear previous content
    container.innerHTML = '';

    // Step 3: Show loading spinner while fetching data
    const loader = document.createElement('div');
    loader.className = 'loader';
    container.appendChild(loader);

    try {
        // Step 4: Fetch Pokémon data from the PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);

        if (!response.ok) {
            // If response not OK, throw error to be caught below
            throw new Error('Pokémon not found');
        }

        const data = await response.json();

        // Step 5: Dynamically create elements to show Pokémon info
        const card = document.createElement('div');
        card.className = 'card';

        const nameElement = document.createElement('h2');
        nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        const imageElement = document.createElement('img');
        imageElement.src = data.sprites.front_default;
        imageElement.alt = data.name;

        const typeElement = document.createElement('p');
        typeElement.textContent = 'Type: ' + data.types.map(t => t.type.name).join(', ');

        // Step 6: Update DOM by appending new elements
        card.appendChild(nameElement);
        card.appendChild(imageElement);
        card.appendChild(typeElement);

        // Clear loader and show result
        container.innerHTML = '';
        container.appendChild(card);

    } catch (error) {
        // Step 7: If error (e.g., Pokémon not found), show error message
        container.innerHTML = `<p class="error">${error.message}</p>`;
    }
}
