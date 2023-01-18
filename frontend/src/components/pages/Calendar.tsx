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
    let title = prompt('イベントを入力してください')
    let income;
    let spending;
    let calendarApi = arg.view.calendar

    // calendarApi.unselect() // clear date selection

    if (title) {
      income = prompt('収入を入力してください')
      if(income){
        title=title+"  \n収入:"+income+"円"
      }
      spending = prompt('支出を入力してください')
      if(spending){
        title=title+"  \n支出:"+spending+"円"
      }
      calendarApi.addEvent({
        title: title,
        income: income,
        spending: spending,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay
      })
    }
    // return(
    //   <div className="popup-box">
    //     <label>
    //       Name:
    //     </label>
    //   </div>
    // )
  }
  eventClick=(eventInfo: any) =>{
    eventInfo.event.remove()
  }
}
