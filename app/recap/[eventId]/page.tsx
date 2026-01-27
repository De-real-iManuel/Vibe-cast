import { RecapViewer } from '@/components/recap/RecapViewer';

interface RecapPageProps {
  params: {
    eventId: string;
  };
}

export default function RecapPage({ params }: RecapPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecapViewer eventId={params.eventId} />
    </div>
  );
}