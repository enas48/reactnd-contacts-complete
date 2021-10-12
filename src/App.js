import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsAPI'
import CreateContact  from './CreateContact'
import {Route } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      contacts: []
    }
  
this.removeContact = this.removeContact.bind(this);
this.createContact = this.createContact.bind(this);
}
removeContact (contact)  {
  this.setState((state)=>({
    contacts: state.contacts.filter((c) => c.id !== contact.id)
  }))
  ContactsApi.remove(contact);
}
createContact (contact)  {
  ContactsApi.create(contact).then((contact)=>
  this.setState(state=>({
    contacts: state.contacts.concat([contact])
  })))

}
componentDidMount(){
  ContactsApi.getAll().then((contacts)=>
  this.setState({contacts: contacts}))
}
  render() {
    return (
      <div>
         <Route exact path="/">
             <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
         </Route>
 
         <Route path="/create" render={({history})=>(
        <CreateContact onCreateContact={(contact)=>{
          this.createContact(contact)
          history.push('/')
        }} />
           )}
       
        />



      </div>
    )
  }
}

export default App;
