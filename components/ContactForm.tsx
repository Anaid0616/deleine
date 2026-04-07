'use client';

import { useState } from 'react';
import Button from '@/components/Button';

/**
 * ContactForm component
 *
 * Handles user input, sends form data to the API route,
 * and displays success/error feedback to the user.
 */
export default function ContactForm() {
  // Stores status message shown to the user (loading, success, error)
  const [status, setStatus] = useState('');

  /**
   * Handles form submission
   *
   * Prevents default form behavior, collects input values,
   * sends them to the backend API, and updates UI based on response.
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Reference to the form element (used for reset later)
    const form = event.currentTarget;

    // Show loading state
    setStatus('Skickar...');

    // Collect form data
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    // Send POST request to API route
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Parse response from API
    const result = await response.json();

    // Handle success
    if (response.ok) {
      setStatus('Meddelandet skickades.');
      form.reset(); // Clear form fields
    } else {
      // Handle error
      setStatus(result.error || 'Något gick fel.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name field */}
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm uppercase tracking-wide text-neutral-500"
        >
          Namn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full border-b border-black/30 bg-transparent py-2 outline-none transition-all duration-200 hover:border-black/60 focus:border-[var(--color-accent)]"
        />
      </div>

      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm uppercase tracking-wide text-neutral-500"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border-b border-black/30 bg-transparent py-2 outline-none transition-all duration-200 hover:border-black/60 focus:border-[var(--color-accent)]"
        />
      </div>

      {/* Message field */}
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm uppercase tracking-wide text-neutral-500"
        >
          Meddelande
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none border-b border-black/30 bg-transparent py-2 outline-none transition-all duration-200 hover:border-black/60 focus:border-[var(--color-accent)]"
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <Button type="submit">Skicka</Button>
      </div>

      {/* Status message (success/error/loading) */}
      {status && <p className="text-base">{status}</p>}
    </form>
  );
}
