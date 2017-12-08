import { createStore as reduxCreateStore } from 'redux';
import fire from '../fire';
import _ from 'lodash';

const reducer = (state, action) => {


	if (action.type === `INCREMENT`) {
		return Object.assign({}, state, {
			count: state.count + 1
		});
	}

	if (action.type === `SET_ENTRY_TYPE`) {
		return Object.assign({}, state, {
			currentEntryType: action.entryType
		})
	}


	return state;
};

const initialState = {
	userId: '', // userId will become deprecated..

	caregiverId: '1stBAn853ARfEUgtxwdJ63lkDlK2',
	caregiverEmail: 'rva.christian91@gmail.com',
	caregiverFirst: 'Christian',
	caregiverLast: 'Bryant',

	activePatientId: '1',
	currentEntryType: false,

	patients: [
		{
			patientId: '1',
			firstName: 'Maya',
			lastName: 'Lou',
			info: {

				birthday: '11/08/1991',
				street: '10 S. Crenshaw Ave.',
				city: 'Richmond',
				state: 'VA',
				zipcode: '23220',
				diagnosis: 'Austism',
				gender: 'F',
				profileImageURL: 'http://via.placeholder.com/100x100'
			}
		},
		{
			patientId: '2',
			firstName: 'Sean',
			lastName: 'Schaeffer',
			info: {
				birthday: '06/26/1993',
				street: '3200 W. Clay St.',
				city: 'Richmond',
				state: 'VA',
				zipcode: '23221',
				diagnosis: 'Austism',
				gender: 'M',
				profileImageURL: 'http://via.placeholder.com/100x100'
			}
		},
	],

	rxEntries: [

		{
			date: '12/2/2017',
			time: '7:34PM',
			productType: 'OTC',
			prescribedBy: 'Dr. Bob',
			productName: 'Valerian Root',
			strength: '200mg',
			dose: '10mg',
			timesPerDay: '2x a day, am and pm',
			numberOfDays: 30,
			purpose: 'get back on regular sleep schedule',
			sideEffects: 'moderate to severe nausea',
			helped: 'not really',
			myCost: 30,
			notes: 'some notes here lorem ipsum dolar set amit'
		},
		{
			date: '12/1/2017',
			time: '8:43PM',
			productType: 'Rx',
			prescribedBy: '',
			productName: 'Advil',
			strength: 'Extra Strength',
			dose: '10mg',
			timesPerDay: 'As needed, no more than 4 tablets per day',
			numberOfDays: 0,
			purpose: 'Help ease muscle pain',
			sideEffects: 'none',
			helped: 'yes, a little bit',
			myCost: 30,
			notes: 'some notes here lorem ipsum dolar set amit'
		}

	]




};

const createStore = () =>
	reduxCreateStore(
		reducer,
		initialState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
export default createStore;
