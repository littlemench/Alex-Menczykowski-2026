interface ProofPoint {
  value: string;
  label: string;
  note?: string;
}

interface ProofPointsProps {
  points: ProofPoint[];
}

export default function ProofPoints({ points }: ProofPointsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
      {points.map((point) => (
        <div key={point.label} className="flex flex-col gap-1">
          <span className="text-[22px] font-semibold">{point.value}</span>
          <span className="text-muted-foreground">{point.label}</span>
          {point.note && (
            <span className="text-[12px] font-[300] text-muted-foreground">{point.note}</span>
          )}
        </div>
      ))}
    </div>
  );
}
