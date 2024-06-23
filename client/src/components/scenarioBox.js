import React, { useState} from 'react';
import axios from 'axios';

const ScenarioBox = ({setEquipmentState,setModalMessage,setIsModalOpen,scenariosData}) => {
    const [selectedScenario, setSelectedScenario] = useState(null);
  const  handleScenarioClick = async (scenario) => {
    setSelectedScenario(scenario);
    try{
      const scenarioItem = await axios.get(`http://localhost:5000/api/scenario?name=${scenario.name}`);
      const newEquipmentState = JSON.parse(scenarioItem.data.state);
      setEquipmentState(newEquipmentState);
      setModalMessage(`Scenraio Loaded: ${scenario.name}`);
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }
    catch(err){
      console.error(new Error(err));
    }

  };

  return (
    <div className="scenario-box">
      <h2>All Scenarios</h2>
      <div className="scenario-list">
        {scenariosData.map((scenario, index) => (
          <button
            key={index}
            className={`scenario-button ${scenario.name === selectedScenario ? 'selected' : ''}`}
            onClick={() => handleScenarioClick(scenario)}
          >
            <div>
              <div className="scenario-name">{scenario.name}</div>
              <div className="scenario-author">Author: <span className="author-name">{scenario.author}</span></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioBox;
