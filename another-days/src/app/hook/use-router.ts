'use client';

import { isNil } from 'lodash-es';
import { useRouter } from 'next/navigation';

export const useAnimateRouter = () => {
  const router = useRouter();

  const animateAndNavigate = (paths: string, navigate: (path: string) => void) => {
    const currentTarget = document.querySelector('.page');
    if (isNil(currentTarget)) {
      return;
    }
    currentTarget.classList.add('animate-routing');
    setTimeout(() => {
      navigate(paths);
    }, 200);
  };

  const push = (paths: string) => {
    animateAndNavigate(paths, router.push);
  };

  const replace = (paths: string) => {
    animateAndNavigate(paths, router.replace);
  };

  return {
    push,
    replace,
  };
};
