const hardwareToEnumMap = {
    'Power Supply Module 0': 'AlarmSeverityOrZero',
    'Slot 9 -Temp: Temp 1': 'AlarmSeverityOrZero',
    'Slot 9 -Temp: Temp 2': 'AlarmSeverityOrZero',
    'Slot 9 -Temp: Temp 3': 'AlarmSeverityOrZero',
    'Slot 9 - V: PEM IN': 'AlarmSeverityOrZero',
    'Slot 9 - V: PEM OUT': 'AlarmSeverityOrZero',
    'Slot 9 - I: PEM IN': 'AlarmSeverityOrZero',
    'Slot 9 - I: PEN OUT': 'AlarmSeverityOrZero',
    'Slot 9 - P:IN pwer': 'AlarmSeverityOrZero',
    'Slot 9 - P: Out pwr': 'AlarmSeverityOrZero',
    'Power Supply 0': 'AlarmSeverityOrZero',
    'Power Supply 1': 'AlarmSeverityOrZero',
    'Power Supply Module 1': 'AlarmSeverityOrZero',
    'Fan Tray': 'AlarmSeverityOrZero',
    'Slot 11 - RPM: fan0': 'AlarmSeverityOrZero',
    'Slot 11 - RPM: fan1': 'AlarmSeverityOrZero',
    'Slot 11 - RPM: fan2': 'AlarmSeverityOrZero',
    'Slot 11 - P: pwr': 'AlarmSeverityOrZero',
    'subslot 0/1': 'AlarmSeverityOrZero',
    'subslot 0/2': 'AlarmSeverityOrZero',
    'subslot 0/3': 'AlarmSeverityOrZero',
    'subslot 0/4': 'AlarmSeverityOrZero',
    'subslot 0/5': 'AlarmSeverityOrZero',
    'GigabitEthernet 0/0/0': 'AlarmSeverityOrZero',
    'GigabitEthernet 0/0/1': 'AlarmSeverityOrZero',
    'GigabitEthernet 0/0/2': 'AlarmSeverityOrZero',
    'GigabitEthernet 0/0/3': 'AlarmSeverityOrZero',
    'subslot 0/0 transceiver container 0': 'AlarmSeverityOrZero',
    'subslot 0/0 transceiver container 1': 'AlarmSeverityOrZero',
    'subslot 0/0 transceiver container 2': 'AlarmSeverityOrZero',
    'subslot 0/0 transceiver container 3': 'AlarmSeverityOrZero',
    'subslot 0/0 transceiver container 4': 'AlarmSeverityOrZero',
    'subslot 0/0 transceiver container 5': 'AlarmSeverityOrZero',
    'Slot 6 - Temp: Inlet 1': 'AlarmSeverityOrZero',
    'Slot 6 - Temp: Inlet 2': 'AlarmSeverityOrZero',
    'Slot 6 - Temp: outlet 1': 'AlarmSeverityOrZero',
    'Slot 6 - Temp: outlet 2': 'AlarmSeverityOrZero',
    'Slot 6 - Temp: CP-CPU': 'AlarmSeverityOrZero',
    'Slot 6 -V: 12V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 5V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 3.3V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 3.0V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 2.5V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 1.8V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 1.2V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 1.2V_CPU': 'AlarmSeverityOrZero',
    'Slot 6 -V: 1.05V_CPU': 'AlarmSeverityOrZero',
    'Slot 6 -V: 1.05V': 'AlarmSeverityOrZero',
    'Slot 6 -V: 0.6V': 'AlarmSeverityOrZero',
    'Slot 6 -P: pwr': 'AlarmSeverityOrZero',
    'CPU R0/0': 'AlarmSeverityOrZero',
    'USB R0/0': 'AlarmSeverityOrZero',
    'module F0': 'AlarmSeverityOrZero',
    'POE Bay 0': 'AlarmSeverityOrZero',
    'POE Bay 1': 'AlarmSeverityOrZero',
    'Inlet_Temp_Sensor': 'ciscoEnvMonTemperatureState',
    'Outlet_Temp_Sensor': 'ciscoEnvMonTemperatureState',
    'HotSpot_Temp_Sensor': 'ciscoEnvMonTemperatureState',
    'Fan_T1_1': 'ciscoEnvMonFanState',
    'Fan_T1_2': 'ciscoEnvMonFanState',
    'Power_Supply_A': 'ciscoEnvMonSupplyState',
    'Power_Supply_B': 'ciscoEnvMonSupplyState',
    'RingRedundant': 'cswRingRedundant',
    'SwitchRole': 'cswSwitchRole',
    'SwitchState': 'cswSwitchState'
};

const equipmentHardwareMap  = {
    'Power_Supply_Bay_0': ['Power Supply Module 0', 'Slot 9 -Temp: Temp 1', 'Slot 9 -Temp: Temp 2', 'Slot 9 -Temp: Temp 3', 'Slot 9 - V: PEM IN', 'Slot 9 - V: PEM OUT', 'Slot 9 - I: PEM IN', 'Slot 9 - I: PEN OUT', 'Slot 9 - P:IN pwer', 'Slot 9 - P: Out pwr', 'Power Supply 0'],
    'Power_Supply_Bay_1': ['Power Supply Module 1', 'Slot 9 -Temp: Temp 1', 'Slot 9 -Temp: Temp 2', 'Slot 9 -Temp: Temp 3', 'Slot 9 - V: PEM IN', 'Slot 9 - V: PEM OUT', 'Slot 9 - I: PEM IN', 'Slot 9 - I: PEN OUT', 'Slot 9 - P:IN pwer', 'Slot 9 - P: Out pwr', 'Power Supply 1'],
    'Fan_Tray_Bay_0': ['Fan Tray', 'Slot 11 - RPM: fan0', 'Slot 11 - RPM: fan1', 'Slot 11 - RPM: fan2', 'Slot 11 - P: pwr'],
    'Module_0': ['subslot 0/1', 'subslot 0/2', 'subslot 0/3', 'subslot 0/4', 'subslot 0/5'],
    'NIM_Subslot_0_0': ['GigabitEthernet 0/0/0', 'GigabitEthernet 0/0/1', 'GigabitEthernet 0/0/2', 'GigabitEthernet 0/0/3'],
    'Module_1': ['subslot 0/0 transceiver container 0', 'subslot 0/0 transceiver container 1', 'subslot 0/0 transceiver container 2', 'subslot 0/0 transceiver container 3', 'subslot 0/0 transceiver container 4', 'subslot 0/0 transceiver container 5'],
    'Module_R0': ['Slot 6 - Temp: Inlet 1', 'Slot 6 - Temp: Inlet 2', 'Slot 6 - Temp: outlet 1', 'Slot 6 - Temp: outlet 2', 'Slot 6 - Temp: CP-CPU', 'Slot 6 -V: 12V', 'Slot 6 -V: 5V', 'Slot 6 -V: 3.3V', 'Slot 6 -V: 3.0V', 'Slot 6 -V: 2.5V', 'Slot 6 -V: 1.8V', 'Slot 6 -V: 1.2V', 'Slot 6 -V: 1.2V_CPU', 'Slot 6 -V: 1.05V_CPU', 'Slot 6 -V: 1.05V', 'Slot 6 -V: 0.6V', 'Slot 6 -P: pwr'],
    'ETC': ['CPU R0/0', 'USB R0/0', 'module F0', 'POE Bay 0', 'POE Bay 1'],
    'switch1': ['Inlet_Temp_Sensor','Outlet_Temp_Sensor','HotSpot_Temp_Sensor','Fan_T1_1','Fan_T1_2','Power_Supply_A','Power_Supply_B','RingRedundant','SwitchRole','SwitchState'],
    'switch2': ['Inlet_Temp_Sensor','Outlet_Temp_Sensor','HotSpot_Temp_Sensor','Fan_T1_1','Fan_T1_2','Power_Supply_A','Power_Supply_B','RingRedundant','SwitchRole','SwitchState']
};

const complexEquipments = {
    'convertor1': [
        'Power_Supply_Bay_0',
        'Power_Supply_Bay_1',
        'Fan_Tray_Bay_0',
        'Module_0',
        'NIM_Subslot_0_0',
        'Module_1',
        'Module_R0',
        'ETC'
    ],
    'convertor2': [
        'Power_Supply_Bay_0',
        'Power_Supply_Bay_1',
        'Fan_Tray_Bay_0',
        'Module_0',
        'NIM_Subslot_0_0',
        'Module_1',
        'Module_R0',
        'ETC'
    ]
};
const equipmentsForGrid ={
    'switch1' : 'normal',
    'switch2' : 'normal',
    'convertor1' :'complex',
    'convertor2' :'complex'
}
const enumValuesMap = {
    'ciscoEnvMonTemperatureState': {
        '1': 'normal', '2': 'warning', '3': 'critical', '4': 'shutdown', '5': 'notPresent', '6': 'notFunctioning'
    },
    'ciscoEnvMonFanState': {
        '1': 'normal', '2': 'warning', '3': 'critical', '4': 'shutdown', '5': 'notPresent', '6': 'notFunctioning'
    },
    'ciscoEnvMonSupplyState': {
        '1': 'normal', '2': 'warning', '3': 'critical', '4': 'shutdown', '5': 'notPresent', '6': 'notFunctioning'
    },
    'cswRingRedundant': {
        '1': 'true', '2': 'false'
    },
    'cswSwitchRole': {
        '1': 'master', '2': 'member', '3': 'notMember', '4': 'standby'
    },
    'cswSwitchState': {
        '1': 'waiting', '2': 'progressing', '3': 'added', '4': 'ready', '5': 'sdmMismatch',
        '6': 'verMismatch', '7': 'featureMismatch', '8': 'newMasterInit', '9': 'provisioned',
        '10': 'invalid', '11': 'removed'
    },
    'AlarmSeverityOrZero': {
        '1': 'no alarm', '2': 'critical', '3': 'major', '4': 'minor', '5': 'info'
    }
    
};


exports.enumValuesMap = enumValuesMap;
exports.complexEquipments = complexEquipments;
exports.equipmentHardwareMap = equipmentHardwareMap;
exports.hardwareToEnumMap = hardwareToEnumMap;
exports.equipmentsForGrid = equipmentsForGrid;