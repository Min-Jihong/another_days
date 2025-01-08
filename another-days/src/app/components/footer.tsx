'use client';

import { HouseLine, Note, User, DotsThree, Icon } from '@phosphor-icons/react';
import { Button } from './button';
import { redirect, useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/util/cn';
import { useAnimateRouter } from '@/hook/use-router';

const Footer = () => {
  return (
    <nav className="fixed bottom-5 ml-5 flex h-[52px] w-[calc(100%-40px)] items-center rounded-full bg-white bg-opacity-5">
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
  const { replace } = useAnimateRouter();
  return (
    <Button variant="icon" className="flex flex-1 hover:bg-transparent" onClick={() => replace({ paths: segement })}>
      <Icon className={cn('fill-gray-500', isSeleted && 'fill-white')} />
    </Button>
  );
};
