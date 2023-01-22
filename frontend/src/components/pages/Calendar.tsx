import { memo, useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, DatesSetArg, EventClickArg } from "@fullcalendar/core";

import { useCurrentMonth } from "../../hooks/useCurrentMonth";
import { useGetSchedule } from "../../hooks/http/get/useGetSchedule";
import { useDeleteScheduleId } from "../../hooks/http/delete/useDeleteScheduleId";
import { ModalSchedule } from "../organisms/modal/ModalSchedule";
import { modalScheduleState } from "../../store/modalScheduleState";
import { userScheduleState } from "../../store/userScheduleState";
import { changeScheduleState } from "../../store/changeScheduleState";

export const Calendar = memo(() => {
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [startingDateTime, setStartingtDateTime] = useState("");
  const [endingDateTime, setEndingDateTime] = useState("");

  const [userSchedule, setUserSchedule] = useRecoilState(userScheduleState);
  const [changeSchedule, setChangeSchedule] =
    useRecoilState(changeScheduleState);
  const [modalSchedule, setModalSchedule] = useRecoilState(modalScheduleState);

  const { getSchedules, schedule } = useGetSchedule();
  const { deleteSchedule } = useDeleteScheduleId();
  const { getCurrentMonth } = useCurrentMonth();

  const onClickDeleteSchedule = (info: EventClickArg) => {
    const result = window.confirm("予定を削除しますか？");
    if (result) {
      setChangeSchedule({ isChange: true });
      deleteSchedule({ id: Number(info.event._def.publicId) });
      info.event.remove();
    }
  };

  const onClickDateTime = (selectinfo: DateSelectArg) => {
    if (!selectinfo.startStr.match(/T/)) {
      setStartingtDateTime(selectinfo.startStr + "T00:00");
      setEndingDateTime(selectinfo.endStr + "T00:00");
    } else {
      setStartingtDateTime(selectinfo.startStr.replace(":00+09:00", ""));
      setEndingDateTime(selectinfo.endStr.replace(":00+09:00", ""));
    }

    setModalSchedule({ isOpen: !modalSchedule.isOpen });
  };

  const onClickTransitionButton = useCallback(
    (arg: DatesSetArg) => {
      setChangeSchedule({ isChange: true });
      setCurrentYear(arg.start.getFullYear().toString());
      setCurrentMonth(getCurrentMonth(arg));
      setUserSchedule(schedule);
    },
    [schedule]
  );

  console.log(changeSchedule.isChange);

  useEffect(() => {
    if (changeSchedule.isChange === true) {
      getSchedules({
        year: currentYear,
        month: currentMonth,
      });
      setChangeSchedule({ isChange: false });
    }

    if (schedule !== null) setUserSchedule(schedule);
  }, [currentYear, currentMonth, changeSchedule, schedule]);

  return (
    <>
      {modalSchedule.isOpen ? (
        <ModalSchedule
          start={startingDateTime}
          end={endingDateTime}
        ></ModalSchedule>
      ) : null}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        locale="ja"
        slotDuration="00:15:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        datesSet={onClickTransitionButton}
        events={userSchedule?.schedule.map((event) => ({
          id: event.id,
          title: event.item,
          start: event.startingDateTime,
          end: event.endingDateTime,
        }))}
        eventClick={(info: EventClickArg) => onClickDeleteSchedule(info)}
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
        weekends={true}
        selectable={true}
        select={(selectinfo) => {
          onClickDateTime(selectinfo);
        }}
      />
    </>
  );
});
