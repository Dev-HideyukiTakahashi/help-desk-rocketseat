type Props = {
  time: string;
  isSelected: boolean;
  onClick: () => void;
};

export function TimeButton({ time, isSelected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full border border-gray-400 text-xs 
        ${isSelected ? 'bg-blue-base text-white' : 'text-gray-400'}`}
    >
      {time}
    </button>
  );
}
