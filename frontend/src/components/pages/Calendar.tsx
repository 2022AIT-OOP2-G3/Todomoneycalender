import { memo, useState, useCallback, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { ModalSchedule } from "../organisms/modal/ModalSchedule";
import styled from "styled-components";
import { useSchedules } from "../../hooks/get/useSchedules";

export const Calendar = memo(() => {
  const { getSchedules, schedules } = useSchedules();

  const [startingDay, setStartingtDay] = useState("");
  const [endingDay, setEndingDay] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => getSchedules(), []);

  console.log(schedules);

  return (
    <>
      <ModalSchedule
        uid="f"
        startingDay={startingDay}
        endingDay={endingDay}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ModalSchedule>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        events={[
          { title: "正月", date: "2023-01-01" },
          { title: "正月", date: "2023-01-02" },
        ]}
        // dateClick={console.log("dateclick!")}
        weekends={true}
        // 日付をクリック、または範囲を選択したイベント
        selectable={true}
        select={(info) => {
          setIsOpen(!isOpen);
          setStartingtDay(info.startStr);
          setEndingDay(info.endStr);
        }}
      />
    </>
  );
});

const SDiv = styled.div`
  z-index: 1000;
`;
