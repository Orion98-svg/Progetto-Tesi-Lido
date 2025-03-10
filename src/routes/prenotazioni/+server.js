import { prenotazioni, ombrelloni } from '../../db/collections'; // Importa le collezioni prenotazioni e ombrelloni dal database
import { ObjectId } from 'mongodb'; // Importa ObjectId da mongodb


async function getTodayReservations() {
    const todaytemp = new Date();
    const today = todaytemp.toLocaleDateString('en-GB');
    const data = await prenotazioni
        .aggregate([
            {
                $match: {
                    start_day: { $lte: today },
                    end_day: { $gte: today }
                }
            },
            {
                $lookup: {
                    from: "ombrelloni",
                    localField: "_id",
                    foreignField: "prenotazione_id",
                    as: "ombrelloni"
                }
            }
        ])
        .toArray();
    return data;
}

export async function GET({ url }) {
    try {
        const nominativo = url.searchParams.get('nominativo'); // Estrae il parametro nominativo dall'URL
        let data;

        if (!nominativo) {
            // Se il nominativo non è fornito, esegue una query per ottenere tutte le prenotazioni con i relativi ombrelloni
            data = await prenotazioni
                .aggregate([
                    {
                        $lookup: {
                            from: "ombrelloni",
                            localField: "_id",
                            foreignField: "prenotazione_id",
                            as: "ombrelloni"
                        }
                    }
                ])
                .toArray();
        } else {
            // Se il nominativo è fornito, esegue una query per ottenere le prenotazioni corrispondenti con i relativi ombrelloni
            data = await prenotazioni
                .aggregate([
                    {
                        $match: { nominativo }
                    },
                    {
                        $lookup: {
                            from: "ombrelloni",
                            localField: "_id",
                            foreignField: "prenotazione_id",
                            as: "ombrelloni"
                        }
                    }
                ])
                .toArray();
        }

        if (data.length === 0) {
            // Se non ci sono documenti trovati, restituisce una risposta 404
            return new Response(
                JSON.stringify({ message: "No records found for the specified nominativo" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Restituisce i dati delle prenotazioni arricchiti con gli ombrelloni
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error fetching data:", error); // Stampa un messaggio di errore in caso di eccezione
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function DELETE({ request }) {
    try {
        const { id } = await request.json(); // Estrae l'ID dal corpo della richiesta
        if (!id) {
            return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 }); // Restituisce un errore se l'ID non è fornito
        }

        // Elimina la prenotazione
        const prenotazioneResult = await prenotazioni.deleteOne({ _id: Number(id) });

        if (prenotazioneResult.deletedCount === 1) {
            // Se la prenotazione è stata eliminata, elimina gli ombrelloni associati
            const ombrelloniResult = await ombrelloni.deleteMany({ prenotazione_id: Number(id) });

            return new Response(
                JSON.stringify({
                    message: "Prenotazione deleted successfully",
                    deletedOmbrelloni: ombrelloniResult.deletedCount
                }),
                { status: 200 }
            );
        } else {
            return new Response(JSON.stringify({ error: "Prenotazione not found" }), { status: 404 }); // Restituisce un errore se la prenotazione non è trovata
        }
    } catch (error) {
        console.error("Delete Error:", error); // Stampa un messaggio di errore in caso di eccezione
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 }); // Restituisce un errore 500 in caso di eccezione
    }
}

