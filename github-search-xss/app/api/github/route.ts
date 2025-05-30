import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter (q) is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'XSS-Demo-App'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from GitHub API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories from GitHub' },
      { status: 500 }
    );
  }
} 