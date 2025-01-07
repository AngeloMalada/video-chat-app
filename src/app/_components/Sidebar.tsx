'use client';
import { sidebarLinks, cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

type Props = {};

function Sidebar() {
  const path = usePathname();
  return (
    <section className="bg-dark-1 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 pt-2 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((sidebarLink) => {
          const isActive =
            path === sidebarLink.route || path.startsWith(sidebarLink.route);
          return (
            <Link
              href={sidebarLink.route}
              key={sidebarLink.label}
              className={cn(
                'flex items-center justify-start gap-4 rounded-lg p-4',
                {
                  'bg-blue-1': isActive,
                },
              )}
            >
              <Image
                src={sidebarLink.imgUrl}
                alt={sidebarLink.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {sidebarLink.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Sidebar;
