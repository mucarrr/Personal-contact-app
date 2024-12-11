import { useEffect, useState } from 'react';
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoIosPersonAdd } from "react-icons/io";
import Card from "./components/Card.jsx";
import Modal from "./components/Modal.jsx";

axios.defaults.baseURL = "http://localhost:3000/";
function App() { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts ] = useState([]);
  const [editItem, setEditItem ] = useState(null);
  
 useEffect(()=>{
  axios.get("/contacts").then((res)=> {console.log("contacts:", res.data);
   setContacts(res.data);})
 },[]);

 const handleSubmit = (event) => {
   event.preventDefault();
   const text = event.target.search.value;
   const params = {
    q: text,
   };
    axios.get("/contacts/", {params}).then((res)=>setContacts(res.data));
 }

 const handleDelete =(id)=>{
  const res = confirm("Are you sure you want to delete?")
  if (res){
    axios.delete(`/contacts/${id}`).then(()=>{
      const updated = contacts.filter((contact)=>contact.id !== id)
      setContacts(updated);
    })
    .catch(console.log(err)
    );
  }
 }
 const handleEdit =(contact)=>
   setEditItem(contact);
 
 
return(
  <div className="app">
    <header>
      <h1>Personal Contacts</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit"><RiSearchLine /></button>
          <input type="text" name="search" placeholder="Find a contact.." />
        </form>
        <button className="ns"><IoMenu /></button>
        <button className="ns"><HiMiniSquares2X2 /></button>
        <button onClick={()=>setIsModalOpen(true) } className="add">
        <IoIosPersonAdd />
          <span>New contact</span>
        </button>
      </div>
    </header>

    <main>
   {contacts && contacts.length > 0 ? (
  contacts.map((contact) => (
    contact && contact.id ? (
      <Card
        key={contact.id}
        contact={contact}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setIsModalOpen={setIsModalOpen}
      />
    ) : (
      console.warn("Invalid contact:", contact) // Hatalı veri için uyarı
    )
  ))
) : (
  <p>Kayıtlı kişi bulunamadı.</p>
)}

    </main>
    
   <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setContacts={setContacts} editItem={editItem} setEditItem={setEditItem}/>
  </div>
);
   
}

export default App;
