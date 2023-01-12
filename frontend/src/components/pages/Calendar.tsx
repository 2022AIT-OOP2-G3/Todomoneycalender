import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

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
          events={[{title: '正月',date: '2023-01-01'}]}
          selectable={true}
          select={this.handleDateClick}
          eventClick={this.eventClick}
      />
    );
  }
  handleDateClick=(arg: any) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = arg.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        title: title,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay
      })
    }
  }
  eventClick=(eventInfo: any) =>{
    if (confirm(`Are you sure you want to delete the event '${eventInfo.event.title}'`)) {
      
    }
  }
}
