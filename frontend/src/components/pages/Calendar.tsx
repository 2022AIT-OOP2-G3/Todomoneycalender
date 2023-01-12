import { memo } from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

export const Calendar = memo(() => {
  return (
    <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin,interactionPlugin ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        events={[{ title: '正月', date: '2023-01-01' }]}
        // dateClick={console.log("dateclick!")}
        weekends={true}
    />
  );
  

  
});
