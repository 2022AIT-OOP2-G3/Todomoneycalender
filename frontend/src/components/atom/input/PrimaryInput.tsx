import { memo, FC, ChangeEvent } from "react";
import styled from "styled-components";

import { BaseInput } from "./BaseInput";

interface Props {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PrimaryInput: FC<Props> = memo((props) => {
  const { type, value,  placeholder, onChange } = props;
  return <SInput type={type} value={value} placeholder={placeholder} onChange={onChange} />;
});

const SInput = styled(BaseInput)`
  background-color: #f2f2f2;
`;
