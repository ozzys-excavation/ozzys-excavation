export default function Field({
  label,
  children,
  help,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  help?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-black text-[#40190E]">
        {label}
        {required && <span className="text-[#D5560B]"> *</span>}
      </span>
      {help && (
        <span className="text-sm leading-6 text-[#40190E]/70">{help}</span>
      )}
      {children}
    </label>
  );
}
