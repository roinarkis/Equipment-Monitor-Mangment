const mongoose = require('mongoose');
const express = require('express')
mongoose.connect('mongodb://localhost/EquipmentMangment')
.then(() => console.log('Connected to MongoDB..'))
.catch(err => console.error(`Could not connetct to MongoDB${err}`));
const { Schema } = mongoose;

const router = express.Router();


const scenrioSchema = new mongoose.Schema({
    name : {type: String,
        minLength : 3,
        maxLength : 50,
        required : true
    },
    author : {type: String,
        minLength : 2,
        maxLength : 50,
        required : true
    },
    state : {type: Object}
}) 
const Scenario = mongoose.model('scenario', scenrioSchema);

const nameAlreadyExist = async (name) => {
    const scenarios = await getAllScenarios();
    const scenarioNames = scenarios.map((scenraio) => (scenraio.name));   
    console.log(scenarioNames); 
    if(scenarioNames.includes(name)){
        return true;
    }
    return false;

}
const getScenrioByName  = async (scenarioName) =>{
    return await Scenario.findOne({ name: scenarioName });
}
const getAllScenarios  = async () =>{
    return await Scenario.find();
}

router.get('/scenraiosNamesAndAuthors',async (req,res) =>{
    const scenarios = await getAllScenarios();
    const scenarioNamesAndAuthors = scenarios.map(({name,author}) => ({name,author}));
    console.log(scenarioNamesAndAuthors);
    return res.status(200).send(scenarioNamesAndAuthors);
})
router.post('/scenario',async (req,res) =>{
    console.log(req.body);
    if(!req.body.name || !req.body.author || !req.body.state){
        return res.state(400).send('bad request')
    }
   if( await nameAlreadyExist(req.body.name)){
    return res.status(400).send('Name of scenrio Already exist')
   }
    const newScenrio = Scenario({
        name: req.body.name,
        author : req.body.author,
        state : req.body.state
    });
    console.log
    newScenrio.save();
    console.log('save succesfully')
    return res.status(201).send(newScenrio);
})

router.get('/scenario', async (req, res) => {
    const scenarioName = req.query.name;
    if (!scenarioName) {
      return res.status(400).send('bad request');
    }
    const scenario = await getScenrioByName(scenarioName);
    if (scenario) {
      return res.status(200).send(scenario);
    }
    return res.status(404).send('scenario not found');
  });
  

module.exports = router;


