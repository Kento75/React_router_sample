import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const FRIENDS = [
  {
    id: 'test1',
    nameJa: '太郎',
    nameEn: 'Taro',
    sex: 'Man'
  },
  {
    id: 'test2',
    nameJa: '花子',
    nameEn: 'Hanako',
    sex: 'Woman'
  },
  {
    id: 'test3',
    nameJa: 'けんと',
    nameEn: 'Kento',
    sex: 'Man'
  }
]

const friendById = id => FRIENDS.find(friend => friend.id === id)

const FriendList = props => (
  <div>
    {FRIENDS.map(friend => (
      <li key={friend.id}>
        <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
        <button onClick={() => props.handleVote(friend.id)}>+</button>
      </li>
    ))}
  </div>
)

const Friend = props => {
  const { id } = props.match.params
  const friend = friendById(id)
  const vote = props.votes[id]

  if (typeof friend === 'undefined')  {
    return (
      <div>
        <p>Friends with id '{id}' does not exist.</p>
      </div>
    )
  }


  const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
  const contentsStyle = { margin: 0 }

  return (
    <div>
      <div style={containerStyle}>
        <h1 style={contentsStyle}>{friend.nameJa}</h1>
        <p style={contentsStyle}>{friend.nameEn}</p>
        <p style={contentsStyle}>{friend.sex}</p>
      </div>
      <h1>Vote: {vote}</h1>
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/friends'>Friends</Link></li>
      </ul>
      <hr />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/friends' component={Friends} />
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>ようこそ</p>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
    <p>polls</p>
  </div>
)

class Friends extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleVote = this.handleVote.bind(this)
  }

  componentWillMount() {
    FRIENDS.forEach(friend => {
      this.setState({
        ...this.state,
        [friend.id]: 0
      })
    })
  }

  handleVote(id) {
    this.setState({
      [id]: this.state[id] + 1
    })
  }

  render() {
    return (
      <div>
        <h2>Friends</h2>
        <Route exact path='/friends' render={props => <FriendList handleVote={this.handleVote} />} />
        <Route path='/friends/:id' render={props => <Friend match={props.match} votes={this.state} />} />
      </div>
    )
  }
}


export default App
