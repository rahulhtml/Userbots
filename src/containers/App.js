import React,{Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import Popup from '../components/Popup';
import ErrorBoundary from '../components/ErrorBoundary';
import "./App.css";


class App extends React.Component {

  robotsName;

  constructor(){
    super()
    this.state = {
      message:'RoboFans',
      robots:[],
      searchfield:'',
      popup:false
    }
  }

  onSearchChange = (event) => {
    this.setState({searchfield : event.target.value});
    console.log(this.state.searchfield);
  }

  componentWillMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response =>{
        return response.json()
    })
    .then(users =>{
      this.setState({robots:users});
    })
      this.robotsName = "Sreedhar";
  }

  popItUp = () => {
    this.setState({popup:true})
  }

  closePopup = () => {
    this.setState({popup:false})
  }

  render(){

    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    


    return(
      !filteredRobots.length ?<h1 className="tc">Loding...</h1>
      :
      <React.Fragment>
        {this.state.popup?<Popup closePopup={this.closePopup} name={this.state.robots[0].name} id={this.state.robots[0].id} username={this.state.robots[0].username} email={this.state.robots[0].email} city={this.state.robots[0].address.city}/>:""}
      <div className="tc">
        <h1>{this.state.message}</h1>
        <button onClick={this.popItUp}>PopItUp</button>
        <SearchBox searchChange = {this.onSearchChange} />
        <h1>{this.robotsName}</h1>
        <Scroll>
          < CardList robots = {filteredRobots}/>
        </Scroll>

      </div>
      </React.Fragment>
    )
  }
  
}

export default App;
