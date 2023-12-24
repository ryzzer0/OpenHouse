// File path: app/api/homes/route.ts
export const config = {
    runtime: 'experimental-edge',
  };
  
  export async function GET() {
    try {
      const externalResponse = await fetch('https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json');
      if (!externalResponse.ok) {
        throw new Error(`HTTP error! status: ${externalResponse.status}`);
      }
      const homesData = await externalResponse.json();
  
      return new Response(JSON.stringify(homesData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch homes data' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  