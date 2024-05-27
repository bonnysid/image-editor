import { ChangeEvent, FC } from 'react';
import * as ST from './styled';

type Props = {
  value: number;
  caption?: string;
  onChange: (value: number) => void;
  min?: string;
  max?: string;
}

export const Range: FC<Props> = ({ min, max, onChange, caption, value }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value)); // Обновляем значение яркости по мере изменения ползунка
  };

  return (
    <ST.Wrapper>
      {caption && <ST.Caption>{caption}</ST.Caption>}
      <ST.Content>
        <ST.StyledInput
          min={min}
          max={max}
          type="range"
          value={value}
          onChange={handleChange}
        />
        <ST.Value>{value}</ST.Value>
      </ST.Content>
    </ST.Wrapper>
  )
}
