import { Metadata } from 'next';
import VideoMarketingServicePage from '@/components/video-marketing-podglad-patrycja/VideoMarketingServicePage';

// Strona-podgląd (nie linkowana z menu, nie w sitemapie) - kopia /pricing/video-marketing z dodaną
// sekcją Patrycji, do pokazania jej przed właściwą publikacją. noindex, żeby nie wpadła do wyszukiwarki.
export const metadata: Metadata = {
  title: 'Podgląd - Video Marketing | WHITESLOPE',
  robots: {
    index: false,
    follow: false,
  },
};

export default function VideoMarketingPodgladPatrycjaPage() {
  return <VideoMarketingServicePage />;
}
