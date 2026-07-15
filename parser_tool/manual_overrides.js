module.exports = {
    // 1. CLASSES TO DELETE (Type the exact Batch, Day, and Start Time from the Excel data)
    // Day format: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    // Start format: 9=9AM, 10=10AM, 13=1PM, etc.
    deletions: [
        // Example: Delete A6's Monday 9 AM class
        // { batch: "A6", day: 1, start: 9 } 
         { batch: "A6", day: 6, start: 10 },
        { batch: "A5", day: 6, start: 10 },
        { batch: "A6", day: 3, start: 9 },
        { batch: "A6", day: 2, start: 15 },
        { batch: "A5", day: 2, start: 15 },
        { batch: "A5", day: 3, start: 15 },
        { batch: "A5", day: 1, start: 15 },
        { batch: "A7", day: 5, start: 15 },
    ],

    // 2. CLASSES TO ADD (Format exactly like your data.js output)
    additions: [
        /* Example: Add a new custom class for A6
        {
            batch: "A6",
            day: 1, 
            start: 9, 
            duration: 1,
            title: "Extra Coding (Lab)",
            code: "CR301",
            teacher: "Dr. XYZ",
            type: "lab" 
        }
        */
       { batch: "A6",
      "day": 2,
      "start": 15,
      "duration": 2 ,
      "title": "SDF-2",
      "code": "FF1",
      "teacher": "ROH",
      "type": "lec"
    },
        { batch: "A5",
      "day": 2,
      "start": 15,
      "duration": 2 ,
      "title": "SDF-2",
      "code": "FF1",
      "teacher": "ROH",
      "type": "lec"
    },
        { batch: "A6",
      "day": 3,
      "start": 11,
      "duration": 1,
      "title": "UHV",
      "code": "TS12",
      "teacher": "YN",
      "type": "tut"
    },
        {batch: "A5",
      "day": 3,
      "start": 15,
      "duration": 2,
      "title": "SDF Lab",
      "code": "CL01",
      "teacher": "TNV/KRL",
      "type": "lab"
    },
        {batch: "A5",
      "day": 1,
      "start": 15,
      "duration": 1,
      "title": "UHV",
      "code": "TR307",
      "teacher": "PRI",
      "type": "tut"
    },
        {batch: "A7",
      "day": 5,
      "start": 15,
      "duration": 2,
      "title": "Physics Lab-2",
      "code": "PL3",
      "teacher": "RKD/INC",
      "type": "lab"
    },
    ]
};
