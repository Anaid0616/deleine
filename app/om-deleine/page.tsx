import Image from 'next/image';
import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

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
  phone: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
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
    <main className="px-6 py-16">
      <div className="max-w-[1200px] mx-auto text-center">
        <h1 className={`${ebGaramond.className} mb-4`}>{about?.title}</h1>
        <p className="text-lg font-medium">{about?.subtitle}</p>

        {about?.sections?.map((section, index) => (
          <section
            key={index}
            className="mx-auto mb-16 grid max-w-[1200px] gap-8 md:grid-cols-2 md:items-center"
          >
            {section.imagePosition === 'left' ? (
              <>
                <div className="relative aspect-square w-full">
                  <Image
                    src={section.imageUrl}
                    alt={section.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>

                <div className="px-4 text-center md:text-left">
                  <h2 className={`${ebGaramond.className} mb-2`}>
                    {section.name}
                  </h2>
                  <p className="mb-4">{section.role}</p>
                  <p>{section.body}</p>

                  <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                    {section.instagramUrl && (
                      <a
                        href={section.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${section.name} on Instagram`}
                        className="transition-opacity duration-200 hover:opacity-70"
                      >
                        <FaInstagram className="h-5 w-5" />
                      </a>
                    )}

                    {section.facebookUrl && (
                      <a
                        href={section.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${section.name} on Facebook`}
                        className="transition-opacity duration-200 hover:opacity-70"
                      >
                        <FaFacebookF className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 text-center md:order-1 md:text-left">
                  <h2 className={`${ebGaramond.className} mb-2`}>
                    {section.name}
                  </h2>
                  <p className="mb-4">{section.role}</p>
                  <p>{section.body}</p>
                  <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                    {section.instagramUrl && (
                      <a
                        href={section.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${section.name} on Instagram`}
                        className="transition-opacity duration-200 hover:opacity-70"
                      >
                        <FaInstagram className="h-5 w-5" />
                      </a>
                    )}

                    {section.facebookUrl && (
                      <a
                        href={section.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${section.name} on Facebook`}
                        className="transition-opacity duration-200 hover:opacity-70"
                      >
                        <FaFacebookF className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative aspect-[4/5] w-full md:order-2">
                  <Image
                    src={section.imageUrl}
                    alt={section.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
