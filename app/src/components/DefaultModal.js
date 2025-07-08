import { useState } from "react";
import { SafeAreaView, Modal, View } from "react-native";

const DefaultModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView>
            <Modal 
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible);}}>

                <View>
                    "Modal"
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default DefaultModal;