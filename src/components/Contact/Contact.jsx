import css from "./Contact.module.css";
import { useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import {
  FaUser,
  FaPhone,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { deleteContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";

const error = () => {
  toast("Deleting contact failed. Please try again.", {
    style: {
      color: "red",
      padding: "7px 10px",
    },
    icon: <FaExclamationTriangle />,
    duration: 1500,
  });
};

const success = () => {
  toast("Contact deleted successfully!", {
    style: {
      color: "#007bff",
      padding: "7px 10px",
    },
    icon: <FaCheckCircle />,
    duration: 1500,
  });
};

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        success();
      } else {
        error();
      }
    });
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={css.details}>
        <p>
          <FaUser className={css.icon} /> {name}
        </p>
        <p>
          <FaPhone className={css.icon} /> {number}
        </p>
      </div>
      <button
        type="button"
        className={css.deleteButton}
        onClick={() => setModalIsOpen(true)}
      >
        <FaTrash />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Delete"
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <p className={css.deleteMessage}>Delete this contact?</p>
        <div className={css.buttons}>
          <button onClick={handleDelete} className={css.confirmButton}>
            Yes
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className={css.cancelButton}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
}
