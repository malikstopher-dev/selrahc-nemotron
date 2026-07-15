'use client';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

export default function TextField({ label, value, onChange, multiline, rows = 4, placeholder }: TextFieldProps) {
  const baseClass = 'w-full bg-arch-black text-white px-4 py-3 border border-arch-gray/20 focus:border-arch-bronze outline-none transition-colors text-sm';

  return (
    <div>
      <label className="block text-white text-xs uppercase tracking-[0.15em] mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClass} resize-y min-h-[80px]`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
