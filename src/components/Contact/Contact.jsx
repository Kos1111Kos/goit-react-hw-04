import { FaUserNinja } from "react-icons/fa6";
import { BiSolidPhone } from "react-icons/bi";
import styles from "./Contact.module.css";

// Компонент Contact представляет отдельный контакт
const Contact = ({ contact, deleteContact }) => {
  const { id, name, number } = contact;

  const handleDeleteContact = (evt) => {
    deleteContact(id, evt);
  };

  return (
    <li className={styles.userItem}>
      <div>
        <div className={styles.nameContainer}>
          <FaUserNinja />
          <p>{name}</p>
        </div>
        <div className={styles.phoneContainer}>
          <BiSolidPhone />
          <p>{number}</p>
        </div>
      </div>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDeleteContact}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
