import { prenotazioni, ombrelloni } from '../../db/collections';
import { ObjectId } from 'mongodb';

export async function GET({ url }) {
    try {
        const nominativo = url.searchParams.get('nominativo');
        let data;

        if (!nominativo) {
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
            return new Response(
                JSON.stringify({ message: "No records found for the specified nominativo" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}



export async function DELETE({ request }) {
    try {
        const { id } = await request.json();
        if (!id) {
            return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
        }

        // Delete the prenotazione
        const prenotazioneResult = await prenotazioni.deleteOne({ _id: Number(id) });

        if (prenotazioneResult.deletedCount === 1) {
            // ✅ If prenotazione was deleted, delete associated ombrelloni
            const ombrelloniResult = await ombrelloni.deleteMany({ prenotazione_id: Number(id) });

            return new Response(
                JSON.stringify({
                    message: "Prenotazione deleted successfully",
                    deletedOmbrelloni: ombrelloniResult.deletedCount
                }),
                { status: 200 }
            );
        } else {
            return new Response(JSON.stringify({ error: "Prenotazione not found" }), { status: 404 });
        }
    } catch (error) {
        console.error("Delete Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

