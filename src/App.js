import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App({ signOut }) {
  return (
    <View className="App">

      <Card>
        <Image src={logo} className="App-logo" alt="logo" />
		<Heading level={1}>Hello Beh Beh!</Heading>
      </Card>
      <Card>

		<Heading level={3}>We now have Auth!</Heading>
	  </Card>
	  <Card>
		<Heading level={5}>and a Link!</Heading>
	  	<a
          className="App-link"
          href="https://google.com"//"https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer" //Learn React
        >
          Search Google 
        </a> 
	  </Card>

		<Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);


/*

import './App.css';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		<h1>Hello Beh Beh!</h1>
      </header>
    </div>
  );
}

export default App;

		//------------------------------------------------
		<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
		</header>
		*/