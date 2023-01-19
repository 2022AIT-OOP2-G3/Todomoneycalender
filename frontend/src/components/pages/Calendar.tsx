import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
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


export  class Calendar extends React.Component {
  render(){
    return (
      <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin,interactionPlugin ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          weekends={true}
          selectable={true}
          select={this.handleDateClick}//日付をクリックした時
          eventClick={this.eventClick}//イベントをクリックした時
      />
    );
  }
  handleDateClick=(arg: any) => {//日付をクリックした時
    let title = prompt('イベントを入力してください')
    let income = prompt('収入を入力してください')
    let spending = prompt('支出を入力してください')
    let calendarApi = arg.view.calendar

    // calendarApi.unselect() // clear date selection
    if (title) {
      calendarApi.addEvent({//イベント追加
        title: title,
        income:income,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay,
        color:'white',
        textColor: 'black'
      })
    }
    if(income){
      calendarApi.addEvent({//収入イベント追加
        title: "+"+income,
        start: arg.startStr,
        end: arg.endStr,
        allday: arg.allday,
        color:'white',
        textColor:'blue'
      })
    }
    if(spending){
      calendarApi.addEvent({//支出イベント追加
        title: "-"+spending,
        start: arg.startStr,
        end: arg.endStr,
        allday: arg.allday,
        color:'white',
        textColor:'red'
      })
    }
  }
  eventClick=(eventInfo: any) =>{
    if(eventInfo.event.title.charAt(0)=='-'){
      const is_ok=window.confirm(`選択した"収入"を削除しますか？ '${eventInfo.event.title}'`);
      console.log("支出")
      if(is_ok){
        eventInfo.event.remove()
      }
    }else if(eventInfo.event.title.charAt(0)=='+'){
      const is_ok=window.confirm(`選択した"支出"を削除しますか？ '${eventInfo.event.title}'`);
      console.log("収入")
      if(is_ok){
        eventInfo.event.remove()
      }
    }
    else{
      const is_ok=window.confirm(`選択した"イベント"を削除しますか？ '${eventInfo.event.title}'`);
      if(is_ok){
        eventInfo.event.remove()
      }
    }
  }
}

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
