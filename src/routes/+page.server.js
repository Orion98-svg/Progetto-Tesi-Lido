import { prenotazioni } from "../db/collections";


export const load = async () => {
    const data = await prenotazioni.find().toArray();
    return {prenotazioni:data};


};


