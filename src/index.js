import React, { Component } from 'react'
import { Keyboard, Easing, Animated, View, KeyboardAvoidingView } from 'react-native'

import * as HOC from '../HOC';
import styles from './style';
import Form from './form';
import LogoView from './logoView';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);


class Login extends Component {

    render() {
        return (
            <DismissKeyboardView style={styles.dismissKeyboardView}>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

                    <LogoView />

                    <Form />

                </KeyboardAvoidingView>


            </DismissKeyboardView >
        )
    }
}

export default Login