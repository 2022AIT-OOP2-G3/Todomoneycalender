import { memo, useState, useEffect, useCallback } from "react";
import { Tooltip } from "bootstrap";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, DatesSetArg, EventClickArg } from "@fullcalendar/core";

import { auth } from "../../hooks/firebase/firebase";
import { useCurrentMonth } from "../../hooks/useCurrentMonth";
import { useGetSchedule } from "../../hooks/http/get/useGetSchedule";
import { useDeleteScheduleId } from "../../hooks/http/delete/useDeleteScheduleId";
import { ModalSchedule } from "../organisms/modal/ModalSchedule";
import { modalScheduleState } from "../../store/modalScheduleState";
import { userScheduleState } from "../../store/userScheduleState";
import { changeScheduleState } from "../../store/changeScheduleState";
import { EventHoveringArg } from "@fullcalendar/core";

export const Calendar = memo(() => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [startingDateTime, setStartingtDateTime] = useState("");
  const [endingDateTime, setEndingDateTime] = useState("");

  const [userSchedule, setUserSchedule] = useRecoilState(userScheduleState);
  const [changeSchedule, setChangeSchedule] =
    useRecoilState(changeScheduleState);
  const [modalSchedule, setModalSchedule] = useRecoilState(modalScheduleState);

  const { getSchedules, schedule } = useGetSchedule();
  const { deleteSchedule } = useDeleteScheduleId();
  const { getCurrentMonth } = useCurrentMonth();

  let tooltipInstance: any = null;

  const onClickDeleteSchedule = (eventClickinfo: EventClickArg) => {
    const result = window.confirm("予定を削除しますか？");
    if (result) {
      setChangeSchedule({ isChange: true });
      deleteSchedule({ id: Number(eventClickinfo.event._def.publicId) });
      eventClickinfo.event.remove();
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
    [getCurrentMonth, schedule, setChangeSchedule, setUserSchedule]
  );

  const onMouseEnter = (eventMouseEnterInfo: EventHoveringArg) => {
    if (eventMouseEnterInfo.event.extendedProps.description) {
      tooltipInstance = new Tooltip(eventMouseEnterInfo.el, {
        title: eventMouseEnterInfo.event.extendedProps.description,
        html: true,
        placement: "top",
        delay: { show: 1000, hide: 400 },
        trigger: "hover",
        container: "body",
      });
      tooltipInstance.show();
    }
  };

  const onMouseLeave = () => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };

  console.log(changeSchedule.isChange);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      } else if (pathname !== "/" + user.uid + "/calender") {
        navigate("/");
      } else {
        console.log(user?.uid + " is accessing")
      }
    });
    if (changeSchedule.isChange === true) {
      getSchedules({
        year: currentYear,
        month: currentMonth,
      });
      setChangeSchedule({ isChange: false });
    }
    if (schedule !== null) setUserSchedule(schedule);
  }, [currentYear, currentMonth, changeSchedule, schedule, setUserSchedule, pathname, navigate, getSchedules, setChangeSchedule]);

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
        select={onClickDateTime}
        events={userSchedule?.schedule.map((event) => ({
          id: event.id,
          description: `支出: ${event.spendingAmount}`,
          title: event.item,
          start: event.startingDateTime,
          end: event.endingDateTime,
        }))}
        eventClick={onClickDeleteSchedule}
        eventMouseEnter={onMouseEnter}
        eventMouseLeave={onMouseLeave}
        datesSet={onClickTransitionButton}
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
      />
    </>
  );
});
