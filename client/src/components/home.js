import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EquipmentGrid from './equipmentsGrid';
import SliderGrid from './sliderGrid';
import ScenarioBox from './scenarioBox';
import Modal from 'react-modal';
import FormForSaveScenario from './formForSaveScenraio';
Modal.setAppElement('#root');


export default function HomePage() {
    const [chosenEquipment, setChosenEquipment] = useState('switch1');
    const [complexEquipmentDisplayed, setComplexEquipmentDisplayed] = useState(null);
    const [enumValuesMap, setEnumValueMap] = useState({});
    const [hardwareToEnumMap, setHardwareToEnumMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [equipmentState, setEquipmentState] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [scenariosData, setScenariosData] = useState([]);
    const [initState,setInitState] = useState();
    const [equipmentsToErrorsNumber,setEquipmentsToErrorsNumber] = useState({
      'switch1' :0,
      'switch2' :0,
      'convertor1' : 0,
      'convertor2' : 0
    });

    const handleOpenForm = () => {
      setIsFormOpen(true);
    };
  
    const handleCloseForm = () => {
      setIsFormOpen(false);
    };
  
    const handleSubmitForm = (name, author) => {
      handleSave(name,author)
      setIsFormOpen(false);
    };


    const handleSave = async (name,author) =>{
      try{
      await axios.post('http://localhost:5000/api/scenario',{name: name,
        author : author,
        state: JSON.stringify(equipmentState)
      })
      setScenariosData([...scenariosData,{name:name,author:author}]); // instead of an API request.
      alert('Data sent successfully!');

    }
    catch(err){
      console.error( new Error(err));
    }
    }
    const handleSend = async () => {
      try {
          await axios.post('http://localhost:5000/saveState', equipmentState);

          alert('Data sent successfully!');
      } catch (err) {
          console.error('Error sending data:', err);
      }
  };

  const handleReset = async () => {
      try {
         setComplexEquipmentDisplayed(null);
         setChosenEquipment('switch1');
          setEquipmentState(initState);
           
      } catch (err) {
          console.error('Error resetting state:', err);
      }
  };

    const handleChange = (hardware, value) => {
        const enumKey = hardwareToEnumMap[hardware] || 'AlarmSeverityOrZero';
        const enumValue = enumValuesMap[enumKey][value];

        const newState = JSON.parse(JSON.stringify(equipmentState));

        if (complexEquipmentDisplayed) {
            if (!newState[complexEquipmentDisplayed]) {
                newState[complexEquipmentDisplayed] = {};
            }
            if (!newState[complexEquipmentDisplayed][chosenEquipment]) {
                newState[complexEquipmentDisplayed][chosenEquipment] = {};
            }
            newState[complexEquipmentDisplayed][chosenEquipment][hardware] = enumValue;
        } else {
            if (!newState[chosenEquipment]) {
                newState[chosenEquipment] = {};
            }
            newState[chosenEquipment][hardware] = enumValue;
        }
        setEquipmentState(newState);
    }

    useEffect(() => {
        async function initState() {
            try { /// maybe promise.all?
                const stateResponse = await axios.get('http://localhost:5000/initState');
                setEquipmentState(stateResponse.data); 
                setInitState(stateResponse.data);
                const responseEnumValuesMap = (await axios.get('http://localhost:5000/enumValuesMap'));
                setEnumValueMap(responseEnumValuesMap.data);
                const responseHardwareToEnumMap = (await axios.get('http://localhost:5000/hardwareToEnumMap'));
                setHardwareToEnumMap(responseHardwareToEnumMap.data);
                const responseScenraiosNamesAndAuthors = await axios.get('http://localhost:5000/api/scenraiosNamesAndAuthors');
                setScenariosData(responseScenraiosNamesAndAuthors.data);  
                  
            } catch (err) {
                console.error('Error fetching initial state:', err);
            }
        }

        initState();
        setTimeout(() => {
          setLoading(false)
                }, 1000);   
    }, []);

    return (
        <div className='app-container'>
                {loading ? (
        <p>Loading...</p>) : (
          <>
          {isFormOpen ? (<>     <FormForSaveScenario
        isOpen={handleOpenForm}
        onRequestClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      /> </>) : <></>}
     
          <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Scenario Selected"
        className="notification-modal"
        overlayClassName="notification-overlay"
      >
        <h2>{modalMessage}</h2>
      </Modal>
          <EquipmentGrid
          equipmentsToErrorsNumber ={equipmentsToErrorsNumber}
          setComplexEquipmentDisplayed={setComplexEquipmentDisplayed}
          complexEquipmentDisplayed={complexEquipmentDisplayed}
          setChosenEquipment={setChosenEquipment}
      />
       <SliderGrid
      chosenEquipment={chosenEquipment}
      handleEquipmentStateChangeInHome={handleChange}
      equipmentState={equipmentState}
      complexEquipmentDisplayed={complexEquipmentDisplayed}
      enumValuesMap={enumValuesMap}
      hardwareToEnumMap={hardwareToEnumMap}
  />
  <ScenarioBox scenariosData ={scenariosData} setEquipmentState={setEquipmentState} setIsModalOpen={setIsModalOpen} setModalMessage={setModalMessage}></ScenarioBox>
       <div className="button-container">
                <button className='container-send' onClick={handleSend} style={{backgroundColor:'green'}}>Send To Files</button>
                <button  className='container-save' onClick={() => setIsFormOpen(true)}style={{backgroundColor:'blue'}}>Save Scenraio</button>
                <button className='container-red' onClick={handleReset}style={{backgroundColor:'red'}}>Reset</button>
            </div>
      </>
      
 )}
          
        </div>
    );
}
