import { LiveStream } from '@/components/streaming/LiveStream';

interface LivePageProps {
  params: {
    id: string;
  };
}

export default function LivePage({ params }: LivePageProps) {
  return (
    <div className="min-h-screen bg-black">
      <LiveStream eventId={params.id} />
    </div>
  );
}