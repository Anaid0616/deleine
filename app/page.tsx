import Image from 'next/image';
import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';

const heroQuery = `*[_type == "hero"][0]{
  ctaText,
  ctaUrl,
  "imageUrl": image.asset->url,
  "videoUrl": backgroundVideo.asset->url
}`;

const introQuery = `*[_type == "homeIntro"][0]{
  heading,
  body,
  "imageUrl": image.asset->url
}`;

export default async function Home() {
  const hero = await sanityClient.fetch(heroQuery);
  const intro = await sanityClient.fetch(introQuery);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {/* Video or fallback-img */}
        {hero?.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={hero.videoUrl} type="video/mp4" />
          </video>
        ) : hero?.imageUrl ? (
          <Image
            src={hero.imageUrl}
            alt="Deleine hero image/video"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : null}

        {/* Text + center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {hero?.ctaUrl && (
            <a
              href={hero.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Boka tid hos Deleine"
              className={`
    ${ebGaramond.className}
    inline-block px-8 py-3
    border-2 border-white text-white text-5xl
    tracking-wide
    drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
    transition-all duration-300 ease-in-out
    hover:text-[var(--color-accent)]
    hover:border-[var(--color-accent)]
  `}
            >
              {hero?.ctaText}
            </a>
          )}
        </div>
      </section>

      {/* INTRO */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto grid gap-8 md:gap-10 md:grid-cols-2 md:items-center">
          {/* Text left */}
          <div className="max-w-[450px] mx-auto lg:mx-0 text-center">
            <h1
              className={`${ebGaramond.className} text-4xl md:text-5xl mb-8 text-[var(--color-accent)]`}
            >
              {intro?.heading}
            </h1>

            <p
              className={`${ebGaramond.className} text-3xl md:text-4xl mb-6 text-[var(--color-accent)]`}
            >
              {intro?.body}
            </p>
          </div>

          {/* Image right */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-[var(--color-button-soft)] p-6 md:p-8 w-full max-w-[550px]">
              <div className="relative w-full aspect-[4/5]">
                {intro?.imageUrl && (
                  <Image
                    src={intro.imageUrl}
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
