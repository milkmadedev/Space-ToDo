import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TodoList from './TodoList';
import EventModal from './EventModal';
import { Container, Grid } from '@mui/material';
import { BackgroundBeams } from './components/ui/BackgroundBeams';
import { BackgroundGradient } from './components/ui/BackgroundGradient';
import Footer from './Footer';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map((e) => (e.id === eventData.id ? eventData : e)));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white font-abril">
      <BackgroundBeams />
      <Container maxWidth="lg" className="relative z-10 py-8">
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12}>
            <BackgroundGradient>
              <div className="bg-[#1A1A1A] p-1 rounded-lg">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  selectable
                  views={['month', 'week', 'day', 'agenda']}
                />
                <TodoList todos={todos} setTodos={setTodos} />
                <Footer />
              </div>
            </BackgroundGradient>
          </Grid>
        </Grid>
        <EventModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          event={selectedEvent}
          handleSave={handleSaveEvent}
          handleDelete={handleDeleteEvent}
        />
      </Container>
    </div>
  );
}

export default App;