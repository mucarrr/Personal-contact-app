import { IoClose } from "react-icons/io5";
import Field from "./Field.jsx";
import axios from "axios";

function Modal({
  isModalOpen,
  setIsModalOpen,
  setContacts,
  editItem,
  setEditItem,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form gönderildi");
  
    const formData = new FormData(event.target);
    const newContact = Object.fromEntries(formData.entries());
    console.log("Form verisi:", newContact);
  
    try {
      if (!editItem) {
      
        const response = await axios.post("/contacts", newContact);
        setContacts((contacts) => [...contacts, response.data]); 
        console.log("Yeni kişi eklendi:", response.data);
      } else {
        
        const response = await axios.put(`/contacts/${editItem.id}`, newContact);
        setContacts((contacts) =>
          contacts.map((contact) =>
            contact.id === editItem.id ? response.data : contact
          )
        ); 
        console.log("Kişi güncellendi:", response.data);
      }
    } catch (err) {
      console.error("İşlem sırasında hata oluştu:", err);
    } finally {
     
      setEditItem(null);
      setIsModalOpen(false);
    }
  };
  
  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Edit contact" : "Add New Contact"}</h2>

            <button onClick={() => setIsModalOpen(false)}>
              <IoClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="Name Surname" name="name" />
            <Field
              value={editItem?.position}
              label="Position"
              name="position"
            />
            <Field value={editItem?.company} label="Company" name="company" />
            <Field value={editItem?.phone} label="Phone" name="phone" />
            <Field value={editItem?.email} label="E-mail" name="email" />
            <div className="buttons">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditItem(null);
                }}
                type="button"
              >
                Cancel
              </button>
              <button type="submit">{editItem ? "Update" : "Send"}</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default Modal;
