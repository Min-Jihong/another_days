'use client';
import { Footer } from '@/components/footer';
import paths from '@/data/paths';
import { useAnimateRouter } from '@/hook/use-router';

const Page = () => {
  const { push } = useAnimateRouter();

  return (
    <div className="flex flex-col items-center justify-center px-5">
      <div className="mt-5 h-[120px] w-full rounded-2xl bg-gray-700 bg-bottom p-5" onClick={() => push({ paths: paths.note })}>
        <div className="flex flex-col gap-2">
          <p className="text-gray-100 title-20-semibold">별자리 찾기</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
