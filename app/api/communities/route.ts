// File path: app/api/communities/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'experimental-edge',
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("ingetrequest")
    const response = await fetch('https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json');
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
