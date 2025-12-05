import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linux Simulator : Terminal Online',
  description:
    "Distribution Linux recréée dans le navigateur pour t'entraîner avec de vraies commandes.",
  openGraph: {
    title: 'Linux Simulator : Terminal Online',
    description:
      "Distribution Linux recréée dans le navigateur pour t'entraîner avec de vraies commandes.",
  },
};

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
