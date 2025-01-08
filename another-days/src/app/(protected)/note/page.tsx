'use client';
import paths from '@/data/paths';
import { useAnimateRouter } from '@/hook/use-router';

const Page = () => {
  const { push } = useAnimateRouter();

  return (
    <div className="flex size-full items-center justify-center bg-green-500 text-white" onClick={() => push({ paths: paths.user })}>
      노트 화면
    </div>
  );
};

export default Page;
