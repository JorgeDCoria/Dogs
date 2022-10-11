const { Temperament } = require("../db");
const tempCtrl = {};

tempCtrl.getTemperaments = async ( req, res )=>{
  try{
    const temperaments = await Temperament.findAll();
    res.json({
      status: 200,
      data: temperaments
    })
  }catch(e){
    res.json({
      status: 401,
      data: e.message
    })
  }
};

module.exports = tempCtrl;