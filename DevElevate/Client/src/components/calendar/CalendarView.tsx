import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";
import axiosInstance from "../../api/axiosinstance";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CalendarEvent {
  _id: string;
  id?: string;
  title: string;
  start: string | Date;
  end: string | Date;
  allDay: boolean;
  color?: string;
  description?: string;
}

const CalendarView = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/api/calendar/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      if (axiosInstance.isAxiosError(error) && error.response?.status !== 404) {
        toast.error("Failed to load calendar events");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt("Enter event title:");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      try {
        const newEvent = {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          color: "#3b82f6",
        };

        const res = await axiosInstance.post("/api/calendar/events", newEvent);

        setEvents((prev) => [
          ...prev,
          { ...newEvent, _id: res.data._id, id: res.data._id },
        ]);
        toast.success("Event created");
      } catch (error) {
        console.error("Error creating event:", error);
        toast.error("Failed to save event");
      }
    }
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    if (confirm(`Delete event '${clickInfo.event.title}'?`)) {
      try {
        const eventId = clickInfo.event.extendedProps._id || clickInfo.event.id;
        await axiosInstance.delete(`/api/calendar/events/${eventId}`);
        clickInfo.event.remove();
        toast.success("Event deleted");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
      }
    }
  };

  const handleEventDrop = async (dropInfo: EventDropArg) => {
    try {
      const eventId = dropInfo.event.extendedProps._id || dropInfo.event.id;

      const updatedData = {
        title: dropInfo.event.title,
        start: dropInfo.event.start,
        end: dropInfo.event.end,
        allDay: dropInfo.event.allDay,
      };

      await axiosInstance.put(`/api/calendar/events/${eventId}`, updatedData);
      toast.success("Event updated");
    } catch (error) {
      console.error("Update failed:", error);
      dropInfo.revert();
      toast.error("Could not move event");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Calendar
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Click dates to add events. Drag and drop to reschedule.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <style>{`
            :root {
              --fc-border-color: #e5e7eb;
              --fc-button-text-color: #fff;
              --fc-button-bg-color: #3b82f6;
              --fc-button-border-color: #3b82f6;
              --fc-button-hover-bg-color: #2563eb;
              --fc-button-hover-border-color: #2563eb;
              --fc-button-active-bg-color: #1d4ed8;
              --fc-button-active-border-color: #1d4ed8;
            }
            .dark {
              --fc-border-color: #374151;
              --fc-page-bg-color: #1f2937;
              --fc-neutral-bg-color: #374151;
              --fc-list-event-hover-bg-color: #374151;
            }
            .fc-toolbar-title { font-size: 1.5rem !important; font-weight: 700; }
            .fc .fc-button { border-radius: 0.5rem; font-weight: 500; text-transform: capitalize; }
            .fc-event { cursor: pointer; border-radius: 4px; border: none; }
          `}</style>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={events.map((e) => ({
              ...e,
              id: e._id,
            }))}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            height="auto"
            contentHeight="75vh"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
