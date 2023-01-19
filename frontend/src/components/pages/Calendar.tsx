import { memo, useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useSchedules } from "../../hooks/get/useSchedules";
import { ModalSchedule } from "../organisms/modal/ModalSchedule";
import { modalScheduleState } from "../../store/modalScheduleState";
import { userScheduleState } from "../../store/userScheduleState";

export const Calendar = memo(() => {
  const { getSchedules, schedule } = useSchedules();
  const setUserSchedule = useSetRecoilState(userScheduleState);

  const [modalSchedule, setModalSchedule] = useRecoilState(modalScheduleState);

  const [startingDateTime, setStartingtDateTime] = useState("");
  const [endingDateTime, setEndingDateTime] = useState("");

  useEffect(() => {
    getSchedules();
    if (schedule !== null) setUserSchedule(schedule);
  });

  const test: Array<EventInput> = [
    { title: "正月", start: "2023-01-01T12:00", end: "2023-01-05T01:00" },
  ];

  return (
    <>

      <ModalSchedule
        start={startingDateTime}
        end={endingDateTime}
      ></ModalSchedule>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale="ja"
        slotDuration="00:30:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "0:00",
          endTime: "24:00",
        }}
        titleFormat={{
          year: "numeric",
          month: "short",
        }}
        initialView="dayGridMonth"
        events={test}
        weekends={true}
        selectable={true}
        select={(selectinfo) => {
          setStartingtDateTime(selectinfo.startStr.replace(":00+09:00", ""));
          setEndingDateTime(selectinfo.endStr.replace(":00+09:00", ""));
          setModalSchedule({ isOpen: !modalSchedule.isOpen });
          console.log(selectinfo.startStr);
        }}
      />
    </>
  );
});
