import { NextResponse } from 'next/server';

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const STORY_FIELDS = 'id,media_type,media_url,permalink,thumbnail_url,timestamp';

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json(
      { success: false, error: 'Instagram integration is not configured.' },
      { status: 503 },
    );
  }

  try {
    const url = new URL(`${INSTAGRAM_API_URL}/${accountId}/stories`);
    url.searchParams.set('fields', STORY_FIELDS);
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });
    const payload = await response.json();

    if (!response.ok) {
      console.error('Instagram stories API error:', payload);
      return NextResponse.json(
        { success: false, error: 'Instagram stories could not be loaded.' },
        { status: response.status },
      );
    }

    const stories = Array.isArray(payload.data)
      ? [...payload.data].sort(
          (first, second) =>
            new Date(second.timestamp).getTime() - new Date(first.timestamp).getTime(),
        )
      : [];

    return NextResponse.json(
      { success: true, data: stories },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
    );
  } catch (error) {
    console.error('Instagram stories error:', error);
    return NextResponse.json(
      { success: false, error: 'Instagram stories could not be loaded.' },
      { status: 500 },
    );
  }
}
