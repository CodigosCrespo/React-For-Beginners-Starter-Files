import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    return (
        <form className="store-selector">
          <h2>Pleae Enter A Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
          <button type="submit">Visit Store ➥</button>
        { /* javascript curly braces, then comment as javascript.. will also count as a parent in JSX */}
        </form>
      )
  }
}

export default StorePicker;
