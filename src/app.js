import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
    apiKey: 'AIzaSyAv-HuB4o0d9LOo4u075s26BqQREny5ZNg',
    authDomain: 'authentication-1950a.firebaseapp.com',
    databaseURL: 'https://authentication-1950a.firebaseio.com',
    projectId: 'authentication-1950a',
    storageBucket: 'authentication-1950a.appspot.com',
    messagingSenderId: '576258401424'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return ( 
					<CardSection>
						<Button 
						onPress={() => firebase.auth().signOut()}
						>
						Log Out
						</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default: 
				return <Spinner size="large" />;
		}
	}
	
	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
