import React, {Component} from 'react';
import './App.css';
import ImageUpload from "./components/ImageUpload.js"

class App extends Component {
    render() {
      return (
        <div>
            <h2 align="center"> Images Upload </h2>
            <ImageUpload />
        </div>
      );
    }
}

export default App;
