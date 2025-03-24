document.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('pokemon-list');
    // Ajouter ici l'enregistrement des données dans IndexedDB
    let pokemons = await getDatas();
    
    pokemons.forEach(pokemon =>{
        console.log(pokemon);
        const li = document.createElement('li');
        const a = document.createElement("a");
        a.href = "/pwa-pokemon/public/detail.html?id="+pokemon.id;
        a.textContent=pokemon.name;
        console.log(a);
        li.appendChild(a);
        list.appendChild(li);
    });
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();
    
    let compteur = 1;
    data.results.forEach(async pokemon => {
        const response2 = await fetch(pokemon.url);
        const data2 = await response2.json();
        
        let types = [];

        data2.types.forEach(myData=> {
            types.push(myData.type.name);
        });
        const pooke = {
            name: pokemon.name,
            height: data2.height,
            weight: data2.weight,
            image: data2.sprites.front_default,
            types: types,
            id: data2.id
        };
        addData(pooke);
        
    });

    
    //createDB();
});
