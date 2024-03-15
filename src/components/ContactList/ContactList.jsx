import styles from "./ContactList.module.css";
import Contact from "../Contact/Contact";
const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={styles.contactsList}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;
