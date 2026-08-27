import { NextResponse } from 'next/server';

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const MEDIA_FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username';

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
    const url = new URL(`${INSTAGRAM_API_URL}/${accountId}/media`);
    url.searchParams.set('fields', MEDIA_FIELDS);
    url.searchParams.set('limit', '8');
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });
    const payload = await response.json();

    if (!response.ok) {
      console.error('Instagram API error:', payload);
      return NextResponse.json(
        { success: false, error: 'Instagram feed could not be loaded.' },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { success: true, data: payload.data ?? [] },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    );
  } catch (error) {
    console.error('Instagram feed error:', error);
    return NextResponse.json(
      { success: false, error: 'Instagram feed could not be loaded.' },
      { status: 500 },
    );
  }
}
