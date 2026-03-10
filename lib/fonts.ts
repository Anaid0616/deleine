import { EB_Garamond, Poppins, Red_Hat_Display } from 'next/font/google';

export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const redHat = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
});
