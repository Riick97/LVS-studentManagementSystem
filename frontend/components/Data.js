let subjects = [
    {
        _id: 123131,
        name: 'Mathematics',
        description: 'This is a course about counting',
        videos: [112, 113, 114],
        teachers: [222, 223, 224],
        enrolledStudents: [113232, 213131, 335],
        lectures: [123, 243, 524]
    },
    {
        _id: 123132,
        name: 'Chemistry',
        description: 'short description',
        videos: [112, 113, 114],
        teachers: [222, 223, 224],
        enrolledStudents: [213131, 334, 335],
        lectures: [123, 243, 524]
    },
    {
        _id: 123133,
        name: 'Literature',
        description: 'short description',
        videos: [112, 113, 114],
        teachers: [222, 223, 224],
        enrolledStudents: [423424, 334, 335],
        lectures: [123, 243, 524]
    }
];

let administrators = [
    {
        _id: 234243,
        accountType: 'teacher',
        email: 'teacher@teacher',
        username: 'teacher1',
    }
]

let teachers = [
    {
        _id: 242,
        permissions: 'A',
        email: 'teacher@teacher',
        username: 'teacher1',
        name: 'Gloria',
        lastName: 'Seferina',
        subjects: [243242, 536353, 535241]
    }
]

let students = [
    {
        _id: 113232,
        accountType: 'student',
        permissions: 'A',
        email: 'teacher@teacher',
        username: 'teacher1',
        name: 'Johhny',
        lastName: 'Dang',
        subjects: [123414, 545234, 534523],
        semesters: [1242, 24242, 35325]
    },
    {
        _id: 213131,
        accountType: 'student',
        permissions: 'A',
        email: 'teacher@teacher',
        username: 'teacher1',
        name: 'Kimberly',
        lastName: 'Sahara',
        subjects: [123414, 545234, 534523],
        semesters: [1, 2, 3, 4, 5, 6]
    },
    {
        _id: 423424,
        accountType: 'student',
        permissions: 'A',
        email: 'teacher@teacher',
        username: 'teacher1',
        name: 'Chris',
        lastName: 'Drivers',
        subjects: [123414, 545234, 534523],
        semesters: [1, 2, 3, 4, 5, 6]
    }
]

let videos = [
    {
        _id: 233,
        name: 'First Video',
        description: 'This video is about the first lecture',
        lecture: 234,
        path: ''
    },
    {
        _id: 252,
        name: 'Second Video - new video',
        description: 'video about the lecture',
        lecture: 234,
        path: ''
    },
    {
        _id: 237,
        name: 'Third Video',
        description: 'video about the lecture',
        lecture: 234,
        path: ''
    }
]

let lectures = [
    {
        _id: 123,
        name: 'Lecture 1',
        date: '12-03-20',
        attendingStudents: [113232, 213131, 423424, 432453],
    },
    {
        _id: 143,
        name: 'Lecture 2',
        date: '12-03-20',
        attendingStudents: [113232, 213131, 423424, 432453],
    },
    {
        _id: 727,
        name: 'Lecture 3',
        date: '12-03-20',
        attendingStudents: [113232, 213131, 423424, 432453],
    },
]



let semesters = [
    {
        _id: 24242,
        number: 1,
        grades: [4243, 4246, 4324],
        rubrics: [2334, 6564, 6463]
    },
    {
        _id: 1242,
        number: 1,
        grades: [4243, 4246, 4324],
        rubrics: [2334, 6564, 6463]
    },
    {
        _id: 24242,
        number: 1,
        grades: [4243, 4246, 4324],
        rubrics: [2334, 6564, 6463]
    },
    {
        _id: 35325,
        number: 1,
        grades: [4243, 2352, 4324],
        rubrics: [2334, 6564, 2345]
    },
]

let rubrics = [
    {
        _id: 2334,
        name: 'Rubric Presentation 1',
        rubricCategories: [2865, 6145, 6142]
    },
    {
        _id: 6564,
        name: 'Rubric Presentation 2',
        rubricCategories: [2865, 6145, 6142]
    },
    {
        _id: 6463,
        name: 'Rubric Presentation 3',
        rubricCategories: [6242, 6145, 6142]
    },
    {
        _id: 2345,
        name: 'Rubric Presentation 4',
        rubricCategories: [2865, 6145, 6142]
    },
]


let grades = [
    {
        _id: 4243,
        description: 'Mid-term',
        weight: 30,
        score: 8,
        subject: 242342
    },
    {
        _id: 4246,
        description: 'Final-test',
        weight: 30,
        score: 9,
        subject: 242342
    },
    {
        _id: 4324,
        description: 'Final-presentation',
        weight: 40,
        score: 7,
        subject: 242342
    },
    {
        _id: 2352,
        description: 'Last-term',
        weight: 30,
        score: 8,
        subject: 242342
    },
]

