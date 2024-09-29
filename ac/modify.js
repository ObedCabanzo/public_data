const fs = require('fs');

// Lista de temas por categoría
const themesByCategory = {
    1: ["música rock", "música clásica", "música electrónica", "conciertos acústicos", "jazz vivo"],
    2: ["festivales electrónicos", "festivales rock", "festivales jazz", "festivales folclóricos", "festivales indie"],
    3: ["conferencias tecnología", "conferencias innovación", "conferencias marketing", "conferencias sostenibilidad", "conferencias emprendimiento"],
    4: ["talleres cocina", "talleres escritura", "talleres cerámica", "talleres fotografía", "talleres diseño"],
    5: ["torneos fútbol", "campeonatos baloncesto", "maratones", "clases yoga", "deportes extremos"],
    6: ["exposiciones arte", "exposiciones abstracto", "ferias arte", "arte callejero", "muestras fotografía"],
    7: ["cine independiente", "cine documental", "cine terror", "cine animación", "festivales cine"],
    8: ["ferias gastronómicas", "rutas gastronómicas", "degustaciones vinos", "food trucks", "cocina internacional"],
    9: ["eventos caridad", "subastas benéficas", "caminatas solidarias", "galas caridad", "campañas recaudación"],
    10: ["ferias tecnología", "hackathons", "lanzamientos tecnológicos", "conferencias IA", "exposiciones innovación"],
    11: ["eventos networking", "ferias empleo", "charlas motivacionales", "convenciones startups", "conferencias emprendimiento"],
    12: ["teatro clásico", "teatro contemporáneo", "teatro musical", "comedias teatrales", "teatro experimental"],
    13: ["fiestas temáticas", "fiestas disfraces", "fiestas año nuevo", "fiestas al aire", "fiestas música"],
    14: ["ceremonias religiosas", "retiros espirituales", "conferencias interreligiosas", "festividades religiosas", "grupos bíblicos"],
    15: ["torneos videojuegos", "lanzamientos juegos", "juegos mesa", "competencias e-sports", "talleres videojuegos"],
    16: ["reuniones familiares", "picnics familiares", "fiestas cumpleaños", "celebraciones aniversarios", "reuniones aire libre"],
    17: ["desfiles moda", "semanas moda", "concursos diseño", "exhibiciones alta costura", "ferias moda"],
    18: ["viajes aventura", "viajes culturales", "viajes ecoturismo", "viajes gastronómicos", "viajes lujo"],
    19: ["festivales culturales", "muestras danza", "ferias artesanales", "conciertos folclóricos", "eventos cultura"],
    20: ["eventos bienestar", "retiros meditación", "clases fitness", "ferias salud", "talleres mindfulness"]
};

// Leer el JSON desde MOCK_DATA.json
fs.readFile('MOCK_DATA.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    const jsonData = JSON.parse(data);

    // Función para seleccionar al azar uno o dos índices de temas por cada categoría
    function getRandomThemeIndices(categories) {
        const themeIndices = {};
        categories.forEach(categoryId => {
            const themes = themesByCategory[categoryId];
            const randomCount = Math.floor(Math.random() * 2) + 1; // 1 o 2
            const shuffledIndices = Array.from(themes.keys()).sort(() => 0.5 - Math.random()).slice(0, randomCount);
            themeIndices[categoryId] = shuffledIndices;
        });
        return themeIndices;
    }

    // Crear el nuevo JSON
    const around_the_corner_data = jsonData.map(item => {
        const categoriesObject = getRandomThemeIndices(item.categories);
        return {
            id: item.id,
            name: item.name,
            categories: categoriesObject,
            price: item.price,
            latitude: item.latitude,
            longitude: item.longitude,
            description: item.description,
            author: item.author,
            address: item.address,
            date: item.date,
            time: item.time
        };
    });

    // Guardar el JSON en un archivo
    fs.writeFile('around_the_corner_data.json', JSON.stringify(around_the_corner_data, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {
            console.log('Archivo guardado como around_the_corner_data.json');
        }
    });
});
