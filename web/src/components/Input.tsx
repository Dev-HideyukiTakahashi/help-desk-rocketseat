import { useState, type ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
  legend: string;
};

export function Input({ legend, type = 'text', placeholder, ...rest }: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <fieldset className="flex flex-col">
      <label
        htmlFor="input"
        className={`uppercase font-bold font-lato text-xs transition-colors duration-200
          ${focus ? 'text-blue-base' : 'text-gray-300'}`}
      >
        {legend}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="h-[40px] border-b border-gray-400
          focus:border-blue-base outline-none
          transition-colors duration-200
          placeholder:text-sm placeholder:font-lato placeholder:text-gray-400"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...rest}
      />
    </fieldset>
  );
}
