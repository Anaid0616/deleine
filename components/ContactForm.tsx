'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function ContactForm() {
  const [status, setStatus] = useState<'success' | 'error' | ''>('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setLoading(true);
    setStatus('');
    setMessage('');

    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Meddelandet skickades');
        form.reset();
      } else {
        setStatus('error');
        setMessage(result.error || 'Kunde inte skicka meddelandet');
      }
    } catch {
      setStatus('error');
      setMessage('Kunde inte skicka meddelandet');
    } finally {
      setLoading(false);

      setTimeout(() => {
        setStatus('');
        setMessage('');
      }, 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="flex items-center justify-end gap-4">
        {status && (
          <p
            className={`
        text-sm transition-all duration-300 ease-out
        ${status === 'success' ? 'text-[var(--color-accent)] opacity-100 translate-y-0' : ''}
        ${status === 'error' ? 'text-[#9f4f3f] opacity-100 translate-y-0' : ''}
      `}
          >
            {message}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Skicka
        </Button>
      </div>
    </form>
  );
}
