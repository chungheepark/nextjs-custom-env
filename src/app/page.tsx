import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>커스텀 ENV 빌드 설정</h1>
      <span>ENV = {process.env.NEXT_PUBLIC_APP_ENV}</span>
    </main>
  );
}
