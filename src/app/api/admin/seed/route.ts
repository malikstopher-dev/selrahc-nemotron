import { NextResponse } from 'next/server';
import { seedCmsContent } from '@/lib/seed';

export async function POST() {
  try {
    await seedCmsContent();
    return NextResponse.json({ success: true, message: 'CMS content seeded successfully' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Seed failed' }, { status: 500 });
  }
}
