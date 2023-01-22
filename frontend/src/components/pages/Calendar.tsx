import { memo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRecoilState, useSetRecoilState } from "recoil";

import { auth } from "../../hooks/firebase/firebase";
<<<<<<< HEAD
import { useNavigate, useLocation, } from "react-router-dom";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

export const Calendar = memo(() => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname;
  auth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/");
    } else if (pathname !== "/"+ user.uid +"calender") {
        navigate("/");
    } else {
      console.log(user?.uid)
    }
  });
=======
import { useSchedules } from "../../hooks/http/get/useSchedules";
import { ModalSchedule } from "../organisms/modal/ModalSchedule";
import { modalScheduleState } from "../../store/modalScheduleState";
import { userScheduleState } from "../../store/userScheduleState";

export const Calendar = memo(() => {
  const navigate = useNavigate();
  const { getSchedules, schedule } = useSchedules();
  const setUserSchedule = useSetRecoilState(userScheduleState);

  const [modalSchedule, setModalSchedule] = useRecoilState(modalScheduleState);

  const [startingDateTime, setStartingtDateTime] = useState("");
  const [endingDateTime, setEndingDateTime] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

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

  const onClickTransitionButton = useCallback((fetchInfo: any) => {
    setCurrentYear(fetchInfo.start.getFullYear().toString());
    setCurrentMonth(fetchInfo.end.getMonth().toString());
    if (fetchInfo.end.getMonth().toString() === "0") setCurrentMonth("12");
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
    getSchedules({
      year: currentYear,
      month: currentMonth,
    });
    if (schedule !== null) setUserSchedule(schedule);
  }, [currentYear, currentMonth]);
>>>>>>> origin

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
        slotDuration="00:30:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={(fetchInfo: any) => {
          onClickTransitionButton(fetchInfo);
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
        weekends={true}
        // events={[
        //   { title: "正月", start: "2023-01-01 12:00", end: "2023-01-05T01:00" },
        // ]}
        selectable={true}
        select={(selectinfo) => {
          onClickDateTime(selectinfo);
        }}
      />
    </>
  );
});
