import { prenotazioni, ombrelloni } from '../../db/collections';


export async function GET({ url }) {
    try {
        // Extract and validate the nominativo parameter
        const rawdataInizio = url.searchParams.get('data_inizio');
        const rawdataFine = url.searchParams.get('data_fine');


        const normalizeDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB'); // Conversione data nel formato GG/MM/AAAA
        };

        const dataInizio = normalizeDate(rawdataInizio);
        const dataFine = normalizeDate(rawdataFine);

        if (!dataInizio || !dataFine) {
            return new Response(
                JSON.stringify({ error: 'Missing date parameter' }),
                { status: 400 }
            );
        }
        // Query the prenotazioni collection
        const data = await prenotazioni.find({
            $and: [
                { data_inizio: { $lte: dataFine } },
                { data_fine: { $gte: dataInizio } }
            ]
        }).toArray();

        // Check if no documents were found
        if (data.length === 0) {
            return new Response(
                JSON.stringify({ message: 'No records found for the specified nominativo' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // For each booking, query related ombrelloni records and append them
        for (let booking of data) {
            const ombrellone = await ombrelloni.find({ prenotazione_id: booking._id }).toArray();
            booking.ombrelloni = ombrellone;
        }

        // Return the enriched booking data
        return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}

