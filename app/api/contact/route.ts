import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Handles contact form submissions.
 *
 * Receives name, email and message from the frontend,
 * validates that all fields contain real content,
 * and sends an email using Resend.
 */
export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request
    const body = await request.json();
    const { name, email, message } = body;

    // Remove extra spaces from the beginning and end of each field
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();

    // Stop the request if any field is empty after trimming
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'Alla fält måste fyllas i.' },
        { status: 400 },
      );
    }

    // Send the email through Resend
    const result = await resend.emails.send({
      from: 'Deleine <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL || 'diana.bergelin@gmail.com'],
      subject: `Nytt meddelande från kontaktsidan – ${name}`,
      replyTo: email,
      html: `
    <h2>Nytt meddelande från kontaktsidan</h2>
    <p><strong>Namn:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Meddelande:</strong></p>
    <p>${message}</p>
  `,
    });

    console.log('Resend result:', result);

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: 'Kunde inte skicka mailet.' },
        { status: 500 },
      );
    }

    // Return a success response if everything worked
    return NextResponse.json(
      { message: 'Meddelandet skickades.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json({ error: 'Något gick fel.' }, { status: 500 });
  }
}
