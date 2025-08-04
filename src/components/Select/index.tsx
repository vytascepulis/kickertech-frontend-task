import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

type SearchableSelectProps = {
  value: string;
  setValue: (label: string, value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Select = ({
  options,
  value,
  setValue,
  placeholder,
  ...rest
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      {...rest}
      ref={containerRef}
      className='relative h-max w-full'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen((open) => !open);
        }
      }}
    >
      <div
        className={`cursor-pointer rounded border border-gray-300 bg-gray-100 py-1 pr-[25px] pl-3 font-medium`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className='tranform absolute top-[50%] right-[5px] -translate-y-[50%] text-sm text-gray-600'
        />
      </div>

      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg'>
          <input
            type='text'
            className='w-full border-b border-gray-300 px-3 py-2 outline-none'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {filteredOptions.length === 0 ? (
            <div className='p-2 text-sm font-bold text-gray-500'>No data</div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className='cursor-pointer px-3 py-2 transition-colors hover:bg-gray-100'
                onClick={() => {
                  setValue('team', opt.value);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
