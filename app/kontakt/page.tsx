import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';

const contactQuery = `*[_type == "contactPage"][0]{
  title,
  address,
  email,
  phone,
  mapUrl,
    instagram,
  facebook
}`;

/* Render contact page */
export default async function ContactPage() {
  /* Fetch Sanity data */
  const contact = await sanityClient.fetch(contactQuery);

  return (
    <main className="px-6 py-10 md:py-16">
      <div className="max-w-[1000px] mx-auto">
        <h1
          className={`${ebGaramond.className} mb-10 text-center text-4xl md:text-5xl`}
        >
          {contact?.title}
        </h1>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Left contact info */}
          <div className="space-y-6">
            <div>
              <p className="mb-1 text-sm uppercase tracking-wide text-neutral-500">
                Adress
              </p>
              <p>{contact?.address}</p>
            </div>

            <div>
              <p className="mb-1 text-sm uppercase tracking-wide text-neutral-500">
                Email
              </p>
              <a
                href={`mailto:${contact?.email}`}
                className="transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                {contact?.email}
              </a>
            </div>

            <div>
              <p className="mb-1 text-sm uppercase tracking-wide text-neutral-500">
                Telefon
              </p>
              <a
                href={`tel:${contact?.phone?.replace(/\s+/g, '')}`}
                className="transition-colors duration-200 hover:text-[var(--color-accent)]"
              >
                {contact?.phone}
              </a>
            </div>

            <div className="pt-4 flex items-center gap-4">
              {contact?.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
    text-black/70
    transition-all duration-200
    transform
    hover:scale-110
    hover:text-[var(--color-accent)]
  "
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
              )}

              {contact?.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
    text-black/70
    transition-all duration-200
    transform
    hover:scale-110
    hover:text-[var(--color-accent)]
  "
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Right contact form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {contact?.mapUrl && (
          <div className="mt-10">
            <iframe
              src={contact.mapUrl}
              className="h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </main>
  );
}
