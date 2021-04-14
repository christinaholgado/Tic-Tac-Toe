import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Platform, 
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const GameBoard = props => {
  const [board, setBoard] = useState(
    ['','','','','','','','','']
  );
  const [playerTurn, setPlayerTurn] = useState("x");
  const [clicked, setClicked] = useState(false);

  // X Icon Name = "close"
  // o Icon Name = "RadioButtonUnchecked"

  useEffect(() => {

    console.log("gameBoard mounted");

    startGame()

    return async() => {

     await console.log("gameBoard unmounted");

    }

  }, []);

  const startGame = () => {
    setBoard(
      ['','','','','','','','','']
    )
  };
  
  const squareClicked = (index) => {
    //var currentPlayer

    setClicked[true];

    setPlayerTurn((playerTurn == "x") ? "o" : "x");
    console.log(playerTurn)


  }

  const putIcon = (index) => {
    if(playerTurn == "x"){
      return <Icon name="close" style={styles.xTile}/>;
    } else if(playerTurn == "o"){
      return <Icon name="error" style={styles.oTile}/>;
    } else {
      return <View />;
    }

  }

    //to check if player has won game
    const checkIfWon = () => {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for(let i = 0; i < winningConditions.length; i++){
        let winningRow = winningConditions[i]
        let position1 = winningRow[0]
        let position2 = winningRow[1]
        let position3 = winningRow[2]
        if(position1 == position2 && position2 == position3 && position1 == position3){
          return true;
        }
        else{
          return false; 
        }
      }
    }



  return (
      <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
        
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(0)}>
            {putIcon(0)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(1)}>
            {putIcon(1)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(2)}>
            {putIcon(2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(3)}>
            {putIcon(3)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(4)}>
            {putIcon(4)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(5)}>
            {putIcon(5)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(6)}>
            {putIcon(6)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(7)}>
            {putIcon(7)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(8)}>
            {putIcon(8)}
          </TouchableOpacity>
        </View>
        <Text style={styles.someText}>It is player {playerTurn} 's turn!</Text>
      

      </SafeAreaView >
  );
}

  

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 6, 
    backgroundColor: '#CDB0F1',
  },

  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },

  xTile: {
    color: '#000000',
    fontSize: 60,
  },
  
  oTile: {
    color: '#000000',
    fontSize: 60,
  },

  someText: {
    fontSize: 20,
    
  }


});

export default GameBoard;
