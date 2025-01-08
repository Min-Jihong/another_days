import { PropsWithChildren } from 'react';
import './globals.css';
import localFont from 'next/font/local';

const space = localFont({
  src: '../fonts/space-grotesk.woff2',
  variable: '--font-space',
  display: 'swap',
});

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={space.variable}>
      <body className="root">{children}</body>
    </html>
  );
};
export default Layout;
