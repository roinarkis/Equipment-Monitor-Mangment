import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import '../App.css';

export default function SliderGrid({ chosenEquipment,handleEquipmentStateChangeInHome, equipmentState, complexEquipmentDisplayed, enumValuesMap,hardwareToEnumMap}) {
    const [equipmentHardwareMap, setEquipmentHardwareMap] = useState({});
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function getDataToSliderGrid() {
            try {
                const equipmentResponse = await axios.get('http://localhost:5000/equipmentHardwareMap');
                setTimeout(() =>{
                    setLoading(false)

                },500)
                setEquipmentHardwareMap(equipmentResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        }

        getDataToSliderGrid();
    }, []);

    function getEquipmentName() {
        return chosenEquipment.includes('-') ? chosenEquipment.split('-')[1].trim() : chosenEquipment.trim();
    }

    function getEnumKey(attribute) {
        return hardwareToEnumMap[attribute];
    }


    const equipmentStateForDisplay =  complexEquipmentDisplayed
        ? equipmentState[complexEquipmentDisplayed]?.[chosenEquipment] || {}
        : equipmentState[chosenEquipment] || {}


    return (
        <div className="slider-container">
            <h2>{chosenEquipment}</h2>
            {loading ? (<p>loading ...</p>) : (<div className="slider-wrapper">
                {
                equipmentHardwareMap[getEquipmentName()].map((attribute) => {
                    
                    const enumKey = getEnumKey(attribute);
                    const enumValue = enumValuesMap[enumKey];
                    const sliderValue = Object.keys(enumValue).find(key => enumValue[key] === equipmentStateForDisplay[attribute]) || 1;

                    return (
                        <div key={attribute} className="slider-item">
                            <h3>{attribute}</h3>
                            <Slider
                                min={1}
                                max={Object.keys(enumValue).length}
                                value={parseInt(sliderValue, 10)}
                                onChange={(newValue) => handleEquipmentStateChangeInHome(attribute, newValue)}
                            />
                            <span className="slider-value">{enumValue[sliderValue]}</span>
                        </div>
                    );
                })}
            </div>)}
            
        </div>
    );
}
