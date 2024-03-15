import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import styles from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

function App() {
  // Состояние для хранения данных контактов
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("usersData")) || [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ]
  );

  // Состояние для хранения значения поиска
  const [searchValue, setSearchValue] = useState("");

  // Функция для удаления контакта
  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((singleUser) => singleUser.id !== id)
    );
  };

  // Функция для добавления нового контакта
  const addContact = ({ username, phoneNumber }, actions) => {
    actions.resetForm();
    const userId = nanoid(5);
    // Форматирование номера телефона
    const formattedPhoneNumber = phoneNumber
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{2})(\d{2})/, "$1-$2-$3");

    setContacts((prevState) => [
      ...prevState,
      { id: userId, name: username, number: formattedPhoneNumber },
    ]);
  };

  // Фильтрация контактов по значению поиска
  const filterContacts = contacts.filter((contact) =>
    Object.values(contact).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase().trim())
    )
  );

  // Сохранение данных в localStorage при изменении состояния контактов
  useEffect(() => {
    try {
      localStorage.setItem("usersData", JSON.stringify(contacts));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [contacts]);

  return (
    <div className={styles.appContainer}>
      <h1>Phonebook</h1>
      {/* Компонент формы добавления контакта */}
      <ContactForm onAdd={addContact} />
      {/* Компонент для поиска контактов */}
      <SearchBox filterUserData={setSearchValue} value={searchValue} />
      {/* Компонент списка контактов */}
      <ContactList contacts={filterContacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
