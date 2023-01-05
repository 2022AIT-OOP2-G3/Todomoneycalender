import styled from "styled-components";

export const SideBarContent = (props) => {
  const { schedules } = props;

  return (
    <SUl>
      {schedules.map((schedule) => (
        <SLi key={schedule.title}>{schedule.title}</SLi>
      ))}
    </SUl>
  );
};

const SUl = styled.ul`
  height: 100vh;
  width: 200px;
  line-height: 40px;
  float: left;
  list-style: none;
  text-align: center;
  background-color: white;
  border-right: 1px solid #dcdcdc;
`;

const SLi = styled.li`
  list-style: none;
`;
