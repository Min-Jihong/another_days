'use client';

import { isNil } from 'lodash-es';
import { useRouter } from 'next/navigation';

type Position = 'prev' | 'next';

export const useAnimateRouter = () => {
  const router = useRouter();

  const animateAndNavigate = ({ paths, position, navigate }: { paths: string; position: Position; navigate: (path: string) => void }) => {
    const currentTarget = document.querySelector('.page');
    if (isNil(currentTarget)) {
      return;
    }
    currentTarget.classList.add('animate-routing');
    setTimeout(() => {
      navigate(paths);
    }, 100);
  };

  const push = ({ paths, position = 'next' }: { paths: string; position?: Position }) => {
    animateAndNavigate({ paths, position, navigate: router.push });
  };

  const replace = ({ paths, position = 'next' }: { paths: string; position?: Position }) => {
    animateAndNavigate({ paths, position, navigate: router.replace });
  };

  return {
    push,
    replace,
  };
};
