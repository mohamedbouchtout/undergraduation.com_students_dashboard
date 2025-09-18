import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  Avatar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import mockData, { STATUSES, COUNTRIES } from '../../data/mockData';

function StudentDirectory() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [countryFilter, setCountryFilter] = useState(searchParams.get('country') || '');
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get('priority') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 0);
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(searchParams.get('limit')) || 25);
  const [orderBy, setOrderBy] = useState(searchParams.get('sortBy') || 'lastActive');
  const [order, setOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    let filtered = mockData.students;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.country.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(student => student.status === statusFilter);
    }

    // Apply country filter
    if (countryFilter) {
      filtered = filtered.filter(student => student.country === countryFilter);
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(student => student.priority === priorityFilter);
    }

    // Handle special filters from URL
    const filter = searchParams.get('filter');
    if (filter === 'needs-attention') {
      filtered = filtered.filter(student =>
        student.priority === 'High' ||
        student.tags.includes('Needs Essay Help') ||
        new Date() - new Date(student.lastActive) > 7 * 24 * 60 * 60 * 1000
      );
    }

    return filtered;
  }, [searchTerm, statusFilter, countryFilter, priorityFilter, searchParams]);

  // Sorting logic
  const sortedStudents = useMemo(() => {
    const comparator = (a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      // Handle date sorting
      if (orderBy === 'lastActive' || orderBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (bValue < aValue) {
        return order === 'asc' ? 1 : -1;
      }
      if (bValue > aValue) {
        return order === 'asc' ? -1 : 1;
      }
      return 0;
    };

    return [...filteredStudents].sort(comparator);
  }, [filteredStudents, order, orderBy]);

  // Pagination
  const paginatedStudents = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedStudents.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedStudents, page, rowsPerPage]);

  // Event handlers
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const handleViewStudent = (studentId) => {
    navigate(`/students/${studentId}`);
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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track all students in your CRM
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {STATUSES.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  value={countryFilter}
                  label="Country"
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <MenuItem value="">All Countries</MenuItem>
                  {COUNTRIES.map(country => (
                    <MenuItem key={country} value={country}>{country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="">All Priorities</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FilterIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setCountryFilter('');
                  setPriorityFilter('');
                  setPage(0);
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedStudents.length} of {filteredStudents.length} students
        </Typography>
      </Box>

      {/* Students Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'country'}
                    direction={orderBy === 'country' ? order : 'asc'}
                    onClick={() => handleSort('country')}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'lastActive'}
                    direction={orderBy === 'lastActive' ? order : 'asc'}
                    onClick={() => handleSort('lastActive')}
                  >
                    Last Active
                  </TableSortLabel>
                </TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2 }}>{student.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{student.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {student.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {student.grade}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>{student.country}</TableCell>
                  
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={getStatusColor(student.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={student.priority}
                      color={getPriorityColor(student.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(student.lastActive), 'MMM dd, yyyy')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(student.lastActive), 'HH:mm')}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {student.progress.profileCompletion}% Complete
                    </Typography>
                    {student.progress.applicationsSubmitted > 0 && (
                      <Typography variant="caption" color="success.main">
                        {student.progress.applicationsSubmitted} apps submitted
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {student.tags.slice(0, 2).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {student.tags.length > 2 && (
                        <Chip
                          label={`+${student.tags.length - 2}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Tooltip title="View Profile">
                        <IconButton
                          size="small"
                          onClick={() => handleViewStudent(student.id)}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Send Email">
                        <IconButton size="small">
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Call Student">
                        <IconButton size="small">
                          <PhoneIcon />
                        </IconButton>
                      </Tooltip>

                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, student)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleViewStudent(selectedStudent?.id);
          handleMenuClose();
        }}>
          View Full Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Send Follow-up Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Schedule Task
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Add Note
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Mark as High Priority
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default StudentDirectory;