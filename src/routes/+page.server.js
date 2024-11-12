import { prenotazioni } from "../db/collections";


export const load = async () => {
    const data = await prenotazioni.find().toArray();
    //console.log(data);
    return {prenotazioni:data};


};


