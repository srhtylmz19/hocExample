import React, { Component } from 'react'
import { Text, TouchableOpacity, Keyboard, ActivityIndicator, Easing, Animated, View, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'

import * as HOC from './HOC';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);

const KeyboardAwareView = HOC.KeyboardAwareHOC(View)
const KeyboardAwareImage = HOC.KeyboardAwareHOC(Image)



export default class Deneme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            width: new Animated.Value(100),
            login_success: false
        }
    }

    signIn = () => {
        this.setState({ loading: true })

        Keyboard.dismiss()

        Animated.timing(this.state.width, {
            toValue: 15,
            duration: 1000,
            easing: Easing.linear,
        }).start();

        setTimeout(() => {
            Animated.timing(this.state.width, {
                toValue: 100,
                duration: 1000,
                easing: Easing.linear,
            }).start(() => {
                this.setState({ loading: false, login_success: true })
            });
        }, 1500)

    }
    render() {
        return (
            <DismissKeyboardView
                style={{
                    flex: 1,
                    paddingHorizontal: 26,
                    paddingTop: 26,
                }}>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

                    <KeyboardAwareView
                        style={{ flex: 1 }}
                        styleDuringKeyboardShow={{ marginBottom: 10 }}
                    >
                        <KeyboardAwareImage
                            resizeMode="contain"
                            style={{ height: '100%', width: '100%' }}
                            styleDuringKeyboardShow={{ opacity: 0.8 }}
                            source={require('./assets/images/gembul.png')}
                        />
                    </KeyboardAwareView>

                    <TextInput
                        keyboardAppearance={'dark'}
                        returnKeyType={'next'}
                        onSubmitEditing={()=> {
                            this.PasswordInput.focus()
                        }}
                        placeholder="Username" style={{
                            height: 40,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#bdbdbd',
                            paddingHorizontal: 20,
                        }} />
                    <TextInput
                        keyboardAppearance={'light'}
                        ref={(ref) => { this.PasswordInput = ref; }}
                        returnKeyType={'send'}
                        placeholder="Password"
                        onSubmitEditing={this.signIn}
                        secureTextEntry={true}
                        style={{
                            marginVertical: 20,
                            height: 40,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: '#bdbdbd',
                            paddingHorizontal: 20
                        }}
                    />

                    <TouchableOpacity
                        onPress={this.signIn} style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Animated.View style={{
                            width: this.state.width.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '1%'],
                            }),
                            backgroundColor: this.state.width.interpolate({
                                inputRange: [40, 100],
                                outputRange: ['rgba(168, 235, 18, 0.8)', 'rgba(5, 25, 55, 0.8)'],
                            }),
                            borderRadius: 20,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {
                                this.state.loading ?
                                    <ActivityIndicator color={'white'} />
                                    :
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{this.state.login_success ? 'SUCCESS' : 'SIGN IN'}</Text>
                            }
                        </Animated.View>
                    </TouchableOpacity>

                </KeyboardAvoidingView>


            </DismissKeyboardView>
        )
    }
}
