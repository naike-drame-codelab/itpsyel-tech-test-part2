import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
