module.exports = {
  // 1. CLASSES TO DELETE (Type the exact Batch, Day, and Start Time from the Excel data)
  // Day format: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  // Start format: 9=9AM, 10=10AM, 13=1PM, etc.
  deletions: [
    // Example: Delete A6's Monday 9 AM class
    // { batch: "A6", day: 1, start: 9 } 

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

  ]
};
