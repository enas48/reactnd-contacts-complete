import React from 'react';

class ListContacts extends React.Component {
    render() { 
     
        return <ol className="contact-list">
            {this.props.contacts.map((item, index)=>
            <li key={index} className="contact-list-item">
                <div className="contact-avatar" style={{backgroundImage:`url(${item.avatarURL})`}}></div>
                <div className="contact-details">
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                    <button className="contact-remove">Remove</button>
                </div>
            </li>)}
        </ol>;
    }
}
 
export default ListContacts;