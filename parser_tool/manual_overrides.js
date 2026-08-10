module.exports = {
  // 1. CLASSES TO DELETE (Type the exact Batch, Day, and Start Time from the Excel data)
  // Day format: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  // Start format: 9=9AM, 10=10AM, 13=1PM, etc.
  deletions: [
    // Example: Delete A6's Monday 9 AM class ONLY for semester 1
    // { batch: "A6", day: 1, start: 9, semester: 1 } 

  ],

  // 2. CLASSES TO ADD (Format exactly like your data.js output)
  additions: [
    /* Example: Add a new custom class for A6 in Semester 1
    {
        semester: 1,
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

  ],

  // 3. CLASSES TO EDIT (Edit specific fields of an existing class)
  edits: [
    /* Example: Change the room to FF2 for A6's Monday 9 AM class in Semester 1
    {
        semester: 1,
        batch: "A6",
        day: 1,
        start: 9,
        changes: {
            code: "FF2" 
        }
    },
    // Example 2: Change both teacher and type for a Semester 3 class
    {
        batch: "G4",
        day: 3,
        start: 13,
        changes: {
            teacher: "Dr. XYZ",
            type: "lec"
        }
    }
    */
    {
        semester: 3,
        batch: "B12",
        day: 4,
        start: 14,
        changes: {
            code: "LT3" 
        }
    },
    {
        semester: 3,
        batch: "B12",
        day: 4,
        start: 12,
        changes: {
            code: "LT3" 
        }
    },
    {
        semester: 3,
        batch: "A5",
        day: 2,
        start: 9,
        changes: {
            start: 10
        }
    },
    
  ]
};
