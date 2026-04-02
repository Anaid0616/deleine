import Image from 'next/image';
import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';

const homeQuery = `*[_type == "homePage"][0]{
  subtitle,
  ctaText,
  ctaUrl,
  heading,
  body,
  "imageUrl": image.asset->url,
  "videoUrl": backgroundVideo.asset->url
}`;

export default async function Home() {
  const home = await sanityClient.fetch(homeQuery);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {/* Video or fallback-img */}
        {home?.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={home.videoUrl} type="video/mp4" />
          </video>
        ) : home?.imageUrl ? (
          <Image
            src={home.imageUrl}
            alt="Deleine hero image/video"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        <h1 className="sr-only">Frisör i Solna – Deleine Hairstudio</h1>

        {/* Text + center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {home?.subtitle && (
            <p className="mb-6 max-w-3xl text-white text-xl md:text-3xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {home.subtitle}
            </p>
          )}

          {home?.ctaUrl && (
            <a
              href={home.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Boka tid hos Deleine"
              className={`
    ${ebGaramond.className}
    inline-block px-8 py-3
    border-2 border-white text-white text-2xl sm:text-3xl md:text-5xl
    tracking-wide
    drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
    transition-all duration-300 ease-in-out
    hover:text-[var(--color-accent)]
    hover:border-[var(--color-accent)]
  `}
            >
              {home?.ctaText}
            </a>
          )}
        </div>
      </section>

      {/* INTRO */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
          {/* Text left */}
          <div className="max-w-[450px] mx-auto lg:mx-0 text-center">
            <h2
              className={`${ebGaramond.className} text-4xl md:text-5xl mb-8 text-[var(--color-accent)]`}
            >
              {home?.heading}
            </h2>

            <p
              className={`${ebGaramond.className} text-3xl md:text-4xl mb-6 text-[var(--color-accent)]`}
            >
              {home?.body}
            </p>
          </div>

          {/* Image right */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-[var(--color-button-soft)] p-6 md:p-8 w-full max-w-[550px]">
              <div className="relative w-full aspect-[4/5]">
                {home?.imageUrl && (
                  <Image
                    src={home.imageUrl}
                    alt="Frisörstyling hos Deleine salong"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 80vw"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
