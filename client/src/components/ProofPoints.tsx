interface ProofPoint {
  value: string;
  label: string;
  note?: string;
}

interface ProofPointSection {
  title: string;
  points: ProofPoint[];
}

interface ProofPointsProps {
  points?: ProofPoint[];
  sections?: ProofPointSection[];
}

function PointGrid({ points }: { points: ProofPoint[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
      {points.map((point) => (
        <div key={point.label} className="flex flex-col gap-1">
          <span className="font-sans text-[48px] sm:text-[54px] lg:text-[58px] font-light leading-[0.9] tracking-[-0.0425em] text-primary">{point.value}</span>
          <span className="sub-header text-muted-foreground">{point.label}</span>
          {point.note && (
            <span className="text-[12px] font-[300] text-muted-foreground">{point.note}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProofPoints({ points, sections }: ProofPointsProps) {
  if (sections) {
    return (
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.title} className="space-y-8">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{section.title}</h3>
            <PointGrid points={section.points} />
          </div>
        ))}
      </div>
    );
  }

  return <PointGrid points={points ?? []} />;
}
