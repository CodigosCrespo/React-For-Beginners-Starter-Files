import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  constructor () {
    super();
    // binding .this to methods the react way
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // getinitialState, where we will update our virtualDOM
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      // update app component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes}; // object spread, taking existing copy of fishes state
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes }) // short for ({ fishes: fishes }) -> sets fishes state to new state
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order}; // object spread, taking existing copy of order state
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1; // adding to existing OR setting to 1 (new order of fishes key)
    // update our state
    this.setState({ order }) // this.setState({order:order}) -> sets order const to new state
  }

  removeFromOrder(key) {
    // get the state of the current order
    const order = {...this.state.order};
    // update order[key] before setState
    // order[key] = order[key] - 1 || 0; // this line was wrong after pause challenge
    delete order[key]; // completely remove, not decrement
    // update order state by passing in new const state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            { // this is intricately beautiful T.T
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          {/* key is for react, index is for us to pass down via props */}
          </ul>
        </div>
        <Order
        fishes={this.state.fishes}
        order={this.state.order}
        params={this.props.params}
        removeFromOrder={this.removeFromOrder}
        />
        <Inventory
        addFish={this.addFish}
        removeFish={this.removeFish}
        loadSamples={this.loadSamples}
        fishes={this.state.fishes}
        updateFish={this.updateFish}
        storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;
