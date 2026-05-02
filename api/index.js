export default async function handler(req, res) {
    // 1. Izin CORS agar web AI kamu bisa menyedot data dari Vercel ini
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 2. Mengambil data khusus Wingo 1 Menit (typeId: 1) dari 55five
        const response = await fetch("https://api.55fiveapi.com/api/webapi/GetNoaverageEmerdList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json, text/plain, */*",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNzc3NzUwNTg5IiwibmJmIjoiMTc3Nzc1MDU4OSIsImV4cCI6IjE3Nzc3NTIzODkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiI1LzMvMjAyNiAzOjA2OjI5IEFNIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWNjZXNzX1Rva2VuIiwiVXNlcklkIjoiMTA5Njg2MyIsIlVzZXJOYW1lIjoiNjI4OTU0MTQzNzAxNjIiLCJVc2VyUGhvdG8iOiI5IiwiTmlja05hbWUiOiJBbmRyaXBlZGlhIiwiQW1vdW50IjoiMTQ2Ljg1IiwiSW50ZWdyYWwiOiIwIiwiTG9naW5NYXJrIjoiSDUiLCJMb2dpblRpbWUiOiI1LzMvMjAyNiAyOjM2OjI5IEFNIiwiTG9naW5JUEFkZHJlc3MiOiIxMDMuMTY2LjkyLjE5OCIsIkRiTnVtYmVyIjoiMCIsIklzdmFsaWRhdG9yIjoiMCIsIktleUNvZGUiOiIzMDg2IiwiVG9rZW5UeXBlIjoiQWNjZXNzX1Rva2VuIiwiUGhvbmVUeXBlIjoiMSIsIlVzZXJUeXBlIjoiMCIsIlVzZXJOYW1lMiI6ImFuZHJpcGVkaWE5MEBnbWFpbC5jb20iLCJpc3MiOiJqd3RJc3N1ZXIiLCJhdWQiOiJsb3R0ZXJ5VGlja2V0In0.kYQ3AVeR2jbEovWMH4L73ukXfJBZeXXaqRj1CtRoWHw",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36"
            },
            body: JSON.stringify({
                "pageSize": 10,
                "pageNo": 1,
                "typeId": 1,
                "language": 1,
                "random": "8e9c62a11dca40e4a0717ee4bdc5eb77",
                "signature": "F3491A7019E3FA020176E3BF6890D0CE",
                "timestamp": 1777750742
            })
        });

        const result = await response.json();

        // 3. Merubah format menjadi sederhana agar dibaca oleh AI
        if (result && result.data && result.data.list && result.data.list.length > 0) {
            const latest = result.data.list[0];
            return res.status(200).json({
                periode: latest.issueNumber,
                hasil: latest.number
            });
        } else {
            return res.status(500).json({ error: "Gagal mendapatkan data", raw: result });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
