const { Dog, Op, Temperament } = require("../db.js");
const axios = require('axios');

const dogCtrl = {};
const URL = "https://api.thedogapi.com/v1/breeds";

/**
 * Funcion que recibe un objeto con todos los atributos de la api y retorna
 * un objeto solo con los datos necesarios
 * @param {Dog} dog objeto dog traido de la api 
 * @returns {Dog} objeto mapeado
 */
const mapApiToDog = (dog) => {
  return {
    id: dog.id,
    name: dog.name,
    weight: dog.weight.metric,
    height: dog.height.metric,
    life_span: dog.life_span,
    image: dog.image.url
  }
}

/**
 * Permite realizar busquedas exactas segun sea la propiedad y el valor pasados como
 * argumentos
 * @param {Array<Dog>} dogs 
 * @param {String} prop nombre de la propiedad a buscar 
 * @param {any} value el valor depende de la propiedad requerida
 * @returns {Dog} objeto encontrado, en caso de haber coincidencias su retorno sera null
 */
const findDogByProp = (dogs, prop, value) => {
  return dogs.find(e => e[prop] === value);
}

/**
 * Permite realizar la busqueda de razas coincidentes en el arreglo pasado como argumento.
 * 
 * @param {Array<Dog>} dogs array en el cual se realiza la busqueda
 * @param {String} value valor de raza a buscar 
 * @returns {Array<Dog>} array con las coincidencias encontradas
 */
const findDogByRaza = (dogs, value) => {
  const dogsFound = dogs.filter(dog => dog.name.toLowerCase().includes(value));
  return dogsFound;
};


dogCtrl.getDogs = async (req, res) => {
  try {
    console.log("PARAMSSSSS: " + req.query.name);
    let dogRaza;
    let dogRazaApi;
    if (req.query.name) {
      dogRaza = await Dog.findAll({
        where: { name: { [Op.like]: `%${req.query.name}%` }} ,
        include: {model: Temperament, through:{attributes: []}} 
      });
      dogRazaApi = await axios.get((URL)).then(r => findDogByRaza(r.data, req.query.name.toLowerCase()));
      console.log(dogRazaApi);
      dogRaza = [...dogRaza,...dogRazaApi ];
      res.json(dogRaza.length ?
        {
          status: 200,
          data: dogRaza
        } :
        {
          status: 401,
          data: 'No Dogs Found!'
        });
    } else {
      const dogsBd = await Dog.findAll({include: {model: Temperament, through: {attributes:[] }}});
      const dogsApi = await axios.get(URL).then(res => res.data.map(dog => mapApiToDog(dog)));
      res.json([...dogsBd,...dogsApi]);
    }
  } catch (e) {
    res.status(401).json({
      error: e.message
    })
  }


};

dogCtrl.getDogById = async (req, res) => {
  try {
    if (req.params.id) {
      let dog;
      if (!isNaN(req.params.id)) {
        console.log("parametro de tipo numero");
        dog = await axios.get(URL).then(r => findDogByProp(r.data, 'id', parseInt(req.params.id)));
      } else {
        dog = await Dog.findOne({ where: { id: req.params.id } , include: {model: Temperament, through: {attributes:[]}}});
        console.log(dog);
      }
      if (dog) {
        res.json({
          status: 200,
          data: dog
        })
      } else {
        res.json({
          status: 401,
          data: "Not found!"
        })
      }

    } else {
      throw ("No se recibio Id");
    }
  } catch (e) {
    res.json({
      status: 400,
      error: e.message
    })
  }
};

dogCtrl.addDog = async (req, res) => {
  try {
    const {temperaments} = req.body;
    console.log(temperaments);
    const newDog = await Dog.create(req.body);
    await newDog.addTemperaments(temperaments);
    res.json({
      status: 200,
      dog: newDog
    });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }

}

module.exports = dogCtrl;