import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import { MobileNav, ModeToggle } from '@components';

function Navbar() {
  return (
    <nav className="flex-between fixed z-50 w-full bg-background px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Cvele upomoc
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <MobileNav />
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
