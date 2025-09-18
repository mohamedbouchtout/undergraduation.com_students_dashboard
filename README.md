# Undergraduation.com CRM Dashboard

A comprehensive internal CRM dashboard for managing student interactions and tracking college application progress.

## 🚀 Features

### Core Functionality
- **Student Directory**: Searchable and filterable table of all students with sorting capabilities
- **Individual Student Profiles**: Comprehensive view of each student's journey and progress
- **Activity Timeline**: Track all student interactions including logins, AI questions, document uploads
- **Communication Management**: Log emails, phone calls, and other communications
- **Internal Notes System**: Team collaboration with private notes and categorization
- **Task Management**: Schedule follow-ups and track team assignments
- **Analytics Dashboard**: Key metrics, charts, and student status distribution

### Key Features
- **Real-time Search & Filtering**: Find students by name, email, country, status, or priority
- **Progress Tracking**: Visual progress bars for profile completion and application status
- **Communication Tools**: Mock email interface and communication logging
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Charts**: Visual representation of student data and progress
- **Priority Management**: Flag high-priority students needing attention

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material-UI (MUI) 5** - Comprehensive UI component library
- **React Router DOM** - Client-side routing
- **Recharts** - Charts and data visualization
- **Date-fns** - Date manipulation and formatting

### Development Tools
- **@faker-js/faker** - Generate realistic mock data
- **Create React App** - Build toolchain and development server

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Step 1: Clone/Download the Project
```bash
# If using Git
git clone <your-repo-url>
cd undergraduation-crm

# Or download and extract the zip file, then navigate to the folder
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required dependencies:
- React and React DOM
- Material-UI components and icons
- React Router for navigation
- Recharts for data visualization
- Date-fns for date formatting
- Faker.js for mock data generation

### Step 3: Start the Development Server
```bash
npm start
```

The application will start on `http://localhost:3000` and automatically open in your browser.

### Step 4: Build for Production (Optional)
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
undergraduation-crm/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js          # Main dashboard with metrics
│   │   ├── Layout/
│   │   │   └── Layout.js             # Navigation and app layout
│   │   ├── StudentDirectory/
│   │   │   └── StudentDirectory.js   # Student listing and search
│   │   └── StudentProfile/
│   │       └── StudentProfile.js     # Individual student details
│   ├── data/
│   │   └── mockData.js               # Generated mock data
│   ├── App.js                        # Main app component with routing
│   └── index.js                      # Entry point
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 💾 Mock Data

The application uses comprehensive mock data generated with Faker.js:

### Student Data (50+ students)
- **Personal Information**: Names, emails, phone numbers, countries
- **Academic Profile**: Schools, GPAs, test scores, intended majors
- **Application Status**: Exploring, Shortlisting, Applying, Submitted
- **Progress Tracking**: Profile completion, college lists, essays, applications
- **Priority Levels**: High, Medium, Low with relevant tags

### Interaction Data
- **Login Activity**: Recent login timestamps and session data
- **AI Interactions**: Essay reviews, university searches, questions asked
- **Document Management**: Transcript uploads, application submissions
- **Platform Engagement**: Profile updates, college list creation

### Communication Records
- **Multi-channel Communications**: Emails, phone calls, SMS, video calls
- **Direction Tracking**: Inbound and outbound communications
- **Staff Attribution**: Which team member handled each interaction
- **Status Monitoring**: Sent, delivered, read, replied status

### Internal Management
- **Team Notes**: Categorized internal observations and strategies
- **Task Management**: Follow-up reminders, deadlines, assignments
- **Student Tags**: High intent, needs help, international, scholarship seeker

## 🎯 Key Features Walkthrough

### Dashboard Overview
- **Quick Metrics**: Total students, active users, applications submitted
- **Visual Charts**: Status distribution pie chart, country-wise bar chart
- **Recent Activity**: Latest student interactions and engagement
- **Priority Alerts**: Students needing immediate attention

### Student Directory
- **Advanced Search**: Real-time filtering by name, email, country
- **Multiple Filters**: Status, country, priority level combinations
- **Sortable Columns**: Click headers to sort by any field
- **Bulk Actions**: Quick actions for multiple students
- **Pagination**: Handle large datasets efficiently

### Student Profiles
- **Complete Timeline**: Chronological view of all student interactions
- **Communication Hub**: Centralized view of all communications
- **Progress Tracking**: Visual indicators of application progress
- **Team Collaboration**: Internal notes and task assignments
- **Quick Actions**: Email, call, note, and task creation

### Communication Management
- **Mock Email System**: Template-based email interface (demo only)
- **Multi-channel Logging**: Track all communication types
- **Team Attribution**: Know who contacted each student when
- **Follow-up Scheduling**: Never miss important student touchpoints

## 🔧 Customization

### Adding New Student Statuses
Edit `src/data/mockData.js` and modify the `STATUSES` array:
```javascript
const STATUSES = ['Exploring', 'Shortlisting', 'Applying', 'Submitted', 'Enrolled'];
```

### Adding New Countries
Modify the `COUNTRIES` array in the same file:
```javascript
const COUNTRIES = ['India', 'United States', 'Canada', /* add more countries */];
```

### Customizing Mock Data
The `generateMockStudents()` function can be modified to:
- Change the number of generated students
- Add new student properties
- Modify realistic data ranges (GPAs, test scores, etc.)

## 🎨 UI/UX Features

### Design System
- **Material Design 3**: Modern, accessible design language
- **Consistent Color Palette**: Primary blues with semantic colors
- **Typography Hierarchy**: Clear information hierarchy
- **Responsive Layout**: Works on all screen sizes

### User Experience
- **Fast Search**: Instant filtering and search results
- **Intuitive Navigation**: Clear breadcrumbs and navigation
- **Loading States**: Smooth transitions and feedback
- **Error Handling**: Graceful error states and recovery

### Accessibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast**: Accessible color combinations
- **Focus Management**: Clear focus indicators

## 🚀 Production Deployment

### Build Optimization
The production build includes:
- **Code Splitting**: Automatic code splitting for faster loads
- **Asset Optimization**: Minified CSS and JavaScript
- **Service Worker**: Offline functionality (PWA ready)
- **Bundle Analysis**: Optimized bundle sizes

### Deployment Options
- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **Server Deployment**: Host on any Node.js server
- **CDN Distribution**: Optimize with global CDN networks

## 🔐 Security Considerations

### Mock Data Notice
- All data is generated and fictional
- No real student information is used
- Safe for demonstration purposes

### Production Security
For production deployment:
- Implement proper authentication
- Add API security layers
- Encrypt sensitive data
- Use HTTPS everywhere
- Implement proper session management

## 🧪 Testing

### Manual Testing Checklist
- [ ] Dashboard loads with correct metrics
- [ ] Student directory search works
- [ ] Individual profiles display correctly
- [ ] All tabs in student profiles function
- [ ] Mock dialogs open and close properly
- [ ] Responsive design works on mobile

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ Edge 90+

## 📊 Performance

### Optimization Features
- **Memoized Components**: React.memo for expensive renders
- **Lazy Loading**: Code splitting for route-based loading
- **Virtual Scrolling**: Efficient handling of large datasets
- **Debounced Search**: Optimized search performance

## 🤝 Contributing

### Development Guidelines
1. Follow Material-UI design patterns
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Ensure responsive design
5. Test on multiple browsers

## 📞 Support

### Common Issues
1. **Port 3000 in use**: Change port with `PORT=3001 npm start`
2. **Module not found**: Run `npm install` to ensure all dependencies are installed
3. **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Development Server
- **Hot Reloading**: Automatic refresh on code changes
- **Error Overlay**: Clear error messages in development
- **DevTools**: React and Redux DevTools support

---

## 📝 License

This project is created for technical assessment purposes. All code is provided as-is for demonstration.

---

**Built with ❤️ for Undergraduation.com Technical Assessment**

*Last Updated: September 2025*