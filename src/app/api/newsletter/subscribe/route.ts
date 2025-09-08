import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare form data for WordPress Kadence form submission
    const formData = new URLSearchParams();
    formData.append('field4c3f75-8e', email); // The email field from your form
    formData.append('_kb_adv_form_post_id', '2276');
    formData.append('action', 'kb_process_advanced_form_submit');
    formData.append('_kb_adv_form_id', '2276-cpt-id');

    // Submit to WordPress
    const wordpressResponse = await fetch('https://thepoonaayurveda.com/wp-admin/admin-ajax.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS Newsletter)',
      },
      body: formData.toString(),
    });

    // Check if WordPress response is successful
    if (!wordpressResponse.ok) {
      console.error('WordPress responded with status:', wordpressResponse.status);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    const responseText = await wordpressResponse.text();
    console.log('WordPress response:', responseText);

    // WordPress AJAX responses often return JSON or simple strings
    let wordpressData;
    try {
      wordpressData = JSON.parse(responseText);
    } catch {
      // If not JSON, treat as text response
      wordpressData = { message: responseText };
    }

    // Check for successful submission
    // WordPress/Kadence might return success in different formats
    if (wordpressData.success === false || responseText.includes('error')) {
      return NextResponse.json(
        { error: wordpressData.data?.message || "Subscription failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our newsletter!"
    });

  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}