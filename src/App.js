/*
import React, { useState, useEffect } from 'react'; 
import './App.css'; 
import { API } from 'aws-amplify'; 
import { withAuthenticator } from '@aws-amplify/ui-react'; 
import { listNotes } from './graphql/queries'; 
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
*/

import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
/*
import {
  //withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";*/

import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react-v1';
//import { withAuthenticator } from '@aws-amplify/ui-react';
import { listTodos } from './graphql/queries';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from './graphql/mutations';
import { Storage } from 'aws-amplify'; 


const initialFormState = { name: '', description: '' }

function App({ signOut }) {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);
  
  async function onChange(e) {
	if (!e.target.files[0]) return
	const file = e.target.files[0];
	setFormData({ ...formData, image: file.name });
	await Storage.put(file.name, file);
	fetchNotes();
  }	
	
  /*
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
  setNotes(apiData.data.listTodos.items);}*/
  
  async function fetchNotes() {
	const apiData = await API.graphql({ query: listTodos });
	const notesFromAPI = apiData.data.listTodos.items;
	await Promise.all(notesFromAPI.map(async note => {
	  if (note.image) {
		const image = await Storage.get(note.image);
		note.image = image;
	  }
	  return note;
    }))
	setNotes(apiData.data.listTodos.items);
  }
  
  /*
  async function createTodo() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);}*/
	
  async function createTodo() {
	if (!formData.name || !formData.description) return;
	await API.graphql({ query: createNoteMutation, variables: { input: formData } });
	if (formData.image) {
	  const image = await Storage.get(formData.image);
	  formData.image = image;
	}
	setNotes([ ...notes, formData ]);
	setFormData(initialFormState);
  }
  
  
  async function deleteTodo({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }
  
 
//---------------------------------------------
  return (
/*	<View className="App">

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
*/	
    <div className="App">
	  <img src={logo} className="App-logo" alt="logo" />
      <h1>Our Grocery List</h1>

      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Item name"
        value={formData.name}
      />
	  
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Item description"
        value={formData.description}
      />
	  
	  <br />
	  <br />

	  <input
        type="file"
        onChange={onChange}
	  />
 


      <button onClick={createTodo}>Add Item</button>
      <div style={{marginBottom: 140}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteTodo(note)}>Delete Item</button>	
			  {
				note.image && <img src={note.image} style={{width: 300}} alt="logo" />
			  }		  
            </div>
          ))
        }
      </div>
      <AmplifySignOut  />
    </div> 
  );
}

export default withAuthenticator(App);


/*
import React, { useState, useEffect } from 'react'; 
import './App.css'; import { API } from 'aws-amplify'; 
import { withAuthenticator } from '@aws-amplify/ui-react'; 
import { listNotes } from './graphql/queries'; 
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
*/




/*
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


/*----------------------------------------------------------------------------------------------------

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

/*------------------------------------------------
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