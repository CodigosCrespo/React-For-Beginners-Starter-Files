import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor () {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    // stop page from refreshing on submit
    event.preventDefault();
    console.log('You changed the URL');
    // first grab text from the box
    console.log(this.storeInput.value)
    // then we're transitioning from / to /store/:storeId
  }

  render() {
    return (
        <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
          <h2>Pleae Enter A Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
          <button type="submit">Visit Store ➥</button>
        { /* javascript curly braces, then comment as javascript.. will also count as a parent in JSX */}
        </form>
      )
  }
}

export default StorePicker;
