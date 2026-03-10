import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'le5knikv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
