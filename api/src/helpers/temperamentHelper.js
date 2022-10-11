const axios = require("axios");
const { Temperament } = require("../db.js");
const expressionRegular = /\s*,\s*/;

/**
 * function definida para realizar el mapeo necesario para obtener los solo datos
 * necesarios  
 * @param {temperament} array Recibe un array con los datos de la api  
 * @returns {Array<Temperament>} retorna una array de objetos, ordenados,  con la propiedad name de cada temperament
 */
function extractTemperament(array) {
  let setTemp = new Set();

  array.forEach(e => {
    if (typeof e !== 'undefined') {
      let aux = e.split(expressionRegular);
      aux.forEach(t => setTemp.add(t));
    }
  });
  return Array.from(setTemp).sort().map(t => {
    return { name: t }
  });
}
/**
 * Funcion que valida si existen temperamentos en la bd, en caso de no existir,
 * este hace una peticion a la api y agrega los temperament a la bd.
 */
  const addTemperaments = async () => {
  try {
    let alltemperaments = await Temperament.findAll();
    if (!alltemperaments.length) {
      alltemperaments = await axios.get("https://api.thedogapi.com/v1/breeds").then(res => res.data.map(t => t.temperament));
      await Temperament.bulkCreate(extractTemperament(alltemperaments));
      console.log("temperamentos agregados");
    }else{
      console.log("Ya existen temperamentos")
    }

  } catch (e) {
    throw e;
  }
}

module.exports = addTemperaments;