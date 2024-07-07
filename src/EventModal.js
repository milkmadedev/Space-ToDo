import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EventModal({ open, handleClose, event, handleSave, handleDelete }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setStart(event.start ? event.start.toISOString().slice(0, 16) : '');
      setEnd(event.end ? event.end.toISOString().slice(0, 16) : '');
    } else {
      setTitle('');
      setStart('');
      setEnd('');
    }
  }, [event]);

  const onSave = () => {
    handleSave({
      id: event ? event.id : Date.now(),
      title,
      start: new Date(start),
      end: new Date(end)
    });
    handleClose();
  };

  const onDelete = () => {
    if (event && event.id) {
      handleDelete(event.id);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Event Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date & Time"
          type="datetime-local"
          fullWidth
          value={start}
          onChange={(e) => setStart(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="End Date & Time"
          type="datetime-local"
          fullWidth
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        {event && (
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventModal;