import { writeFile } from 'fs/promises';
import { join } from 'path';
import { config } from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables from .env file
config();

export async function POST({ request }) {
    try {
        console.log('✅ Request Received');
        console.log('🔍 Request Method:', request.method);
        console.log('🔍 Request Headers:', JSON.stringify([...request.headers]));

        // Read the raw request body
        const rawBody = await request.text();
        console.log('🔍 Raw Body Length:', rawBody.length);
        console.log('🔍 Raw Body Content:', rawBody);

        if (!rawBody || rawBody.trim() === '') {
            return new Response(JSON.stringify({ error: 'Empty request body' }), { status: 400 });
        }

        // Parse JSON manually
        let data;
        try {
            data = JSON.parse(rawBody);
        } catch (jsonError) {
            console.error('❌ JSON Parsing Error:', jsonError);
            return new Response(JSON.stringify({ error: 'Invalid JSON format' }), { status: 400 });
        }

        console.log('✅ Parsed JSON:', data);

        const { key, filename, url } = data;

        // Check if the key matches the environment variable
        if (key !== process.env.KEY) {
            return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 403 });
        }

        if (!filename || !url) {
            return new Response(JSON.stringify({ error: 'Missing filename or url' }), { status: 400 });
        }

        // Define file path inside public/images/
        const filePath = join(process.cwd(), 'public', 'images', filename);
        console.log('📝 Saving to:', filePath);

        // Fetch the file from the URL
        const response = await fetch(url);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to download file' }), { status: 500 });
        }

        // Read the file content as a buffer
        const fileBuffer = await response.buffer();

        // Save the file to the specified path
        await writeFile(filePath, fileBuffer);

        return new Response(JSON.stringify({ success: true, file: filename }), { status: 200 });
    } catch (error) {
        console.error('❌ Error saving file:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
