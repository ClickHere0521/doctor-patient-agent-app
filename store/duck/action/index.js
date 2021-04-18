import types from './types';

const roleSelector = (role) => {
	switch (role) {
		case 'agent':
			return {
				type: types.AGENT_ROLE
			};			
		case 'patient':
			return {
				type: types.PATIENT_ROLE
			};
		case 'doctor':
			return {
				type: types.DOCTOR_ROLE
			};
		default:
			break;
	}

};

export { roleSelector };