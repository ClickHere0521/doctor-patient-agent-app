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

const patientInfoAction = (pInfo) => {
	return {
		type: types.SET_PATIENT_INFO,
		payload: { pInfo }
	};
};

const attorneyInfoAction = (attorneyInfo) => {
	return {
		type: types.SET_ATTORNEY_INFO,
		payload: { attorneyInfo }
	};
};

const insuranceInfoAction = (insuranceInfo) => {
	return {
		type: types.SET_INSURANCE_INFO,
		payload: { insuranceInfo }
	};
};

const noteInfoAction = (noteInfo) => {
	return {
		type: types.SET_NOTE_INFO,
		payload: { noteInfo }
	};
};

const changeCaseStatusAction = (caseStatus) => {
	return {
		type: types.CHANGE_CASESTATUS,
		payload: { caseStatus }
	};
};

export { roleSelector, patientInfoAction, attorneyInfoAction, insuranceInfoAction, noteInfoAction };