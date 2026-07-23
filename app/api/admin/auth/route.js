import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { method, email, password, phone, otp, googleToken } = await request.json();

    // Default admin credentials for demonstration
    // Email: admin@mevakkatusheenagaraja.org / admin123
    if (method === 'email') {
      if (email === 'admin@mevakkatusheenagaraja.org' && password === 'admin123') {
        return NextResponse.json({
          success: true,
          user: { name: 'Temple Chief Admin', email, role: 'administrator' },
          token: 'sim-admin-jwt-token-12345'
        });
      }
      // Also allow any admin credentials in development/demo mode
      if (email.includes('admin')) {
        return NextResponse.json({
          success: true,
          user: { name: 'Temple Admin', email, role: 'administrator' },
          token: 'sim-admin-jwt-token-' + Date.now()
        });
      }
      return NextResponse.json({ success: false, message: 'Invalid admin email or password' }, { status: 401 });
    }

    if (method === 'otp') {
      if (otp === '123456' || otp.length === 6) {
        return NextResponse.json({
          success: true,
          user: { name: 'Temple Phone Admin', phone, role: 'administrator' },
          token: 'sim-admin-jwt-token-' + Date.now()
        });
      }
      return NextResponse.json({ success: false, message: 'Invalid OTP code' }, { status: 401 });
    }

    if (method === 'google') {
      return NextResponse.json({
        success: true,
        user: { name: 'Google Admin Devotee', email: 'admin.google@mevakkatu.org', role: 'administrator' },
        token: 'sim-admin-jwt-token-' + Date.now()
      });
    }

    return NextResponse.json({ success: false, message: 'Unsupported auth method' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
