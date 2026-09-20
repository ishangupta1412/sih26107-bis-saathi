interface Source {
  is_number: string;
  title: string;
  category: string;
}

const SCHEME_COLORS: Record<string, string> = {
  'IS 4151': 'bg-orange-100 text-orange-700 border-orange-200',
  'IS 302': 'bg-orange-100 text-orange-700 border-orange-200',
  'IS 9873': 'bg-orange-100 text-orange-700 border-orange-200',
  'CRS': 'bg-blue-100 text-blue-700 border-blue-200',
};

function getChipColor(is_number: string): string {
  for (const [key, color] of Object.entries(SCHEME_COLORS)) {
    if (is_number.includes(key)) return color;
  }
  return 'bg-slate-100 text-slate-600 border-slate-200';
}

export default function SourceChip({ source }: { source: Source }) {
  const colorClass = getChipColor(source.is_number);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}
      title={source.title}
    >
      <span className="font-mono">{source.is_number}</span>
      <span className="text-current opacity-60">·</span>
      <span>{source.category}</span>
    </span>
  );
}
