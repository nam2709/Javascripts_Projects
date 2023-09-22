// const { rejects } = require('assert');
const { parse }  = require('csv-parse');
const fs = require('fs');
const path = require('path');


const habitablePlanets = [];

function isHabitablePlanet(planet) {
  // function for condition
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

// const promises = new Promise((resolve, reject) => {
//     resolve(42);
// });
// promises.then

function loadPlanetData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))  // readable.pipe(writeable) pipe(parse({) -> change it to a Objects and data is many list ocjects so the col is Opjects['name-col']
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
            }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
                resolve();
            });
    });
}


module.exports = {
    loadPlanetData,
    planets: habitablePlanets,
  };
  

