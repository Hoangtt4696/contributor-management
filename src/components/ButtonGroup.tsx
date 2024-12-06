interface ButtonGroupProps<T extends string> {
  selected: T;
  onChange: (type: T) => void;
  options: T[];
}

const ButtonGroup = <T extends string>({ selected, onChange, options }: ButtonGroupProps<T>) => (
  <div className="space-x-4">
    {options.map((opt: T) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`px-6 py-2 rounded-md transition-colors w-48 text-gray-200 bg-[#09090B] border-2 ${
          selected === opt ? 'border-white' : 'border-[#8c8c8c52]'
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default ButtonGroup;
