import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ReactComponent as IconClose } from "../Assets/Icons/close.svg";
import API from "../Services/API";
import { connect } from "react-redux";
import Types from "../Models/Types";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 16,
  },
  overlay: {
    background: "rgba(196, 196, 196, 0.8)",
  },
};

const ModalCreate = ({
  closeModal,
  isModalVisible,
  updateContact,
  contacts,
}) => {
  const [data, setData] = useState({
    namaLengkap: null,
    alamat: null,
    foto: null,
    posisi: null,
    id: null,
    nama: null,
  });
  const [provinsi, setProvinsi] = useState([]);
  const [img, setImg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      setImg(reader.result);
    },
    false
  );
  if (data.foto) {
    reader.readAsDataURL(data.foto);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    API.addContact({
      namaLengkap: data.namaLengkap,
      alamat: data.alamat,
      posisi: data.posisi,
      foto: img,
      id: data.id,
      nama: data.nama
    }).then((response) => {
      API.getContact().then((response) => {
        updateContact({ type: Types.UPDATE_CONTACT, newData: response });
        closeModal();
        setIsSubmitting(false);
      });
    });
  };

    useEffect(() => {
      API.getProvince().then((response) => {
          setProvinsi({provinsi: response.provinsi})
      });
    }, []);

  return (
    <Modal
      isOpen={isModalVisible}
      onRequestClose={closeModal}
      style={customStyles}
      province={provinsi}
    >
      <div className="modalCreate">
        <div className="modalCreate__header">
          <label>Add a new Contact</label>
          <IconClose onClick={closeModal} />
        </div>
        <form
          className="modalCreate__form"
          onSubmit={(event) => onSubmit(event)}
        >
          <div className="modalCreate__form__input">
            <input
              onChange={({ target: { value } }) =>
                setData({ ...data, namaLengkap: value })
              }
              required
              type="text"
              placeholder="NamaLengkap..."
            />
          </div>
          <div className="modalCreate__form__input">
            <input
              onChange={({ target: { value } }) =>
                setData({ ...data, posisi: value })
              }
              required
              type="text"
              placeholder="Posisi..."
            />
          </div>
          <div className="modalCreate__form__input">
            <input
              onChange={({ target: { value } }) =>
                setData({ ...data, alamat: value })
              }
              required
              type="text"
              placeholder="Alamat..."
            />
          </div>

          <div style={{ width: 500 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={provinsi.provinsi}
              getOptionLabel={(option) => option.nama}
              onChange={(event, newValue) => {
                setData({...data, id: newValue.id, nama: newValue.nama});
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Provinsi"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </div>

          <div className="modalCreate__form__input">
            <input
              type="file"
              required
              name="image"
              id="image"
              onChange={({ target: { files } }) =>
                setData({ ...data, foto: files[0] })
              }
            />
            <label htmlFor="image">Photo</label>
          </div>

          <button type="submit" disabled={isSubmitting ? true : false}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateContact: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);
