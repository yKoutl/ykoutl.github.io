import { kv } from "@vercel/kv";

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    // Increment views on every GET request (page load)
    if (req.method === 'GET' && !action) {
      await kv.incr('portfolio:views');
      const views = await kv.get('portfolio:views') || 0;
      const likes = await kv.get('portfolio:likes') || 0;

      return new Response(
        JSON.stringify({ views, likes }),
        { status: 200, headers }
      );
    }

    // Handle like action
    if (req.method === 'POST' || (req.method === 'GET' && action === 'like')) {
      await kv.incr('portfolio:likes');
      const views = await kv.get('portfolio:views') || 0;
      const likes = await kv.get('portfolio:likes') || 0;

      return new Response(
        JSON.stringify({ views, likes }),
        { status: 200, headers }
      );
    }

    // Get stats without incrementing
    if (action === 'get') {
      const views = await kv.get('portfolio:views') || 0;
      const likes = await kv.get('portfolio:likes') || 0;

      return new Response(
        JSON.stringify({ views, likes }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers }
    );

  } catch (error) {
    console.error('Stats API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats', details: error.message }),
      { status: 500, headers }
    );
  }
}
