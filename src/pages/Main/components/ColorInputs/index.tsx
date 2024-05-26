import { ChangeEvent, FC } from 'react';
import * as ST from './styled';
import { Button } from '@src/components';

type Props = {
  names: string[];
  values: Record<string, number>;
  onConvert: () => void;
  onChange: (name: string, value: string) => void;
}

export const ColorInputs: FC<Props> = ({ names, values, onConvert, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  }

  return (
    <ST.Wrapper>
      <ST.InputsWrapper>
        {names.map(name => (
          <ST.InputContainer key={name}>
            <ST.Caption>{name}</ST.Caption>
            <ST.Input type={'number'} name={name} min={0} max={255} value={values[name]} onChange={handleChange} />
          </ST.InputContainer>
        ))}
      </ST.InputsWrapper>

      <Button text="Конвертировать" onClick={onConvert} />
    </ST.Wrapper>
  )
}
