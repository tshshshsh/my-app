import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json();

    var url = process.env.DADATA_URL_SUGGESTIONS_UNDEGROUND;
    var token = process.env.DADATA_API_TOKEN;
    var query = body.query;

    if (!query || query.length < 2) {
        return NextResponse.json({ suggestions: [] });
    }

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: query })
    }

    const response = await fetch(url, options);
    const text = await response.text();
    const jsonData = JSON.parse(text);

    return NextResponse.json(jsonData);
}