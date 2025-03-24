// Ajouter ici le code pour gérer IndexedDB


async function createDB() {
  // Using https://github.com/jakearchibald/idb
  const db = await idb.openDB('pokedb', 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // Utilise la "old version" pour éxécuter le code correspondant
    switch(oldVersion) {
     case 0:
       // Placeholder to execute when database is created (oldVersion is 0)
     case 1:
       // Create a store of objects
       const store = db.createObjectStore('pokemon', {
         // The `id` property of the object will be the key, and be incremented automatically
           autoIncrement: false,
           keyPath: 'id'
       });
       // Create an index called `name` based on the `type` property of objects in the store
       store.createIndex('name', 'name');
       store.createIndex('height', 'height');
       store.createIndex('weight', 'weight');
       store.createIndex('image', 'image');
       store.createIndex('types', 'types');
     }
   }
  });
}

async function addData(pooke) {
  const db = await idb.openDB("pokedb");
  
  const tx = await db.transaction('pokemon', 'readwrite');
  const store = tx.objectStore('pokemon');
  store.put(pooke);
  // Si on veut bloquer sur seulement l'ajout et pas la modif et garder la première version on utilise
  //store.add(pooke);
  await tx.done;
  console.log("ajout réussi");
}

async function getDatas() {
  const db = await idb.openDB("pokedb");
  const tx = await db.transaction('pokemon', 'readonly')
// Because in our case the `id` is the key, we would
// have to know in advance the value of the id to
// retrieve the record
  const values = await db.getAll("pokemon");
  console.log(values);
  return values;
}


async function getData(id) {
  const db = await idb.openDB("pokedb");
  const tx = await db.transaction('pokemon', 'readonly')
// Because in our case the `id` is the key, we would
// have to know in advance the value of the id to
// retrieve the record
  const value = await db.get("pokemon", Number(id));
 
  return value;
}