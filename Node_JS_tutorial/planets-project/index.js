const { parse } = require('csv-parse');
const fs = require('fs');


const habitablePlanets = [];

function isHabitablePlanet(planet) {
  // function for condition
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
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
  })
  .on('end', () => {
    console.log(habitablePlanets.map((planet) => {
      return planet['kepler_name']; // help when is map two thing with correct logic
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });



// /////////////
// const results = [];
// fs.createReadStream('kepler_data.csv')
//   .pipe(parse({
//     comment: '#',
//     columns: true,
//   }))
//   .on('data', (data) => {
//     results.push(data);
//   })
//                                 // console.log(results);  
//                                 // Cách console.log ở đây không được vì Trong khi đọ tệp, Node.js ngay lập tức chuyển sang dòng console.log(results);mà không cần đợi quá trình đọc hoàn tất. Tại thời điểm này, resultsvẫn là một mảng trống. 
//   .on('end', () =>{
//     console.log(results);
//   });
// // No chi lay ra dang du lieu buffer va bytes
// ////////////////////