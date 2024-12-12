import { RiDeleteBin5Line } from "react-icons/ri";
import { HiPencilSquare } from "react-icons/hi2";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
function Card({contact, handleDelete, handleEdit, setIsModalOpen }){
    const [firstName, surname]=contact.name.split(" ");
    console.log(firstName);
    console.log(surname);
    
    
    
    return(
        <div className="card">
            <div className="buttons">
            <button onClick={() => handleEdit(contact)} className="update"><HiPencilSquare /></button>
            <button onClick={()=> handleDelete(contact.id)} className="delete"><RiDeleteBin5Line /></button>
               
            </div>
            <h1>{firstName[0]}{surname[0]}</h1>
            <h3>{contact.name}</h3>
            <p>{contact.position}</p>
            <p>{contact.company}</p>
            <div className="bottom">
                <div>
                    <span><FaPhoneFlip /></span>
                    <span>{contact.phone}</span>
                </div>
                <div>
                    <span><IoMail /></span>
                    <span>{contact.email}</span>
                </div>
            </div>

        </div>
    )
};
export default Card;