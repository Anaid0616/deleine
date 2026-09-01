import Image from 'next/image';
import { ebGaramond } from '@/lib/fonts';
import { FiInstagram } from 'react-icons/fi';
import { sanityClient } from '@/lib/sanity';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';

const galleryQuery = `*[_type == "galleryPage"][0]{
  heading,
  intro,
  instagramUrl,
  gallery[]{
    _key,
    type,
    title,
    alt,
    description,
    "imageUrl": image.asset->url,
    "beforeImageUrl": beforeImage.asset->url,
    "afterImageUrl": afterImage.asset->url
  }
}`;

type GalleryItem = {
  _key: string;
  type: 'single' | 'beforeAfter';
  title?: string;
  alt: string;
  description?: string;
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
};

type GalleryPageData = {
  heading?: string;
  intro?: string;
  instagramUrl?: string;
  gallery?: GalleryItem[];
};

/**
 * Gallery page displaying images from Sanity.
 *
 * Supports single images, before-and-after images, and pagination.
 */
export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const data: GalleryPageData = await sanityClient.fetch(galleryQuery);

  const params = await searchParams;

  const currentPage = Math.max(1, Number(params.page) || 1);
  const itemsPerPage = 12;

  const gallery = data?.gallery ?? [];
  const totalPages = Math.ceil(gallery.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const visibleItems = gallery.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1
            className={`
              ${ebGaramond.className}
              text-4xl md:text-5xl uppercase tracking-wide
            `}
          >
            {data?.heading || 'Bildgalleri'}
          </h1>

          {data?.intro && (
            <p className="mx-auto mt-3 max-w-xl text-lg text-neutral-600">
              {data.intro}
            </p>
          )}
        </div>

        {data?.instagramUrl && (
          <div className="mb-8 flex justify-end">
            <Button href={data.instagramUrl}>
              <FiInstagram className="h-4 w-4" />
              Följ oss på Instagram
            </Button>
          </div>
        )}

        {data?.gallery?.length ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {visibleItems.map((item) => (
                <article key={item._key} className="group">
                  {item.type === 'beforeAfter' ? (
                    <div className="grid aspect-square grid-cols-2">
                      {item.afterImageUrl && (
                        <div className="relative h-full overflow-hidden bg-neutral-100">
                          <Image
                            src={item.afterImageUrl}
                            alt={`${item.alt} - efter`}
                            fill
                            sizes="(min-width: 768px) 17vw, 25vw"
                            className="object-cover"
                          />
                        </div>
                      )}

                      {item.beforeImageUrl && (
                        <div className="relative h-full overflow-hidden bg-neutral-100">
                          <Image
                            src={item.beforeImageUrl}
                            alt={`${item.alt} - före`}
                            fill
                            sizes="(min-width: 768px) 17vw, 25vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    item.imageUrl && (
                      <div className="aspect-square overflow-hidden bg-neutral-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.alt}
                          width={600}
                          height={600}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )
                  )}

                  {(item.title || item.description) && (
                    <div className="pt-3 text-center">
                      {item.title && (
                        <h2
                          className={`${ebGaramond.className} text-2xl text-[var(--color-accent)]`}
                        >
                          {item.title}
                        </h2>
                      )}

                      {item.description && (
                        <p className="mt-1 text-sm text-neutral-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/bildgalleri"
            />
          </>
        ) : (
          <p className="text-center text-neutral-500">
            Inga bilder har lagts till ännu.
          </p>
        )}
      </div>
    </main>
  );
}
