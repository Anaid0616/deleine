import Image from 'next/image';
import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FiMail, FiPhone } from 'react-icons/fi';

const aboutQuery = `*[_type == "aboutPage"][0]{
  title,
  subtitle,
  sections[]{
    name,
    role,
    body,
    phone,
    email,
    instagramUrl,
    facebookUrl,
    imagePosition,
    "imageUrl": image.asset->url
  }
}`;

type AboutSection = {
  name: string;
  role: string;
  body: string | null;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  imagePosition: 'left' | 'right';
  imageUrl: string;
};

type AboutPageData = {
  title: string;
  subtitle: string;
  sections: AboutSection[];
};

export default async function About() {
  const about = await sanityClient.fetch<AboutPageData>(aboutQuery);

  return (
    <main className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-[1200px] text-center">
        <h1 className={`${ebGaramond.className} mb-4 text-4xl md:text-5xl`}>
          {about?.title}
        </h1>

        <p className="mb-10 text-xl font-semibold">{about?.subtitle}</p>

        <div>
          {about?.sections?.map((section, index) => {
            const isLeftImage = section.imagePosition === 'left';

            const imageBlock = (
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                <Image
                  src={section.imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            );

            const textBlock = (
              <div className="flex h-full flex-col items-center justify-center border border-neutral-300 bg-white px-6 py-8 text-center shadow-sm md:px-10 md:py-10">
                <h2
                  className={`${ebGaramond.className} mb-2 text-3xl md:text-4xl`}
                >
                  {section.name}
                </h2>

                <p className="mb-5 text-lg font-semibold">{section.role}</p>

                {section.body && (
                  <p className="mb-6 max-w-[42ch] leading-7 text-neutral-700">
                    {section.body}
                  </p>
                )}

                {(section.phone || section.email) && (
                  <div className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:text-base">
                    {section.phone && (
                      <a
                        href={`tel:${section.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-2 transition-opacity duration-200 hover:text-[var(--color-accent)]"
                      >
                        <FiPhone className="h-4 w-4" />
                        <span>{section.phone}</span>
                      </a>
                    )}

                    {section.phone && section.email && (
                      <span className="text-neutral-400">||</span>
                    )}

                    {section.email && (
                      <a
                        href={`mailto:${section.email}`}
                        className="inline-flex items-center gap-2 transition-opacity duration-200 hover:text-[var(--color-accent)]"
                      >
                        <FiMail className="h-4 w-4" />
                        <span>{section.email}</span>
                      </a>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  {section.instagramUrl && (
                    <a
                      href={section.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${section.name} på Instagram`}
                      className="transition-opacity duration-200 hover:text-[var(--color-accent)]"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </a>
                  )}

                  {section.facebookUrl && (
                    <a
                      href={section.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${section.name} på Facebook`}
                      className="transition-opacity duration-200 hover:text-[var(--color-accent)]"
                    >
                      <FaFacebookF className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            );

            return (
              <section
                key={index}
                className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch overflow-hidden md:grid-cols-2"
              >
                {isLeftImage ? (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    <div className="md:order-2">{imageBlock}</div>
                    <div className="md:order-1">{textBlock}</div>
                  </>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
