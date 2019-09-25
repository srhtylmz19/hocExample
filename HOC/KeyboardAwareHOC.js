// @flow
import React, { Component } from 'react';
import { LayoutAnimation, Keyboard, Platform } from 'react-native';

export default (Comp) => {
    return class KeyboardAware extends Component {

        state = { keyboardOn: false };

        componentDidMount() {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow)
            this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide)
        }

        componentWillUnmount() {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }

        keyboardDidShow = () => {
            this.setState({ keyboardOn: true })
        }

        keyboardDidHide = () => {
            this.setState({ keyboardOn: false })
        }


        render() {
            const { styleDuringKeyboardShow, style, children, ...props } = this.props;

            return (
                <Comp style={[style, this.state.keyboardOn && styleDuringKeyboardShow]} {...props}>
                    {children}
                </Comp>
            );
        }
    };
};
