import React, { useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, isAfter } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import mockData from '../../data/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const navigate = useNavigate();

  // Calculate dashboard metrics
  const metrics = useMemo(() => {
    const { students } = mockData;
    const totalStudents = students.length;
    const sevenDaysAgo = subDays(new Date(), 7);
    
    // Status distribution
    const statusCounts = students.reduce((acc, student) => {
      acc[student.status] = (acc[student.status] || 0) + 1;
      return acc;
    }, {});

    // Active students (logged in within last 7 days)
    const activeStudents = students.filter(student => 
      isAfter(new Date(student.lastActive), sevenDaysAgo)
    ).length;

    // High priority students
    const highPriorityStudents = students.filter(student => 
      student.priority === 'High'
    );

    // Students needing attention (not contacted in 7 days or high priority)
    const studentsNeedingAttention = students.filter(student => 
      student.priority === 'High' || 
      !isAfter(new Date(student.lastActive), sevenDaysAgo) ||
      student.tags.includes('Needs Essay Help')
    );

    // Countries distribution
    const countryCounts = students.reduce((acc, student) => {
      acc[student.country] = (acc[student.country] || 0) + 1;
      return acc;
    }, {});

    // Application progress
    const applicationProgress = students.reduce((acc, student) => {
      if (student.progress.applicationsSubmitted > 0) {
        acc.submitted += 1;
      } else if (student.progress.essaysStarted) {
        acc.applying += 1;
      } else if (student.progress.collegeListCreated) {
        acc.shortlisting += 1;
      } else {
        acc.exploring += 1;
      }
      return acc;
    }, { exploring: 0, shortlisting: 0, applying: 0, submitted: 0 });

    return {
      totalStudents,
      activeStudents,
      statusCounts,
      highPriorityStudents,
      studentsNeedingAttention,
      countryCounts,
      applicationProgress
    };
  }, []);

  // Prepare chart data
  const statusChartData = Object.entries(metrics.statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const topCountries = Object.entries(metrics.countryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([country, count]) => ({ country, students: count }));

  const recentActivity = mockData.students
    .sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive))
    .slice(0, 5);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your students today.
        </Typography>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Students</Typography>
              </Box>
              <Typography variant="h3" color="primary">
                {metrics.totalStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active in platform
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Active (7 days)</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {metrics.activeStudents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recently engaged
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Need Attention</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                {metrics.studentsNeedingAttention.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High priority or inactive
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Applications</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {metrics.statusCounts.Submitted || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submitted this cycle
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Lists */}
      <Grid container spacing={3}>
        {/* Status Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Status Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Countries */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Students by Country
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCountries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Student Activity
              </Typography>
              <List>
                {recentActivity.map((student, index) => (
                  <ListItem
                    key={student.id}
                    divider={index < recentActivity.length - 1}
                    sx={{ px: 0 }}
                  >
                    <ListItemAvatar>
                      <Avatar>{student.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            {student.email}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            Last active: {format(new Date(student.lastActive), 'MMM dd, yyyy HH:mm')}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip
                      label={student.status}
                      size="small"
                      color={
                        student.status === 'Submitted' ? 'success' :
                        student.status === 'Applying' ? 'warning' :
                        student.status === 'Shortlisting' ? 'info' : 'default'
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/students')}
                sx={{ mt: 2 }}
              >
                View All Students
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Students Needing Attention
              </Typography>
              <List>
                {metrics.studentsNeedingAttention.slice(0, 5).map((student, index) => (
                  <ListItem
                    key={student.id}
                    divider={index < 4}
                    sx={{ px: 0 }}
                  >
                    <ListItemAvatar>
                      <Avatar>{student.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={student.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            {student.country} • {student.grade}
                          </Typography>
                          <br />
                          <Box sx={{ mt: 0.5 }}>
                            {student.tags.map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                    <Button
                      size="small"
                      onClick={() => navigate(`/students/${student.id}`)}
                    >
                      View
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/students?filter=needs-attention')}
                sx={{ mt: 2 }}
              >
                View All ({metrics.studentsNeedingAttention.length})
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;