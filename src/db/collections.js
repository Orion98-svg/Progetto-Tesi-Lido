import db from './mongo';

export const prenotazioni = db.collection('prenotazioni');
export const utenti = db.collection('utenti');
export const ombrelloni = db.collection('ombrelloni');