import leftSvg from '../assets/icons/left.svg';
import rightSvg from '../assets/icons/right.svg';

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function Pagination({ current, total, onNext, onPrevious }: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10  ">
      <button
        onClick={onPrevious}
        disabled={current === 1}
        className="bg-blue-base p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-light transition-colors"
      >
        <img src={leftSvg} alt="Voltar" />
      </button>

      <span className="text-sm font-lato font-bold text-gray-400">
        {current} de {total}
      </span>

      <button
        onClick={onNext}
        disabled={current === total}
        className="bg-blue-base p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-light transition-colors"
      >
        <img src={rightSvg} alt="Avançar" />
      </button>
    </div>
  );
}
