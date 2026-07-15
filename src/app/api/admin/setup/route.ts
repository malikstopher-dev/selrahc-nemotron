import { createServiceClient } from '@/lib/supabase/service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Use admin API to create or update user
    const { data: existing } = await supabase.auth.admin.listUsers();

    const adminUser = existing?.users?.find(u => u.email === email);

    if (adminUser) {
      // Update existing user's password
      const { error } = await supabase.auth.admin.updateUserById(adminUser.id, { password });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Admin password updated' });
    }

    // Create new user
    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Admin user created' });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Setup failed' }, { status: 500 });
  }
}
