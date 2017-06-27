import Alert from 'react-s-alert';

export function showAlert(message) {
	Alert.success(message, {
		position: 'top',
		effect: 'stackslide',
		timeout: 1000
	});
}