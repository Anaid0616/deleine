import { sanityClient } from '@/lib/sanity';
import { ebGaramond } from '@/lib/fonts';
import { poppins } from '@/lib/fonts';
import { HiChevronRight } from 'react-icons/hi';

const servicesQuery = `*[_type == "servicesPage"][0]{
  title,
  services[]{
    title,
    description,
    price
  },
  "bookingUrl": *[_type == "hero"][0].ctaUrl
}`;

type ServiceItem = {
  title: string;
  description?: string;
  price?: string;
};

type ServicesPageData = {
  title: string;
  bookingUrl?: string;
  services: ServiceItem[];
};

export default async function ServicesPage() {
  const servicesPage =
    await sanityClient.fetch<ServicesPageData>(servicesQuery);

  return (
    <main className="px-6 py-10 md:py-15">
      <div className="mx-auto max-w-[800px]">
        <h1
          className={`${ebGaramond.className} mb-4 text-center text-4xl md:text-5xl`}
        >
          {servicesPage?.title}
        </h1>

        <div className="space-y-12">
          {servicesPage?.services?.map((service, index) => (
            <section key={index} className="border-t border-black/10 pt-10">
              <h2
                className={`${ebGaramond.className} mb-2 text-3xl md:text-4xl`}
              >
                {service.title}
              </h2>

              {service.description && (
                <p className="leading-8">{service.description}</p>
              )}

              {service.price && (
                <p className="mt-4 font-medium">{service.price}</p>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <a
            href={servicesPage?.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
  ${poppins.className}
  group inline-flex items-center gap-1

  border-2 border-[var(--color-accent)]
  text-[var(--color-accent)]

  px-8 py-3
  font-semibold

  transition-all duration-300 ease-in-out

  hover:bg-[var(--color-accent)]
  hover:text-white
`}
          >
            <span>BOKA TID</span>
            <HiChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </main>
  );
}
