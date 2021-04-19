import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const CreateOrJoinTicTacToe = props => {
  const [enteredCode, setEnteredCode] = useState('');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const [currentScreen, setCurrentScreen] = useState('get-started');


  const createRoom = generatedCode => {
    firestore()
      .collection('chats')
      .doc(generatedCode)
      .set({
        roomCode: generatedCode.toUpperCase(),
      })
      .then(() => {
        props.joinRoom(generatedCode.toUpperCase());
      });
  };

  const checkIfRoomExists = generatedCode => {
    firestore()
      .collection('chats')
      .doc(generatedCode)
      .get()
      .then(doc => {
        if (doc.exists) {
          generateCode();
        } else {
          createRoom(generatedCode);
        }
      });
  };

  const generateCode = () => {
    let generatedCode = '';
    while (generatedCode.length < 4) {
      let randomNumber = Math.round(0 + Math.random() * ((letters.length -1) - 0));
      generatedCode+= letters[randomNumber]
    }
    checkIfRoomExists(generatedCode);
  }

  const joinRoom = () => {
    if (enteredCode.length === 4) {
      firestore()
        .collection('chats')
        .doc(enteredCode.toUpperCase())
        .get()
        .then(doc => {
  
          if (doc.exists) {
            Keyboard.dismiss();
            props.joinRoom(enteredCode.toUpperCase());
          } else {
            Alert.alert(
              "That room doesn’t exist",
              "We couldn’t find a room with that room code. Are you sure you entered it correctly?",
              [
                {
                  text: "OK",
                  onPress: () => {},
                }
              ],
              { cancelable: false }
            );
          }
        });
    }
  }

  if (currentScreen === 'get-started') {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Image source={require('./images/Winners-rafiki.png')} style={styles.image} />
            <Text style={styles.headline}>
              {"Tic-Tac-Toe"}
            </Text>
            <Text style={styles.plainText}>
              {"Play against a friend in a 9-round tournament"}
            </Text>
            <View style={styles.textInputRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('create-or-join')}>
                <Text style={styles.primaryButtonText}>
                  {"Get Started"}
                </Text>
                <Icon name="chevron-right" size={24} color={"#FAFAFA"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>


    );
  } else if (currentScreen === 'create-or-join') {
    return (

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Image source={require('./images/Chat-amico.png')} style={styles.image} />
            <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('get-started')}>
              <Icon name="arrow-back" size={24} color="#D7F75B" />
            </TouchableOpacity>
            <View style={{...styles.textInputRow, marginTop: 0}}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => generateCode()}>
                <Text style={styles.secondaryButtonText}>
                  {"Create a New Room"}
                </Text>
                <Icon name="chevron-right" size={24} color="#C9B3FF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.headline}>
              {"Tic-Tac-Toe"}
            </Text>
            <Text style={styles.fieldLabel}>
              {"Room Code"}
            </Text>
            <View style={styles.textInputRow}>
              <TextInput style={styles.textInput} value={enteredCode} onChangeText={text => setEnteredCode(text)} maxLength={4} />
              <TouchableOpacity style={enteredCode.length === 4 ? styles.primaryButton : styles.primaryButtonDisabled} onPress={() => joinRoom()}>
                <Text style={enteredCode.length === 4 ? styles.primaryButtonText : styles.primaryButtonDisabledText}>
                  {"Join Room"}
                </Text>
                <Icon name="chevron-right" size={24} color={enteredCode.length === 4 ? "#434187" : "#515151"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  
    );


  } else if (currentScreen === 'add-name') {
    return (

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Image source={require('./images/JoinOrCreateImage.png')} style={styles.image} />
            <TouchableOpacity style={styles.backButton} onPress={() => props.updateScreen('greeting')}>
              <Icon name="arrow-back" size={24} color="#D7F75B" />
            </TouchableOpacity>
            <Text style={styles.headline}>
              {"Tic-Tac-Toe"}
            </Text>
            <Text style={styles.fieldLabel}>
              {"Room Code"}
            </Text>
            <View style={styles.textInputRow}>
              <TextInput style={styles.textInput} value={enteredCode} onChangeText={text => setEnteredCode(text)} maxLength={4} />
              <TouchableOpacity style={enteredCode.length === 4 ? styles.primaryButton : styles.primaryButtonDisabled} onPress={() => joinRoom()}>
                <Text style={enteredCode.length === 4 ? styles.primaryButtonText : styles.primaryButtonDisabledText}>
                  {"Join Room"}
                </Text>
                <Icon name="chevron-right" size={24} color={enteredCode.length === 4 ? "#434187" : "#515151"} />
              </TouchableOpacity>
            </View>
            <View style={{...styles.textInputRow, marginTop: 0}}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => generateCode()}>
                <Text style={styles.secondaryButtonText}>
                  {"Create a New Room"}
                </Text>
                <Icon name="chevron-right" size={24} color="#C9B3FF" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  
    );


  }

  
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#CDB0F1",
  },
  innerContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B3772",
    position: "absolute",
    top: 24,
    left: 24,
  },
  image: {
    width: '15%',
    height: '15%',
    paddingHorizontal: 200,
    paddingVertical: 150,
  },
  headline: {
    fontFamily: "Roboto-Black",
    fontSize: 24,
    color: "#7E57C2",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  plainText: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#7E57C2",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  textInputRow: {
    alignItems: "stretch",
    paddingHorizontal: 24,
    marginTop: 6,
    marginBottom: 24,
    flexDirection: "row",
  },
  fieldLabel: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 24,
  },
  textInput: {
    backgroundColor: "rgba(67, 65, 135, 0.6)",
    borderRadius: 2,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#FFFFFF",
  },
  primaryButton: {
    paddingVertical: 14,
    backgroundColor: "#7E57C2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderRadius: 20,
    marginLeft: 12,
  },
  primaryButtonText: {
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#FAFAFA",
    textAlign: "center",
    marginRight: 6,
  },
  primaryButtonDisabled: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BDBDBD",
    borderRadius: 2,
    marginLeft: 12,
    paddingHorizontal: 24,
  },
  primaryButtonDisabledText: {
    color: "#515151",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
    marginRight: 6,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#A682FF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#C9B3FF",
    textAlign: "center",
    marginRight: 6,
  }

});

export default CreateOrJoinTicTacToe;
