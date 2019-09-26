import React, { Component } from 'react'
import { View, Image } from 'react-native'
import * as HOC from '../HOC';
import styles from './style';

const KeyboardAwareView = HOC.KeyboardAwareHOC(View)
const KeyboardAwareImage = HOC.KeyboardAwareHOC(Image)


class LogoView extends Component {
    render() {
        return (
            <KeyboardAwareView style={{ flex: 1 }} styleDuringKeyboardShow={styles.styleDuringKeyboardShow}>

                <KeyboardAwareImage
                    resizeMode="contain"
                    style={styles.image}
                    styleDuringKeyboardShow={{ opacity: 0.6 }}
                    source={require('../assets/images/hoc-image.png')}
                />

            </KeyboardAwareView>
        )
    }
}


export default LogoView