import { Metadata } from 'next';
import VideoPortfolioPage from '@/components/video-portfolio/VideoPortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio Wideo | WHITESLOPE',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VideoPortfolioPage />;
}
