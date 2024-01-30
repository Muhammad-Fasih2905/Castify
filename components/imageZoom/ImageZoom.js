import React from "react"
import { View, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Modal from "react-native-modal"
import { widthPercentageToDP as wp, } from "react-native-responsive-screen"


const ImageZoom = ({ showFullImage, setShowFullImage }) => {
    function onClose() {
        setShowFullImage(null)
    }

    return (
        <View style={styles.fullImageContainer}>
            <Modal
                isVisible={showFullImage?.isVisible}
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                animationInTiming={500}
                backdropOpacity={1}
                coverScreen={true}
                backdropColor="black"
                onBackButtonPress={onClose}
                style={styles.modal}
            >
                <SafeAreaView flex={1}>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Icon name="close" size={28} color="white" />
                    </TouchableOpacity>

                    <Image
                        source={{
                            uri: showFullImage
                        }}
                        style={{ width: "100%", height: "100%" }}
                    />
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default ImageZoom

const styles = StyleSheet.create({
    modal: {
        width: wp(100),
        alignSelf: "center"
    },
    fullImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtn: {
        alignSelf: "flex-end",
        zIndex: 1,
        position: "absolute",
        padding: 10,
        top: 5,
        right: 5
    }
})