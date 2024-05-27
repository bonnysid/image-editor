import { ChangeEvent, FC } from 'react';
import * as ST from './styled';

export type SelectOption = {
  value: string;
  label: string;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  caption: string;
}

export const Select: FC<Props> = ({ caption, options, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }

  return (
    <ST.Wrapper>
      <ST.Caption>{caption}</ST.Caption>
      <ST.StyledSelect value={value} onChange={handleChange}>
        {options.map(it => (
          <ST.StyledOption value={it.value}>{it.label}</ST.StyledOption>
        ))}
      </ST.StyledSelect>
    </ST.Wrapper>
  )
}
