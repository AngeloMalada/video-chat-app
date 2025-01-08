import { ReactNode } from 'react';

import { StreamVideoProvider } from '@components';

function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}

export default RootLayout;
