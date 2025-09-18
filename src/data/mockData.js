import { faker } from '@faker-js/faker';

// Application statuses
const STATUSES = ['Exploring', 'Shortlisting', 'Applying', 'Submitted'];

// Countries commonly served by undergraduation.com
const COUNTRIES = [
  'India', 'United States', 'Canada', 'United Kingdom', 'Australia', 
  'Singapore', 'UAE', 'Germany', 'Netherlands', 'Sweden', 'China', 
  'South Korea', 'Japan', 'Brazil', 'Mexico', 'Nigeria', 'South Africa'
];

// Interaction types
const INTERACTION_TYPES = [
  'Login', 'AI Essay Review', 'University Search', 'Document Upload',
  'Profile Update', 'College List Creation', 'Scholarship Search',
  'Application Started', 'Essay Writing', 'Recommendation Request',
  'Transcript Upload', 'Test Score Upload', 'Interview Scheduled'
];

// Communication types
const COMMUNICATION_TYPES = ['Email', 'Phone Call', 'SMS', 'WhatsApp', 'Video Call'];

// Generate mock students
function generateMockStudents(count = 50) {
  const students = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const status = faker.helpers.arrayElement(STATUSES);
    const country = faker.helpers.arrayElement(COUNTRIES);
    const grade = faker.helpers.arrayElement(['11th', '12th', 'Gap Year']);
    
    // Generate realistic last active date (within last 30 days, some more recent)
    const lastActive = faker.date.recent({ days: 30 });
    
    // Generate realistic creation date (within last 6 months)
    const createdAt = faker.date.recent({ days: 180 });
    
    const student = {
      id: faker.string.uuid(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone: faker.phone.number(),
      country,
      grade,
      status,
      lastActive,
      createdAt,
      
      // Profile details
      profile: {
        school: faker.company.name() + ' High School',
        gpa: faker.number.float({ min: 2.5, max: 4.0, fractionDigits: 2 }),
        satScore: faker.helpers.maybe(() => faker.number.int({ min: 1000, max: 1600 })),
        actScore: faker.helpers.maybe(() => faker.number.int({ min: 20, max: 36 })),
        intendedMajor: faker.helpers.arrayElement([
          'Computer Science', 'Business Administration', 'Engineering', 'Medicine',
          'Psychology', 'Economics', 'Biology', 'Mathematics', 'Physics', 'Chemistry'
        ]),
        targetCountries: faker.helpers.arrayElements(COUNTRIES, { min: 1, max: 3 }),
        budget: faker.helpers.arrayElement(['< $30k', '$30k - $60k', '$60k - $100k', '> $100k']),
      },
      
      // Progress tracking
      progress: {
        profileCompletion: faker.number.int({ min: 30, max: 100 }),
        collegeListCreated: faker.datatype.boolean(),
        essaysStarted: faker.datatype.boolean(),
        applicationsSubmitted: status === 'Submitted' ? faker.number.int({ min: 1, max: 12 }) : 0,
      },
      
      // Tags and flags
      tags: faker.helpers.arrayElements([
        'High Intent', 'Needs Essay Help', 'International', 'Scholarship Seeker',
        'STEM Focus', 'First Generation', 'Athlete', 'Arts Focus'
      ], { min: 0, max: 3 }),
      
      priority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    };
    
    students.push(student);
  }
  
  return students;
}

// Generate interactions for a student
function generateInteractions(studentId, count = 20) {
  const interactions = [];
  
  for (let i = 0; i < count; i++) {
    interactions.push({
      id: faker.string.uuid(),
      studentId,
      type: faker.helpers.arrayElement(INTERACTION_TYPES),
      description: generateInteractionDescription(),
      timestamp: faker.date.recent({ days: 60 }),
      metadata: {
        duration: faker.number.int({ min: 30, max: 1200 }), // seconds
        device: faker.helpers.arrayElement(['Desktop', 'Mobile', 'Tablet']),
        browser: faker.helpers.arrayElement(['Chrome', 'Safari', 'Firefox', 'Edge']),
      }
    });
  }
  
  return interactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Generate realistic interaction descriptions
function generateInteractionDescription() {
  const descriptions = [
    'Reviewed essay for Common Application',
    'Searched for engineering programs in Canada',
    'Updated profile with latest test scores',
    'Created shortlist of 8 universities',
    'Asked AI about scholarship opportunities',
    'Uploaded high school transcript',
    'Started application for MIT',
    'Reviewed recommendation letter template',
    'Scheduled interview with admissions counselor',
    'Updated college preferences and budget',
    'Downloaded application checklist',
    'Joined webinar on financial aid'
  ];
  
  return faker.helpers.arrayElement(descriptions);
}

// Generate communications for a student
function generateCommunications(studentId, count = 8) {
  const communications = [];
  
  for (let i = 0; i < count; i++) {
    const type = faker.helpers.arrayElement(COMMUNICATION_TYPES);
    
    communications.push({
      id: faker.string.uuid(),
      studentId,
      type,
      direction: faker.helpers.arrayElement(['Inbound', 'Outbound']),
      subject: generateCommunicationSubject(type),
      content: generateCommunicationContent(type),
      timestamp: faker.date.recent({ days: 45 }),
      staffMember: faker.person.fullName(),
      status: faker.helpers.arrayElement(['Sent', 'Delivered', 'Read', 'Replied']),
    });
  }
  
  return communications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Generate communication subjects
function generateCommunicationSubject(type) {
  const subjects = {
    'Email': [
      'Welcome to Undergraduation.com!',
      'Your college list is ready for review',
      'Essay deadline reminder',
      'New scholarship opportunities',
      'Application status update',
      'Schedule your counseling session'
    ],
    'Phone Call': [
      'College selection consultation',
      'Essay review session',
      'Application strategy discussion',
      'Follow-up on submitted applications',
      'Scholarship guidance call'
    ],
    'SMS': [
      'Application deadline reminder',
      'Document upload reminder',
      'Meeting confirmation',
      'Quick check-in'
    ],
    'WhatsApp': [
      'Quick question about applications',
      'Document clarification',
      'Meeting reschedule request'
    ],
    'Video Call': [
      'Virtual counseling session',
      'Essay workshop',
      'Mock interview session',
      'University selection meeting'
    ]
  };
  
  return faker.helpers.arrayElement(subjects[type] || subjects['Email']);
}

// Generate communication content
function generateCommunicationContent(type) {
  const content = {
    'Email': 'Detailed email communication with comprehensive guidance and next steps...',
    'Phone Call': 'Productive phone conversation covering application strategy and timeline...',
    'SMS': 'Brief text message exchange regarding urgent deadlines...',
    'WhatsApp': 'Quick messaging conversation about application requirements...',
    'Video Call': 'Face-to-face consultation covering multiple topics...'
  };
  
  return content[type] || content['Email'];
}

// Generate notes for a student
function generateNotes(studentId, count = 5) {
  const notes = [];
  
  const noteTypes = [
    'Student is highly motivated and organized',
    'Needs additional support with essay writing',
    'Family very involved in application process',
    'Strong candidate for top-tier universities',
    'Requires scholarship guidance due to budget constraints',
    'International student - needs visa guidance',
    'Athlete with potential for sports scholarships',
    'First-generation college student - needs extra support',
    'Changed major interest - updated strategy needed',
    'Excellent test scores but needs help with extracurriculars'
  ];
  
  for (let i = 0; i < count; i++) {
    notes.push({
      id: faker.string.uuid(),
      studentId,
      content: faker.helpers.arrayElement(noteTypes),
      author: faker.person.fullName(),
      timestamp: faker.date.recent({ days: 30 }),
      isPrivate: faker.datatype.boolean(),
      category: faker.helpers.arrayElement(['General', 'Academic', 'Financial', 'Personal', 'Strategy'])
    });
  }
  
  return notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// Generate tasks
function generateTasks(studentId, count = 3) {
  const tasks = [];
  
  const taskTypes = [
    'Follow up on application status',
    'Schedule essay review session',
    'Send scholarship opportunities',
    'Review updated college list',
    'Check in on application progress',
    'Send recommendation letter guidelines',
    'Schedule mock interview',
    'Review financial aid options'
  ];
  
  for (let i = 0; i < count; i++) {
    tasks.push({
      id: faker.string.uuid(),
      studentId,
      title: faker.helpers.arrayElement(taskTypes),
      description: 'Detailed task description and context...',
      dueDate: faker.date.future(),
      priority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
      assignedTo: faker.person.fullName(),
      status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed']),
      createdAt: faker.date.recent({ days: 14 })
    });
  }
  
  return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Generate complete mock data
const students = generateMockStudents(50);
const mockData = {
  students,
  interactions: students.reduce((acc, student) => {
    acc[student.id] = generateInteractions(student.id, faker.number.int({ min: 10, max: 30 }));
    return acc;
  }, {}),
  communications: students.reduce((acc, student) => {
    acc[student.id] = generateCommunications(student.id, faker.number.int({ min: 3, max: 12 }));
    return acc;
  }, {}),
  notes: students.reduce((acc, student) => {
    acc[student.id] = generateNotes(student.id, faker.number.int({ min: 2, max: 8 }));
    return acc;
  }, {}),
  tasks: students.reduce((acc, student) => {
    acc[student.id] = generateTasks(student.id, faker.number.int({ min: 1, max: 5 }));
    return acc;
  }, {})
};

export default mockData;
export { STATUSES, COUNTRIES, INTERACTION_TYPES, COMMUNICATION_TYPES };