import { memo, FC, ChangeEvent } from "react";
import styled from "styled-components";

import { BaseInput } from "./BaseInput";

interface Props {
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: FC<Props> = memo((props) => {
  const { type, placeholder, onChange } = props;
  return <SInput type={type} placeholder={placeholder} onChange={onChange} />;
});

const SInput = styled(BaseInput)`
  background-color: #f2f2f2;
`;
