import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUserLock } from "react-icons/fa6"; // Імпорт іконки FaUserLock
import clsx from "clsx"; // Імпорт класу для умовного додавання класів CSS

import styles from "./ContactForm.module.css"; // Імпорт стилів для компоненту ContactForm

const ContactForm = ({ onAdd }) => {
  // Валідація даних форми
  const dataValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too Short!") // Мінімальна довжина ім'я - 3 символи
      .max(50, "Too Long!") // Максимальна довжина ім'я - 50 символів
      .required("Required"), // Поле ім'я обов'язкове для заповнення
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone number is not valid") // Перевірка правильності формату телефонного номера
      .required("Required") // Поле телефон обов'язкове для заповнення
      .min(3, "Too Short!") // Мінімальна довжина телефонного номера - 7 цифр
      .max(50, "Too Long!"), // Максимальна довжина телефонного номера - 10 цифр
  });

  // Генерація унікального ідентифікатора для поля ім'я
  const usernameId = useId();
  // Генерація унікального ідентифікатора для поля телефон
  const phoneNumberId = useId();

  // Стан для відображення / приховування іконки FaUserLock
  const [visibleSvg, setVisibleSvg] = useState(true);

  return (
    <Formik
      initialValues={{
        username: "",
        phoneNumber: "",
      }}
      onSubmit={onAdd} // Обробник подання форми
      validationSchema={dataValidationSchema} // Валідація форми за допомогою Yup
    >
      <Form className={styles.addContactForm}>
        <div className={styles.inputFieldContainer}>
          <label htmlFor={usernameId}>Name</label>
          <div className={styles.inputSvgContainer}>
            <Field
              type="text"
              name="username"
              id={usernameId}
              className={clsx(styles.inputField, styles.inputFieldAddition)}
              onFocus={() => {
                setVisibleSvg((prevState) => !prevState);
              }}
              onBlur={() => {
                setVisibleSvg((prevState) => !prevState);
              }}
            />
            <FaUserLock
              className={clsx(styles.userLock, {
                [styles.notVisible]: visibleSvg,
              })}
            />
          </div>
          <ErrorMessage
            name="username"
            render={(msg) => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <label htmlFor={phoneNumberId}>Number</label>
          <Field
            type="text"
            name="phoneNumber"
            id={phoneNumberId}
            className={styles.inputField}
          />
          <ErrorMessage
            name="phoneNumber"
            render={(msg) => <span className={styles.formError}>{msg}</span>}
          />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
