document.addEventListener('DOMContentLoaded', async () => {

    let params = new URL(document.location.toString()).searchParams;
    let id = params.get("id");
    console.log(id);
    let pokemon = await getData(id);
    document.querySelector(".card-title").textContent=pokemon.name;
    document.querySelector(".card-img-top").src=pokemon.image;
    document.querySelector("#height").textContent=pokemon.height+" pouces";
    document.querySelector("#weight").textContent=pokemon.weight/10+" kg";
    document.querySelector("#types").textContent = pokemon.types;
    console.log(pokemon);
});