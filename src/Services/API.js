import queryString from 'query-string'

const BASE_URL = "https://reqaid.com/api"
const SECOND_URL= "https://dev.farizdotid.com/api/daerahindonesia";

export default class API {
    
    static getContact = () => {
        return this.fetch(`${BASE_URL}/FakePosts`)
    }
    
    static getDetailContact = (contactID) => {
        return this.fetch(`${BASE_URL}/contact/${contactID}`)
    }
    
    static addContact = (parameters = {}) => {
       const body = {
            namaLengkap: parameters.namaLengkap,
            foto: parameters.foto,
            alamat: parameters.alamat,
            posisi: parameters.posisi
        }

        return this.fetch(`${BASE_URL}/FakePosts`, {method : "POST", headers: { 'Content-Type': 'application/json' }, body : JSON.stringify(body)})
    }


    static updateContact = (contactID, parameters = {}) => {
        const body = {
            namaLengkap: parameters.namaLengkap,
            foto: parameters.foto,
            alamat: parameters.alamat,
            posisi: parameters.posisi
        }

        return this.fetch(`${BASE_URL}/FakePosts/${contactID}`, {method : "PATCH", headers: { 'Content-Type': 'application/json' }, body : JSON.stringify(body)})
    }


    
    static deleteContact = (contactID) => {
        return this.fetch(`${BASE_URL}/FakePosts/${contactID}`, {method : "DELETE"})
    }


    static getProvince = () => {
        return this.fetch(`${SECOND_URL}/provinsi`)
    }

    static getKota = (parameters = {}) => {
        console.log("query", parameters)
        const query = {
            id_provinsi: parameters.id_provinsi,
        }
        return this.fetch(`${SECOND_URL}/kota?${queryString.stringify(query)}`)
    }

    static fetch = (url, config = {}) => {
        return fetch(url, config).then(response => {
            if(response.status === 200){
                return response.json()
            }
        })
    }
}