import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';

/**
 * Fetches contact page content from Sanity.
 */
const contactQuery = `*[_type == "contactPage"][0]{
  title,
  pageIntro,
  address,
  email,
  phone,
  mapUrl,
    instagram,
  facebook
}`;

type ContactPageData = {
  title?: string;
  pageIntro?: string;
  address?: string;
  email?: string;
  phone?: string;
  mapUrl?: string;
  instagram?: string;
  facebook?: string;
};

/**
 * Contact page displaying contact details, social links,
 * contact form and an optional map.
 */
export default async function ContactPage() {
  /* Fetch Sanity data */
  const contact = await sanityClient.fetch<ContactPageData>(contactQuery);

  return (
    <main className="px-6 py-10 md:py-16">
      <div className="max-w-5xl mx-auto">
        <h1
          className={`${ebGaramond.className} mb-4 text-center text-4xl md:text-5xl`}
        >
          {contact?.title}
        </h1>
        <p className="mb-12 text-center text-lg leading-8 text-neutral-600">
          {contact?.pageIntro}
        </p>

        <section className=" border border-neutral-200 bg-white px-8 py-10 md:px-14 md:py-12">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Left contact info */}
            <div className="space-y-6">
              <div>
                <p className="mb-1 text-sm uppercase tracking-wide text-accent">
                  Adress
                </p>
                <p>{contact?.address}</p>
              </div>

              <div>
                <p className="mb-1 text-sm uppercase tracking-wide text-accent">
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
                <p className="mb-1 text-sm uppercase tracking-wide text-accent">
                  Telefon
                </p>
                <a
                  href={`tel:${contact?.phone?.replace(/\s+/g, '')}`}
                  className="transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {contact?.phone}
                </a>
              </div>

              {/* Social links */}
              <div className="pt-4 flex items-center gap-4">
                {contact?.instagram && (
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
    text-accent
    transition-all duration-200
    transform
    hover:scale-120
    hover:text-black/70
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
    text-accent
    transition-all duration-200
    transform
    hover:scale-120
    hover:text-black/70
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
        </section>
      </div>
    </main>
  );
}
