'use client';

interface SaveButtonProps {
  onClick: () => void;
  saving: boolean;
  label?: string;
}

export default function SaveButton({ onClick, saving, label = 'Save Changes' }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="bg-arch-bronze text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-arch-bronze/90 transition-colors disabled:opacity-50"
    >
      {saving ? 'Saving...' : label}
    </button>
  );
}
