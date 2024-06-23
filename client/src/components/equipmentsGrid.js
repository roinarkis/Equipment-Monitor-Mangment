import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function EquipmentGrid({setChosenEquipment,complexEquipmentDisplayed,setComplexEquipmentDisplayed,equipmentsToErrorsNumber}) {
  const [equipmentsForGrid, setEquipmentsForGrid] = useState({});
  const [complexEquipments, setComplexEquipments] = useState({});


  async function getDataForGrid() {
    try {
      const responseEquipmentsForGrid = await axios.get('http://localhost:5000/equipmentsForGrid');
      setEquipmentsForGrid(responseEquipmentsForGrid.data);
      const responseComplexEquipments = await axios.get('http://localhost:5000/complexEquipments');
      setComplexEquipments(responseComplexEquipments.data);
    } catch (err) {
      console.error(new Error(err));
    }
  }
  function resetButtonColorToWhite(){
    const buttons = document.querySelectorAll('button'); // not the best idea :)
    buttons.forEach(button => {
      if(!button.className.includes('container') && !button.className.includes('scenario'))
      button.style.backgroundColor = 'white'; 
    });
  }

  useEffect(() => {
  
    getDataForGrid();
  },[]);

  function handleOnClick(key) {
    resetButtonColorToWhite();
    const buttons = document.querySelectorAll('button'); 
    console.log(buttons)
    buttons.forEach(button => {
        if(button.id === key){
      button.style.backgroundColor = 'blue'; 
        }
    });
    if (complexEquipments[key]) {
      setComplexEquipmentDisplayed(key);
        }
        else
        {
           if(Object.keys(equipmentsForGrid).includes(key)){
            setComplexEquipmentDisplayed(null);
           }
           setChosenEquipment(key);

        }
  }
  function getBackgroundColor(key){
    if(key === 'switch1'){
      return 'blue';
    }
      return 'white';
  }

  return (
    <div className="equipment-grid-container">
      <h2>Choose Equipment</h2>
    <div className="app-container">
      <div className="button-grid">
        {Object.entries(equipmentsForGrid).map(([key, value]) => (
          <button
            key={key}
            id={key}
            onClick={() => handleOnClick(key)}
           style={{ backgroundColor: getBackgroundColor(key) }}
           >

            {key}({equipmentsToErrorsNumber[key] || 0})
          </button>
        ))}
      </div>
      {complexEquipmentDisplayed && (
        <div className="button-grid nested">
            <h1>{complexEquipmentDisplayed}</h1>
          {complexEquipments[complexEquipmentDisplayed].map((nestedKey) => (
            <button key={nestedKey} id={nestedKey} onClick={() => handleOnClick(nestedKey)}>
              {nestedKey} 
            </button>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
