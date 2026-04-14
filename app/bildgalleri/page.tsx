import Image from 'next/image';
import { ebGaramond } from '@/lib/fonts';
import { FiInstagram } from 'react-icons/fi';

type GalleryPost = {
  id: string;
  image: string;
  href: string;
};

const mockPosts: GalleryPost[] = [
  { id: '1', image: '/images/gallery-1.jpg', href: '#' },
  { id: '2', image: '/images/gallery-2.jpg', href: '#' },
  { id: '3', image: '/images/gallery-3.jpg', href: '#' },
  { id: '4', image: '/images/gallery-4.jpg', href: '#' },
  { id: '5', image: '/images/gallery-5.jpg', href: '#' },
  { id: '6', image: '/images/gallery-6.jpg', href: '#' },
];

export default function InstagramGallerySection() {
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
            Bildgalleri
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
            Utvalda arbeten och inspiration från salongen.
          </p>
        </div>

        <div className="mb-8 flex justify-end">
          <a
            href="https://www.instagram.com/deleine.hair/"
            target="_blank"
            rel="noopener noreferrer"
            className="
    inline-flex items-center gap-2
    border-2 border-[var(--color-accent)]
    px-5 py-2 font-medium
    text-[var(--color-accent)]
    transition
    hover:bg-[var(--color-accent)]
    hover:text-white
  "
          >
            <FiInstagram className="h-4 w-4" />
            Följ på Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {mockPosts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              className="group block overflow-hidden bg-neutral-100"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
