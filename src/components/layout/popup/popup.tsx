import React, { ChangeEvent } from "react";
import styles from "./popup.module.css";
import { Button, Input } from "@mui/material";
import { Close } from "@mui/icons-material";

type PropsPopup = {
  onClose: () => void;
  addSubTodo: () => void;
  subTaskTitle: string;
  handleChangeSubTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  subTaskDescription: string;
  handleChangeSubDescription: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Popup: React.FC<PropsPopup> = ({
  onClose,
  addSubTodo,
  subTaskTitle,
  handleChangeSubTitle,
  subTaskDescription,
  handleChangeSubDescription,
}) => (
  <div className={styles.popup__container}>
    <div className={styles.popup}>
      <Button
        onClick={onClose}
        style={{ position: "absolute", right: "26%", top: "24%" }}
      >
        <Close />
      </Button>
      <div className={styles.popup__box}>
        <Input
          value={subTaskTitle}
          onChange={handleChangeSubTitle}
          placeholder="Title"
          style={{ fontSize: "15px", height: "30px", width: "300px" }}
        />
        <Input
          value={subTaskDescription}
          onChange={handleChangeSubDescription}
          placeholder="Description"
          style={{ fontSize: "15px", height: "30px", width: "300px" }}
        />
        <Button onClick={() => addSubTodo()} variant="contained">
          Add subtask
        </Button>
      </div>
    </div>
    <div onClick={onClose} className={styles.popup__overlay}></div>
  </div>
);

export default Popup;
