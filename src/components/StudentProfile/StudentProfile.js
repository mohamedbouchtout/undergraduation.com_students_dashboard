import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Divider,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Login as LoginIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { format, formatDistance } from 'date-fns';
import mockData from '../../data/mockData';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function StudentProfile() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' });
  const [emailTemplate, setEmailTemplate] = useState({ subject: '', content: '' });

  // Get student data
  const student = useMemo(() => {
    return mockData.students.find(s => s.id === studentId);
  }, [studentId]);

  const interactions = useMemo(() => {
    return mockData.interactions[studentId] || [];
  }, [studentId]);

  const communications = useMemo(() => {
    return mockData.communications[studentId] || [];
  }, [studentId]);

  const notes = useMemo(() => {
    return mockData.notes[studentId] || [];
  }, [studentId]);

  const tasks = useMemo(() => {
    return mockData.tasks[studentId] || [];
  }, [studentId]);

  if (!student) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Student not found</Alert>
        <Button onClick={() => navigate('/students')} sx={{ mt: 2 }}>
          Back to Students
        </Button>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would save to backend
      console.log('Adding note:', newNote);
      setNewNote('');
      setNoteDialogOpen(false);
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      // In a real app, this would save to backend
      console.log('Adding task:', newTask);
      setNewTask({ title: '', description: '', priority: 'Medium' });
      setTaskDialogOpen(false);
    }
  };

  const handleSendEmail = () => {
    if (emailTemplate.subject.trim() && emailTemplate.content.trim()) {
      // In a real app, this would trigger email send
      console.log('Sending email:', emailTemplate);
      setEmailTemplate({ subject: '', content: '' });
      setEmailDialogOpen(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Exploring': return 'default';
      case 'Shortlisting': return 'info';
      case 'Applying': return 'warning';
      case 'Submitted': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'Login': return <LoginIcon />;
      case 'AI Essay Review': return <DescriptionIcon />;
      case 'University Search': return <SchoolIcon />;
      case 'Document Upload': return <AssignmentIcon />;
      default: return <StarIcon />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/students')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {student.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Student Profile & Activity Timeline
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={() => setEmailDialogOpen(true)}
          >
            Send Email
          </Button>
          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
          >
            Call Student
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNoteDialogOpen(true)}
          >
            Add Note
          </Button>
        </Box>
      </Box>

      {/* Student Overview Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, mb: 2, fontSize: '2rem' }}>
                  {student.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {student.name}
                </Typography>
                <Chip
                  label={student.status}
                  color={getStatusColor(student.status)}
                  sx={{ mb: 1 }}
                />
                <Chip
                  label={`${student.priority} Priority`}
                  color={getPriorityColor(student.priority)}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><EmailIcon /></ListItemIcon>
                  <ListItemText primary={student.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PhoneIcon /></ListItemIcon>
                  <ListItemText primary={student.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Country" 
                    secondary={student.country}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Grade" 
                    secondary={student.grade}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                Academic Profile
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="School" 
                    secondary={student.profile.school}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="GPA" 
                    secondary={student.profile.gpa}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="SAT Score" 
                    secondary={student.profile.satScore || 'Not provided'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Intended Major" 
                    secondary={student.profile.intendedMajor}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Budget" 
                    secondary={student.profile.budget}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Completion
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={student.progress.profileCompletion} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {student.progress.profileCompletion}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Application Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {student.progress.collegeListCreated && (
                  <CheckCircleIcon color="success" />
                )}
                <Typography variant="body2">
                  College List: {student.progress.collegeListCreated ? 'Created' : 'Pending'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                {student.progress.essaysStarted && (
                  <CheckCircleIcon color="success" />
                )}
                <Typography variant="body2">
                  Essays: {student.progress.essaysStarted ? 'Started' : 'Not Started'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="body2">
                  Applications Submitted: {student.progress.applicationsSubmitted}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tags & Flags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {student.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    color={tag === 'High Intent' ? 'success' : 
                           tag === 'Needs Essay Help' ? 'warning' : 'default'}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Last Active: {formatDistance(new Date(student.lastActive), new Date(), { addSuffix: true })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabbed Content */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Activity Timeline" />
            <Tab label="Communications" />
            <Tab label="Internal Notes" />
            <Tab label="Tasks & Follow-ups" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* Activity Timeline */}
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Timeline>
            {interactions.slice(0, 10).map((interaction, index) => (
              <TimelineItem key={interaction.id}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                  {format(new Date(interaction.timestamp), 'MMM dd, HH:mm')}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    {getInteractionIcon(interaction.type)}
                  </TimelineDot>
                  {index < interactions.slice(0, 10).length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    {interaction.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {interaction.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Duration: {Math.floor(interaction.metadata.duration / 60)}m {interaction.metadata.duration % 60}s
                    • {interaction.metadata.device}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Communications */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Communication History
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setEmailDialogOpen(true)}
            >
              Log Communication
            </Button>
          </Box>
          <List>
            {communications.map((comm, index) => (
              <React.Fragment key={comm.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      {comm.type === 'Email' ? <EmailIcon /> : <PhoneIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {comm.subject}
                        </Typography>
                        <Chip label={comm.type} size="small" />
                        <Chip label={comm.direction} size="small" variant="outlined" />
                        <Chip label={comm.status} size="small" color="success" />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.primary">
                          {comm.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(comm.timestamp), 'MMM dd, yyyy HH:mm')} • by {comm.staffMember}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < communications.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Internal Notes */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Internal Notes
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setNoteDialogOpen(true)}
            >
              Add Note
            </Button>
          </Box>
          <List>
            {notes.map((note, index) => (
              <React.Fragment key={note.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">
                          {note.content}
                        </Typography>
                        <Chip label={note.category} size="small" variant="outlined" />
                        {note.isPrivate && <Chip label="Private" size="small" color="warning" />}
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(note.timestamp), 'MMM dd, yyyy HH:mm')} • by {note.author}
                      </Typography>
                    }
                  />
                  <IconButton edge="end" size="small">
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                {index < notes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* Tasks & Follow-ups */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Tasks & Follow-ups
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setTaskDialogOpen(true)}
            >
              Add Task
            </Button>
          </Box>
          <List>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {task.title}
                        </Typography>
                        <Chip 
                          label={task.priority} 
                          size="small" 
                          color={getPriorityColor(task.priority)}
                        />
                        <Chip 
                          label={task.status} 
                          size="small" 
                          color={task.status === 'Completed' ? 'success' : 'default'}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.primary">
                          {task.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')} • Assigned to: {task.assignedTo}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < tasks.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </Card>

      {/* Dialogs */}
      {/* Add Note Dialog */}
      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Internal Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Content"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddNote} variant="contained">Add Note</Button>
        </DialogActions>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={taskDialogOpen} onClose={() => setTaskDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={newTask.priority}
              label="Priority"
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained">Add Task</Button>
        </DialogActions>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Send Email to {student.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            variant="outlined"
            value={emailTemplate.subject}
            onChange={(e) => setEmailTemplate({...emailTemplate, subject: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email Content"
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            value={emailTemplate.content}
            onChange={(e) => setEmailTemplate({...emailTemplate, content: e.target.value})}
            placeholder="Enter your email content here..."
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            This is a mock email interface. In production, this would integrate with your email service.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSendEmail} variant="contained">Send Email (Mock)</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default StudentProfile;