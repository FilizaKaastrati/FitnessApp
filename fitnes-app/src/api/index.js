import axios from "axios";

const BASE_URL = 'http://localhost:17240/api/';

export const ENDPIONTS ={
    CUSTOMER:'Customer',
    PROTEINITEM:'ProteinItem',
    ORDER:'Order'
}
export const createAPIEndpoint = endpoint =>{
    
    let url  = BASE_URL + endpoint + '/';
    return{
        fetchAll : () => axios.get(url),
        fetchById : id => axios.get(url + id),
        create: newRecord => axios.post(url,newRecord),
        update : (id, updateRecord) => axios.put(url + id, updateRecord),
        delete : id => axios.delete(url + id)
    }
}
