import React, { Component } from "react";
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
// import Input from "galio-framework"
import { Layout, Input, Button } from "react-native-ui-kitten";

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = errors => {
	let valid = true;
	Object.values(errors).forEach(val => val.length > 0 && (valid = false));
	return valid;
};

export default class FormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: null,
			email: null,
			password: null,
			errors: {
				fullName: "",
				email: "",
				password: ""
			}
		};
	}

	handlePress = () => {
		if (this.isNotEmpty()) {
			if (validateForm(this.state.errors)) {
				Keyboard.dismiss();
				alert("Created successfully.");
			}
		} else {
			validateForm(this.state.errors);
		}
	};

	handleChange = (field, value) => {
		let errors = this.state.errors;

		switch (field) {
			case "fullName":
				errors.fullName = value.length < 5 ? "Full Name must be 5 characters long!" : "";
				break;
			case "email":
				errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
				break;
			case "password":
				errors.password = value.length < 8 ? "Password must be 8 characters long!" : "";
				break;
			default:
				break;
		}

		this.setState({ errors, [field]: value });
	};

	isNotEmpty = () => {
		const { fullName, email, password } = this.state;
		let isNoError = true;

		if (!fullName) {
			this.setState(prevState => ({
				errors: {
					...prevState.errors,
					fullName: "Full Name is required."
				}
			}));
			isNoError = false;
		}
		if (!email) {
			this.setState(prevState => ({
				errors: {
					...prevState.errors,
					email: "Email Address is required."
				}
			}));
			isNoError = false;
		}
		if (!password) {
			this.setState(prevState => ({
				errors: {
					...prevState.errors,
					password: "Password is required."
				}
			}));
			isNoError = false;
		}

		return isNoError;
	};

	render() {
		const { fullName, email, password, errors } = this.state;

		return (
			<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<Layout style={styles.container}>
						<Input
							value={fullName}
							label="Full Name"
							captionTextStyle={styles.captionTextStyle}
							caption={errors.fullName.length > 0 && errors.fullName}
							status={errors.fullName.length > 0 ? "danger" : ""}
							onChangeText={value => this.handleChange("fullName", value)}
						/>
						<Input
							value={email}
							label="Email Address"
							keyboardType="email-address"
							autoCapitalize="none"
							captionTextStyle={styles.captionTextStyle}
							caption={errors.email.length > 0 && errors.email}
							status={errors.email.length > 0 ? "danger" : ""}
							onChangeText={value => this.handleChange("email", value)}
						/>
						<Input
							value={password}
							label="Password"
							secureTextEntry
							captionTextStyle={styles.captionTextStyle}
							caption={errors.password.length > 0 && errors.password}
							status={errors.password.length > 0 ? "danger" : ""}
							onChangeText={value => this.handleChange("password", value)}
						/>
						<Button style={styles.btn} onPress={this.handlePress}>
							Submit
						</Button>
						<Button style={styles.btn} onPress={() => this.props.toggleTheme()}>
							Change Theme
						</Button>
					</Layout>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 10
	},
	captionTextStyle: {
		color: "red"
	},
	btn: {
		marginVertical: 5
	}
});
