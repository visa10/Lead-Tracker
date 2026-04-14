export default function DisplayField({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase">{label}</p>
      {children ?? <p className="mt-1 text-gray-700">{value}</p>}
    </div>
  );
}

