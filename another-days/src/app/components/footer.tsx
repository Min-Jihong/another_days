'use client';

import Link from 'next/link';
import { HouseLine, Note, User, DotsThree, Icon } from '@phosphor-icons/react';
import { Button } from './button';
import { redirect, useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/util/cn';

const Footer = () => {
  return (
    <nav className="bg-primary fixed bottom-5 ml-5 flex h-[52px] w-[calc(100%-40px)] items-center rounded-full shadow-md">
      <RedirectButton icon={HouseLine} segement="home" />
      <RedirectButton icon={Note} segement="note" />
      <RedirectButton icon={User} segement="user" />
      <RedirectButton icon={DotsThree} segement="setting" />
    </nav>
  );
};

export { Footer };

const RedirectButton = ({ icon: Icon, segement }: { icon: Icon; segement: string }) => {
  const currentPath = useSelectedLayoutSegment();
  const isSeleted = segement === currentPath;
  return (
    <Button variant="icon" className="flex flex-1 hover:bg-transparent" onClick={() => redirect(segement)}>
      <Icon className={cn('fill-secondary', isSeleted && 'fill-tertiary')} />
    </Button>
  );
};
