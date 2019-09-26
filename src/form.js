import React, { Component } from 'react'
import { Text, TouchableOpacity, ActivityIndicator, Keyboard, Easing, Animated, View, TextInput } from 'react-native'
import * as HOC from '../HOC';
import styles from './style';

const KeyboardAwareView = HOC.KeyboardAwareHOC(View)
const colorDiffOutputRange = ['rgba(168, 235, 18, 0.8)', 'rgba(5, 25, 55, 0.8)']
export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            width: new Animated.Value(100),
            login_success: false,
            username_border_color: 'rgba(0,0,0,0.2)',
            password_border_color: 'rgba(0,0,0,0.2)'
        }
    }


    signIn = () => {
        this.setState({ loading: true })
        this.onFocus();
        Keyboard.dismiss()

        this.buttonAnimation(15)
        setTimeout(() => {
            this.buttonAnimation(100)
        }, 1500)

    }

    buttonAnimation = (value) => {
        Animated.timing(this.state.width, {
            toValue: value,
            duration: 1000,
            easing: Easing.linear,
        }).start(() => {
            if (value !== 100) return;
            this.setState({ loading: false, login_success: true })
        });
    }


    onFocus = (key1 = null, key2 = null) => {
        this.setState({
            username_border_color: key1 ? key1 : 'rgba(0,0,0,0.2)',
            password_border_color: key2 ? key2 : 'rgba(0,0,0,0.2)'
        })
    }

    render() {
        return (
            <KeyboardAwareView styleDuringKeyboardShow={styles.styleDuringKeyboardShow}>

                <TextInput
                    ref={(ref) => { this.UsernameInput = ref; }}
                    returnKeyType={'next'}
                    onFocus={() => { this.onFocus('rgba(5, 25, 55, 0.8)', 'rgba(0,0,0,0.2)') }}
                    onSubmitEditing={() => { this.PasswordInput.focus() }}
                    placeholder="Username"
                    style={[styles.textInput, { borderColor: this.state.username_border_color }]}
                />



                <TextInput
                    ref={(ref) => { this.PasswordInput = ref; }}
                    returnKeyType={'send'}
                    placeholder="Password"
                    keyboardAppearance={'dark'}
                    onSubmitEditing={this.signIn}
                    secureTextEntry={true}
                    onFocus={() => { this.onFocus('rgba(0,0,0,0.2)', 'rgba(5, 25, 55, 0.8)') }}
                    style={[styles.textInput, { borderColor: this.state.password_border_color }]}
                />

                <TouchableOpacity onPress={this.signIn} style={{ alignItems: 'center', marginTop: 10 }}>

                    <Animated.View style={[styles.buttonView, {
                        width: this.state.width.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '1%'],
                        }),
                        backgroundColor: this.state.width.interpolate({
                            inputRange: [40, 100],
                            outputRange: colorDiffOutputRange,
                        }),

                    }]}>
                        {
                            this.state.loading ?
                                <ActivityIndicator color={'white'} />
                                :
                                <Text style={styles.buttonText}>{this.state.login_success ? 'SUCCESS' : 'SIGN IN'}</Text>
                        }
                    </Animated.View>

                </TouchableOpacity>

            </KeyboardAwareView>
        )
    }
}
