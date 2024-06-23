    const express = require('express');
    const cors = require('cors')
    const path = require('path')
    const fs = require('fs')
    const router = require('./routers/scenrioRouter');
    require('dotenv').config();
    const app = express();
    const corsOptions = {
        origin: 'http://localhost:3000', // Restrict CORS to this origin
        optionsSuccessStatus: 200 // Some legacy browsers choke on 204
    };
    
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use('/api',router);
const {enumValuesMap,equipmentsForGrid,complexEquipments,equipmentHardwareMap,hardwareToEnumMap,} = require('./hardCodedData');
    const port =process.env.PORT || 5000 ;

    app.get('/equipmentsForGrid',(req,res) =>{
          return res.status(200).send(equipmentsForGrid)

    })
    
    app.get('/enumValuesMap',(req,res) =>{
        return res.status(200).send(enumValuesMap)

    })
    app.get('/complexEquipments',(req,res) =>{
        return res.status(200).send(complexEquipments)

    })
    app.get('/equipmentHardwareMap',(req,res) =>{
        return res.status(200).send(equipmentHardwareMap)

    })
    app.get('/hardwareToEnumMap',(req,res) =>{
        return res.status(200).send(hardwareToEnumMap)

    })
    app.get('/initState', (req,res) =>{
        const state = {};

        for (const [complexEquipment, equipmentList] of Object.entries(complexEquipments)) {
            state[complexEquipment] = {};
    
            equipmentList.forEach(equipment => {
                state[complexEquipment][equipment] = {};
    
                equipmentHardwareMap[equipment].forEach(hardware => {
                    const enumKey = hardwareToEnumMap[hardware] || 'AlarmSeverityOrZero';
                    const minValue = Math.min(...Object.keys(enumValuesMap[enumKey]).map(Number));
                    const minEnumValue = enumValuesMap[enumKey][minValue];
    
                    state[complexEquipment][equipment][hardware] = minEnumValue;
                });
            });
        }
        for (const [equipment, type] of Object.entries(equipmentsForGrid)) {
            if (type === 'normal') {
                state[equipment] = {};
    
                equipmentHardwareMap[equipment].forEach(hardware => {
                    const enumKey = hardwareToEnumMap[hardware] || 'AlarmSeverityOrZero';
                    const minValue = Math.min(...Object.keys(enumValuesMap[enumKey]).map(Number));
                    const minEnumValue = enumValuesMap[enumKey][minValue];
    
                    state[equipment][hardware] = minEnumValue;
                });
            }
        }
        return res.status(200).send(state)

    })

    app.post('/saveState', (req, res) => {
        const state = req.body;
        const outputPath = 'txt files';
        const normalEquipments = Object.keys(equipmentsForGrid).filter(equipment => equipmentsForGrid[equipment] ==='normal')
        const complexEquipmentsNames = Object.keys(equipmentsForGrid).filter(equipment =>equipmentsForGrid[equipment] ==='complex')
        // Create files for switch1 and switch2
        normalEquipments.forEach(equipment => {
            const lines = equipmentHardwareMap[equipment].map(attribute => {
                const enumName = hardwareToEnumMap[attribute];
                const value = state[equipment]?.[attribute] || 'undefined';
                return `${enumName}, ${equipment}, ${attribute}, ${value}`;
            });
    
            const filePath = path.join(outputPath, `${equipment}.txt`);
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        });
    
        // Create files for convertor1 and convertor2
        complexEquipmentsNames.forEach(complexEquip => {
            let lines = [];
    
            complexEquipments[complexEquip].forEach(component => {
                const attributes = equipmentHardwareMap[component] || [];
                attributes.forEach(attribute => {
                    const enumName = hardwareToEnumMap[attribute];
                    const value = state[complexEquip]?.[component]?.[attribute] || 'undefined';
                    lines.push(`${enumName}, ${component}, ${attribute}, ${value}`);
                });
            });
    
            const filePath = path.join(outputPath, `${complexEquip}.txt`);
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        });
    
        res.sendStatus(200);
    });

    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
})