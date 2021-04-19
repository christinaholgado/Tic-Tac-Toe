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

  // Empty = 0
  // Player 1 (X) = 1
  // Player 2 (O) = 2

  // X Icon Name = "close"
  // o Icon Name = "RadioButtonUnchecked"


const GameBoardTicTacToe = () => {
  const [boardState, setBoard] = useState(
    [
      [0,0,0,],
      [0,0,0,],
      [0,0,0,],
    ]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [clicked, setClicked] = useState(false);

  const startGame = () => {
    setBoard(
      [
        [0,0,0,],
        [0,0,0,],
        [0,0,0,],
      ]
    )
  };

  const squareClicked = (row, col) => {
    var playerTurn = {playerTurn}

    if (row == 0 && col == 0){
      setBoard[        
        [1,0,0,],
        [0,0,0,],
        [0,0,0,]
      ]
    } 

    //var arr = setBoard.slice()
    //list[row, col] = playerTurn
    //setBoard(list)

    //setBoard = playerTurn

    //setPlayerTurn((playerTurn == 1) ? 2 : 1);
    
    //if (playerTurn ==1){
      //setBoard(row, col)
    //}
    
    //setClicked[true];
  }

  const placeIcon = (row, col) => {
    var move = boardState[row][col]

    if(move == 1){
      return <Icon name="close" style={styles.xTile}/>;
    } else if(move == 2){
      return <Icon name="error" style={styles.oTile}/>;
    } else {
      return <View />;
    }

  }


  useEffect(() => {

    console.log("gameBoard mounted");

    startGame()    

    return async() => {

     await console.log("gameBoard unmounted");

    }

  }, []);


  




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
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(0, 0)}>
            {placeIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(0, 1)}>
            {placeIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(0, 2)}>
            {placeIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(1, 0)}>
            {placeIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(1, 1)}>
            {placeIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(1, 2)}>
            {placeIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(2, 0)}>
            {placeIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(2, 1)}>
            {placeIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => squareClicked(2, 2)}>
            {placeIcon(2, 2)}
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
    flex: 1
  },
  
  oTile: {
    color: '#000000',
    fontSize: 60,
  },

  someText: {
    fontSize: 20,
  }


});

export default GameBoardTicTacToe;
