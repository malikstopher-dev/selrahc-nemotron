import { NextResponse } from 'next/server';
import { seedCmsContent } from '@/lib/seed';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    // Create or update admin user if credentials provided
    if (email && password) {
      const supabase = createServiceClient();
      const { data: existing } = await supabase.auth.admin.listUsers();
      const adminUser = existing?.users?.find((u) => u.email === email);

      if (adminUser) {
        await supabase.auth.admin.updateUserById(adminUser.id, { password });
      } else {
        await supabase.auth.admin.createUser({ email, password, email_confirm: true });
      }
    }

    await seedCmsContent();
    return NextResponse.json({ success: true, message: 'CMS content seeded successfully' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Seed failed' }, { status: 500 });
  }
}
