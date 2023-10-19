import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SeacrhBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }


    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if (!robots.length){
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'> RoboFriends</h1>
                    <SeacrhBox searchChange={this.onSearchChange}/> 
                    {/* but this an objects so must include this. before */}
                    <Scroll>
                        <ErrorBoundry>
                            <Cardlist robots={filterRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div> 
            );
        }  
    }
}

export default App