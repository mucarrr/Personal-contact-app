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
  
    // Form verilerini al ve bir nesneye dönüştür
    const formData = new FormData(event.target);
    const newContact = Object.fromEntries(formData.entries());
    console.log("Form verisi:", newContact);
  
    try {
      if (!editItem) {
        // Yeni bir kişi ekleme
        const response = await axios.post("/contacts", newContact);
        setContacts((contacts) => [...contacts, response.data]); // Yeni kişiyi listeye ekle
        console.log("Yeni kişi eklendi:", response.data);
      } else {
        // Mevcut kişiyi düzenleme
        const response = await axios.put(`/contacts/${editItem.id}`, newContact);
        setContacts((contacts) =>
          contacts.map((contact) =>
            contact.id === editItem.id ? response.data : contact
          )
        ); // Güncellenen listeyi ayarla
        console.log("Kişi güncellendi:", response.data);
      }
    } catch (err) {
      console.error("İşlem sırasında hata oluştu:", err);
    } finally {
      // İşlemler tamamlandıktan sonra modalı kapat ve düzenleme modundan çık
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
