import { Modal, View, StyleSheet, KeyboardAvoidingView } from "react-native";

const DefaultModal = ({visible, children}) => {
    return (
        <Modal 
            animationType="slide"
            visible={visible}
            transparent={true}
            onRequestClose={() => {}}>

            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.modalBox}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        backgroundColor: "#181716",
        width: "80%",
        maxWidth: 350,
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
  }
});

export default DefaultModal;