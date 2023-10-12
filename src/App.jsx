import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import Confetti from 'react-confetti'

const numberOfDices = 10
const possibleRandomNumbers = 6

function App() {

  const [dices,setDices] = useState(allNewDice()) //initialize state on go instead of useEffect with the call of all new dice function
  const [tenzies , setTenzies] = useState(false)

  useEffect(() => {
    const allEqual = (arr) => arr.every(val => (val.value === arr[0].value && val.clicked === true));
    setTenzies(allEqual(dices))
  },[dices])

  function createDice(diceId){
    return {
      id:diceId ,
      value:(Math.floor((Math.random() * possibleRandomNumbers) + 1)),
      clicked:false
    }
  }

  function newGame(){
    setDices(allNewDice())
  }

  function allNewDice(){
    const tempArray = []
    for (let i = 0; i < numberOfDices; i++) {
      tempArray.push(createDice(i))
    }
    return tempArray
  }

  function handleReroll(){
    const tempArr = []
    for (let i = 0; i < numberOfDices; i++) {
      if(dices[i].clicked){
        tempArr.push(dices[i])
      }else{
        tempArr.push(createDice(i))
      }
    }
    setDices(tempArr)
  }

  function handleToggle(id){
    setDices(prevDices => {
      const temp = []
      for (let i = 0; i < prevDices.length; i++) {
        if (prevDices[i].id === id) {
          let dice = {
            ...prevDices[i] , clicked: !prevDices[i].clicked
          }  
          temp.push(dice)
        }else{
          temp.push(prevDices[i])
        }
      }
      return temp
    })    
  }

  return (
    <div>
      {tenzies && <Confetti gravity={0.3}></Confetti>}
      <main className='main-container'>
        {tenzies ? <h1 className="title">You won!</h1> :<h1 className="title">Tenzies</h1>}
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dices.map((dice) => {
            return (
              <Die key={dice.id} handleToggle={handleToggle} id={dice.id} value={dice.value} clicked={dice.clicked} />
            )
          })}
        </div>
        <button className="roll-dice" onClick={tenzies ? newGame : handleReroll}>{tenzies ? 'New Game' : 'Reroll'}</button>
      </main>
    </div>
  )
}

export default App
