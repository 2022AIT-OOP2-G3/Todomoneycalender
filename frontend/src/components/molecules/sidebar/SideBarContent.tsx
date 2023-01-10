import { FC } from "react";
import styled from "styled-components";

import { TitleWithColor } from "../../../../types/titleWithColor";

interface Props {
  schedules: Array<TitleWithColor>;
}

export const SideBarContent: FC<Props> = (props) => {
  const { schedules } = props;

  return (
    <SUl>
      {schedules.map((schedule) => (
        <SLi key={schedule.title} color={schedule.color}>
          {schedule.title}
        </SLi>
      ))}
    </SUl>
  );
};

const SUl = styled.ul`
  height: 100vh;
  width: 200px;
  line-height: 40px;
  float: left;
  text-align: center;
  background-color: white;
  border-right: 1px solid #dcdcdc;
`;

const SLi = styled.li`
  list-style: none;
  &:before {
    margin-right: 10px;
    content: "●";
    color: ${({ color }) => {
      return color;
    }};
  }
`;
