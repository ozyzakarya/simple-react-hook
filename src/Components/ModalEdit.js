import React, {useState} from 'react'
import Modal from 'react-modal'
import {ReactComponent as IconClose} from '../Assets/Icons/close.svg'
import Types from "../Models/Types";
import API from '../Services/API'
import {connect} from 'react-redux'

const customStyles = {
    content : {
        top           : '50%',
        left          : '50%',
        right         : 'auto',
        bottom        : 'auto',
        marginRight   : '-50%',
        transform     : 'translate(-50%, -50%)',
        borderRadius  : 16
    },
    overlay: {
        background: "rgba(196, 196, 196, 0.8)"
    }
};

const ModalEdit = ({closeModal, isModalVisible, item,  updateContact, contacts}) => {
    const [data, setData] = useState({namaLengkap : item.namaLengkap, posisi : item.posisi, alamat : item.alamat, foto : item.foto}) 
    const [img, setImg] = useState(null) 
    const [isSubmitting, setIsSubmitting] = useState(false) 

    const reader = new FileReader()
    reader.addEventListener("load", function () {
        setImg(reader.result)
    }, false);
    if(data.foto){   
        if(typeof data.foto === "object"){
            reader.readAsDataURL(data.foto)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        
        API.updateContact(item.id,{namaLengkap : data.namaLengkap, posisi : data.posisi, alamat : data.alamat, foto : img === null ?  data.foto : img}).then((response) => {
            API.getContact().then(response => {
                updateContact({type: Types.UPDATE_CONTACT, newData: response})
                closeModal()
                setIsSubmitting(false)
            })
        })        
    }
    return (
        <Modal
            isOpen={isModalVisible}
            onRequestClose={closeModal}
            style={customStyles}
        >   
            <div className="modalCreate">
                <div className="modalCreate__header">
                    <label>Update Contact</label>
                    <IconClose onClick={closeModal}/>
                </div>
                <form className="modalCreate__form" onSubmit={(event) => onSubmit(event)}>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, namaLengkap : value})} value={data.namaLengkap} required type="text" placeholder="NamaLengkap..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, posisi : value})} value={data.posisi} required type="text" placeholder="Posisi..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {value}}) => setData({...data, alamat : value})} value={data.alamat} required type="text" placeholder="Alamat..."/>
                    </div>
                    <div className="modalCreate__form__input">
                        <input onChange={({target : {files}}) => setData({...data, foto : files[0]})} type="file" name="image-edit" id="image-edit"/>
                        <label htmlFor="image-edit">{data.foto === null ? "Photo" : typeof data.foto === "object" ? data.foto.name : data.foto}</label>
                    </div>
                    <button type="submit" disabled={isSubmitting ? true : false}>
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </Modal>
    )
}


const mapStateToProps = (state) => {
    return {
        contacts : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateContact : dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit)