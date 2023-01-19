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
