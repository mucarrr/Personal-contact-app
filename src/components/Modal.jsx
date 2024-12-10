import { IoClose } from "react-icons/io5";
import Field from "./Field.jsx";
import axios from "axios";

function Modal({ isModalOpen, setIsModalOpen, setContacts }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("gfhjkl;");

    const formData = new FormData(event.target);
    const newContact = Object.fromEntries(formData.entries());

    axios
      .post("/contacts", newContact)
      .then(() => setContacts((contacts) => [...contacts, newContact]))
      .catch((err) => {
        alert("islem no");
        console.log(`error: ${err}`);
      });

    setIsModalOpen(() => false);
  };
  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>Add New Contact</h2>
            <button onClick={() => setIsModalOpen(false)}>
              <IoClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Field label="Name Surname" />
            <Field label="Position" />
            <Field label="Company" />
            <Field label="Phone" />
            <Field label="E-mail" />
          </form>
          <div className="buttons">
            <button type="button">Cancel</button>
            <button type="submit">Send</button>
          </div>
        </div>
      </div>
    )
  );
}
export default Modal;
