'use client';
import paths from '@/data/paths';
import { useAnimateRouter } from '@/hook/use-router';

const Page = () => {
  const { push } = useAnimateRouter();

  return (
    <div className="flex size-full items-center justify-center bg-blue-500 text-white" onClick={() => push({ paths: paths.note, position: 'prev' })}>
      유저 화면
    </div>
  );
};

export default Page;
