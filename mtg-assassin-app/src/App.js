import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: [],
      assassins: {},
      target: ''
    }
    this.addPlaying = this.addPlaying.bind(this)
    this.resetPlaying = this.resetPlaying.bind(this)
    this.generateAssassins = this.generateAssassins.bind(this)
    this.revealTarget = this.revealTarget.bind(this)
  }

  players = [
    'Andrew',
    'Ashlee',
    'Greg',
    'Jesse',
    'Matt',
    'Megan',
    'Melissa',
    'Steve',
    'Thailurr'
  ]

  addPlaying(person) {
    if (person && !this.state.playing.includes(person.currentTarget.value)) {
      this.state.playing.push(person.currentTarget.value)
      this.setState({'playing': this.state.playing})
    }
  }

  resetPlaying() {
    this.setState({
      'playing': [],
      'assassins': {},
      'target': ''
    })
  }

  generateAssassins() {

    let playerChances = Object()

    let randomNum = Number()

    this.state.playing.map(
      (v, i) => playerChances[v] = i + 1,
    )

    let gameSetup = Object()

    let currentTargets = this.state.playing
    
    let containsFlag = false

    this.state.playing.forEach(assassin => {
      
      if (currentTargets.includes(assassin)) {
        currentTargets = currentTargets.filter(ele => ele !== assassin)

        containsFlag = true
      }
      
      randomNum = Math.floor(Math.random() * currentTargets.length)

      gameSetup[assassin] = currentTargets[randomNum]

      if (containsFlag) {
        currentTargets.push(assassin)

        containsFlag = false
      }

      currentTargets = currentTargets.filter(ele => ele !== currentTargets[randomNum])

      if (!gameSetup[assassin]) {
        randomNum = Math.floor(Math.random() * this.state.playing.filter(ele => ele !== assassin).length)

        gameSetup[assassin] = gameSetup[this.state.playing[randomNum]]

        gameSetup[this.state.playing[randomNum]] = assassin
      }
    })

    this.setState({
      'assassins': gameSetup
    })
  }

  revealTarget(assassin) {
    if (!this.state.target) {
      this.setState({
        'target': this.state.assassins[assassin.currentTarget.value]
      })
    } else {
      this.setState({
        'target': ''
      })
    }
  }

  render() {
    return (
     React.createElement('div', {}, [
       React.createElement(
         Header, 
         {
           key: 'Header-key', 
           headerText: 'MTG Assassinator',
           className: 'mtg-assassin-header'
         } 
       ),
       React.createElement(
         DivIterator, 
         {
           key: 'DivIterator-key', 
           iterator: this.players, 
           className: 'players', 
           htmlTag: 'button',
           clickFunc: this.addPlaying,
         }
       ),
       React.createElement(
         PlayingList, 
         {
           key: 'Playing-key',
           className: 'playing',
           itemClassName: 'playing-val',
           playing: this.state.playing
          }
        ),
       React.createElement(
         ResetButton, 
         {
           key: 'Reset-key', 
           className: 'reset-playing', 
           playing: this.state.playing, 
           clickFunc: this.resetPlaying,
           resetVal: 'Reset'
          }
        ),
       React.createElement(
         GenerateAssassinsButton, 
         {
           key: 'GenerateAssassins-key', 
           className: 'generate-playing', 
           playing: this.state.playing, 
           clickFunc: this.generateAssassins,
           resetVal: 'Generate Assassin Match'
         }
       ),
       React.createElement(
        AssassinList, 
        {
          key: 'Assassins-key', 
          className: 'assassins', 
          itemClassName: 'assassins-val',
          assassins: this.state.assassins, 
          target: this.target,
          clickFunc: this.revealTarget,
          resetVal: 'Generate Assassin Match'
        }
      ),
      React.createElement(
        Target, 
        {
          key: 'Target-key', 
          className: 'target', 
          target: this.state.target
        }
      ),
     ])
    )
  }
}

class Header extends Component {
  render() {
    return (
      React.createElement(
        'h1', 
        {
          className: this.props.className
        }, 
        this.props.headerText
      )
    )
  }
}

class DivIterator extends Component {
  render() {
    return (
      React.createElement(
        'div', 
        {
          className: this.props.className
        }, 
        this.props.iterator.map(
          (v, i) => React.createElement(
            this.props.htmlTag, 
            {
              key: i, 
              value: v, 
              onClick: this.props.clickFunc,
              className: 'div-iterator'
            }, 
            v
          )
        )
      )
    )
  }
}

class PlayingList extends Component {
  render() {
    return (
      React.createElement(
        'ul', 
        {
          className: this.props.className, 
          value: this.props.playing
        }, 
        this.props.playing.map(
          (v, i) => React.createElement(
            'li', 
            {
              className: this.props.itemClassName, 
              key: i, 
              value: v
            }, 
            v
          )
        )
      )
    )
  }
}

class ResetButton extends Component {
  render () {
    return (
      React.createElement(
        'button', 
        {
          className: this.props.className, 
          value: this.props.resetVal, 
          onClick: this.props.clickFunc, 
          disabled: this.props.playing.length < 1
        }, 
        this.props.resetVal
      )
    )
  }
}

class GenerateAssassinsButton extends Component {
  render () {
    return (
      React.createElement(
        'button', 
        {
          className: this.props.className, 
          value: this.props.resetVal, 
          onClick: this.props.clickFunc, 
          disabled: this.props.playing.length < 3
        }, 
        this.props.resetVal
      )
    )
  }
}

class AssassinList extends Component {
  render() {
    return (
      React.createElement(
        'ul', 
        {
          className: this.props.className, 
        }, 
        Object.keys(this.props.assassins).map(
          (v, i) => React.createElement(
            'button', 
            {
              className: this.props.itemClassName, 
              key: i, 
              value: v, 
              onClick: this.props.clickFunc
            }, 
            v
          )
        )
      )
    )
  }
}

class Target extends Component {
  render() {
    return (
      React.createElement(
        'div', 
        {
          className: this.props.className, 
          value: this.props.target,
        }, 
        this.props.target
      )
    )
  }
}

export default App;
