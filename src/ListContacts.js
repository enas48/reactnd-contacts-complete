import React from 'react';
import PropTypes from 'prop-types';
import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by';
class ListContacts extends React.Component{
    static PropTypes ={
        contacts: PropTypes.array.isRequired,
        onDeleteContact:PropTypes.func.isRequired   
    }
    constructor(props){
        super(props);
 this.state={
    query:''
}
this.updateQuery = this.updateQuery.bind(this);
this.deleteQuery = this.deleteQuery.bind(this);
    }
updateQuery(query){
    this.setState({query: query.trim()})
 }
deleteQuery(){
    this.setState({query: ''})
 }
     render(){
         const {contacts, onDeleteContact} = this.props;
         const {query} = this.state;

         let showingContacts
         if(query){
             const match = new RegExp(escapeStringRegexp(query), 'i');
             showingContacts = contacts.filter((contact)=>
                match.test(contact.name))
         }else{
            showingContacts=  contacts;
         }
         showingContacts.sort(sortBy('name'));
                 return(
                 <div className="list-contacts">
                     {/* {JSON.stringify(this.state)} */}
                         <div className="list-contacts-top">
                             <input type="text"
                             className="search-contacts"
                             placeholder="Search contacts"
                             value={query}
                             onChange={(e)=> this.updateQuery(e.target.value)} />
                         </div>
                         {showingContacts.length !== contacts.length &&
                          (<div className="showing-contacts">
                              <span>Now Showing {showingContacts.length} of {contacts.length} total</span>
                              <button onClick={()=>this.deleteQuery()}>show all</button>                            
                            </div>) }
                 <ol className="contact-list">
            {showingContacts.map((contact)=>
            <li key={contact.id} className="contact-list-item">
                <div className="contact-avatar" style={{backgroundImage:`url(${contact.avatarURL})`}}></div>
                <div className="contact-details">
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    <button className="contact-remove"  onClick={() => onDeleteContact(contact)} >Remove</button>
                </div>
            </li>)}
        </ol>
        </div>);
     }
}

export default ListContacts;