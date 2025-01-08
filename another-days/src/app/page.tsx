'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import paths from './data/paths';

const Page = (): JSX.Element => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isAnimationFinish, setIsAnimationFinish] = useState<boolean>(false);

  const handleClick = (): void => {
    if (!overlayRef.current || !isAnimationFinish) return;

    gsap.to(overlayRef.current, {
      opacity: 1,
      scale: 100,
      duration: 0.8,
      ease: 'power',
      onComplete: () => {
        router.replace(paths.home);
      },
    });
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-black" onClick={handleClick}>
      <div ref={overlayRef} className="z-10 size-[10px] rounded-full bg-black opacity-0 transition-transform" />
      <SpaceAnimation setIsAnimationFinish={setIsAnimationFinish} />
    </div>
  );
};

interface SpaceAnimationProps {
  setIsAnimationFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpaceAnimation = ({ setIsAnimationFinish }: SpaceAnimationProps): JSX.Element => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 우주 배경 추가 (별을 화면에 고르게 분포)
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices: number[] = [];
    for (let i = 0; i < 3000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 15000, // x 좌표
        (Math.random() - 0.5) * 15000, // y 좌표
        (Math.random() - 0.5) * 15000, // z 좌표
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // 별 모양의 원 생성 (구 형태의 별 집합)
    const sphereGeometry = new THREE.BufferGeometry();
    const spherePositions: number[] = [];
    const radius = 1000; // 구의 반지름

    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * 2 * Math.PI; // 위도
      const phi = Math.acos(2 * Math.random() - 1); // 경도

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      spherePositions.push(x, y, z);
    }

    sphereGeometry.setAttribute('position', new THREE.Float32BufferAttribute(spherePositions, 3));
    const sphereMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 }); // 색상: 흰색
    const sphere = new THREE.Points(sphereGeometry, sphereMaterial);
    sphere.scale.set(0.01, 0.01, 0.01); // 초기 크기 설정
    sphere.visible = false; // 초기에는 보이지 않음
    scene.add(sphere);

    // 초기 상태: 카메라가 먼 우주에 위치
    camera.position.z = 15000;

    // 애니메이션 변수
    let elapsedTime = 0;
    const duration = 3000; // 3초 동안 애니메이션 실행
    const approachDuration = 2000; // 2초 동안 카메라 접근
    const growDuration = 1000; // 마지막 1초 동안 별 구 성장
    const maxZoom = 1000; // 화면에서 구가 40%를 차지하는 거리

    // 별 재배치 함수
    const repositionStars = (): void => {
      const positions = starsGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        if (positions[i + 2] > camera.position.z) {
          positions[i + 2] -= 15000; // 별을 카메라 앞쪽으로 재배치
        }
      }
      starsGeometry.attributes.position.needsUpdate = true; // 변경 사항 반영
    };

    const animate = (time: number): void => {
      // time을 사용해 프레임별 경과 시간 계산
      const deltaTime = time - elapsedTime;
      elapsedTime = time;

      // 진행률 계산 (0 ~ 1)
      const progress = Math.min(elapsedTime / duration, 1);

      // 카메라가 계속 들어가는 느낌 유지
      let cameraZ = 15000 - 14500 * progress; // duration 동안 카메라 이동
      if (elapsedTime > duration) {
        // duration 이후 추가 줌 인
        cameraZ -= (elapsedTime - duration) * 0.5; // 카메라가 천천히 추가로 줌 인 (속도 조절 가능)
      }
      camera.position.z = Math.max(cameraZ, maxZoom); // 최소 줌 제한

      // 별 재배치
      repositionStars();

      // 구가 보이고 점점 커지는 애니메이션
      if (elapsedTime > approachDuration) {
        sphere.visible = true;
        const growProgress = (elapsedTime - approachDuration) / growDuration; // 2초 이후 진행률
        const targetScale = Math.min(1, growProgress); // 0에서 1까지 성장
        sphere.scale.set(targetScale * 0.3, targetScale * 0.3, targetScale * 0.3); // 최대 크기: 화면 30%
      }

      // 구 회전
      if (sphere.visible) {
        sphere.rotation.y += 0.0002;
      }

      // 렌더링
      renderer.render(scene, camera);

      // 애니메이션이 끝나면 알파벳별로 애니메이션 표시
      if (elapsedTime >= duration && textRef.current) {
        const letters = textRef.current.querySelectorAll('span');
        gsap.to(letters, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          onComplete: () => setIsAnimationFinish(true),
        });
      } else if (textRef.current) {
        gsap.set(textRef.current.querySelectorAll('span'), { opacity: 0, y: 20 }); // 초기 상태로 숨김
      }

      // 애니메이션 계속 실행
      requestAnimationFrame(animate);
    };

    // 애니메이션 시작
    animate(0);

    // 창 크기 변경 처리
    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 정리 함수
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={mountRef} className="absolute left-0 top-0 h-full w-full" />
      <div ref={textRef} className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform space-x-1 text-3xl font-light text-white">
        {'Another Days'.split('').map((letter, index) => (
          <span
            key={index}
            className="inline-block translate-y-5 font-space text-4xl opacity-0"
            style={{
              textShadow: '0px 0px 15px rgba(255, 255, 255, 1), 0px 0px 30px rgba(255, 255, 255, 0.5)',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </>
  );
};

export default Page;
