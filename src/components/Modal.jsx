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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form gonderildi");

    const formData = new FormData(event.target);
    console.log(formData);
    const newContact = Object.fromEntries(formData.entries());

    if (!editItem) {
      const response = axios
        .post("/contacts", newContact)
        .then(() => setContacts((contacts) => [...contacts, response.data]))
        .catch((err) => {
          console.log(`error: ${err}`);
        });
    } else {
      const response = axios
        .put(`/contacts/${editItem.id}`, newContact)
        .then(() => {
          setContacts((contacts) =>
            contacts.map((contact) =>
              contact.id === editItem.id ? response.data : contact
            )
          );
        })
        .then((err) => {
          console.log(err);
        });
    }
    setEditItem(null);
    setIsModalOpen(() => false);
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
}
export default Modal;
