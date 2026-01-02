// ==================== 1. FACULTY DATA ====================
const facultyNames = {
    // BIOTECH
    "PMG": "Prof. Pammi Gauba", "AKV": "Dr. Ankisha Vijay", "ANM": "Dr Ankit Mathur",
    "ANR": "Dr. Anuradha Singh", "ANS": "Dr. Aniruddh Sharma", "APC": "Dr Apurv Chatrath",
    "ASM": "Dr.Ashwani Mathur", "CKJ": "Dr. Chakresh Jain", "DKP": "Dr Deeksha Pandey",
    "DSH": "Dr Diwakar Sharma", "EKT": "Dr. Ekta Bhatt", "GMA": "Dr. Garima Mathur",
    "GUP": "Dr Gunjam Purohit", "HNS": "Dr Haneesh Saini", "IPS": "Prof. Indira Sarethy",
    "KAR": "Dr Kareena", "KS": "Prof. Krishna Sundari", "MAS": "Dr Manisha Singh",
    "MOB": "Dr Monika Bajpai", "NDH": "Dr. Nidhi Batra", "NIS": "Dr. Nishant",
    "NKC": "Dr Neekanshika Chaddha", "NV": "Dr. Nivedita Mishra", "POC": "Dr. Pooja Choudhary",
    "RAC": "Prof. Rachana", "RD": "Dr. Reetika Debroy", "RG": "Prof. Reema Gabrani",
    "RPS": "Dr. Rajnish P Singh", "SAJ": "Dr. Sahil Jain", "SBT": "Dr Surabhi Tomar",
    "SHD": "Prof. Shweta Dang", "SHM": "Dr. Shalini Mani", "SMG": "Dr. Smriti Gaur",
    "SMO": "Prof. Sujata Mohanty", "SOC": "Dr. Sonam Chawla", "SS": "Prof. Sudha Srivastava",
    "VBR": "Prof. Vibha Rani", "VGU": "Dr Vibha Gupta",

    // PHYSICS
    "AP": "Prof. Anirban Pathak", "ANU": "Dr. Anuraj Panwar", "BCJ": "Dr. Bhubesh Chander Joshi",
    "DIN": "Dr. Dinesh Tripathi", "RKG": "Dr. Radha Krishan Gopal", "MKC": "Dr.Manoj Kumar",
    "MTR": "Dr. Manoj Tripathi", "NG": "Dr. Navendu Goswami", "NKS": "Dr. Navneet K. Sharma",
    "PC": "Dr. Papia Chowdhury", "RKD": "Prof. Rakesh Kumar Dwivedi", "SPP": "Prof. S.P. Purohit",
    "ABH": "Dr. Ashish Batnagar", "RAV": "Dr. Ravi Gupta", "GPK": "Dr. Guru Prasad Kadam",
    "VRT": "Dr. Vaibhav Rawoot", "SND": "Dr. Sandeep Mishra", "SDC": "Dr. Sandeep Chokker",
    "INC": "Dr. Indrani Chakarborty", "NAR": "Dr. Narinder Kaur", "EKY": "Dr. Ekta Yadav",
    "DAM": "Dr. Damanpreet Kaur", "DIP": "Dr. Dipti Yadav", "SHIV": "Dr. Shivani Singh",

    // HSS & OTHERS
    "MSU": "Dr Monika Suri", "AS": "Prof. Alka Sarma", "BB": "Dr. Badri Bajaj",
    "EKS": "Dr. Ekta Singh", "HK": "Dr. Harleen Kaur", "IJ": "Dr. ILA Joshi",
    "KMB": "Dr. Kanupriya Misra Bakhru", "MM": "Prof. Mukta Mani", "MRB": "Dr. Manas Ranjan Behera",
    "MB": "Dr.Monali Bhattacharya", "NAM": "Dr. Namreeta Kumari", "NES": "Dr. Neha Singh",
    "NIS": "Dr. Nibha Sinha", "PSH": "Dr. Purwa Shriwastava", "SKU": "Ms. Shikha Kumari",
    "VSE": "Dr. Vandana Sehgal", "YN": "Dr Yogita Naruka", "MDU": "Dr Mohua Dutta",
    "PRI": "Dr. Priya", "SDA": "Dr. Suraj Das", "AMN": "Dr. Amandeep", "PAC": "Dr Paridhi",

    // COMPUTER APPLICATIONS / CSE / IT
    "PTM": "Preeti Mittal", "SPS": "Dr. Sheledra Pal", "NET": "Neetu Singh (GF)",
    "JC": "Jyoti Chauhan (GF)", "IMR": "Dr. Imran Rashid", "SNG": "Shagun Gupta",
    "NM": "Noor Mohammad", "RCN": "Dr. Ruchin Gupta", "AKB": "Ms. Aakriti Bhardwaj",
    "AST": "Dr. Aastha Maheshwari", "ALK": "Dr. Alka Singhal", "APR": "Dr. Amanpreet Kaur",
    "AJP": "Dr. Amarjeet Prajapati", "AMS": "Dr. Amit Mishra", "ASA": "Dr. Anita Sahoo",
    "ANV": "Dr. Ankit Vidyarthi", "AJS": "Dr. Ankita Jaiswal", "AVR": "Dr. Ankita Verma",
    "AW": "Dr. Ankita Wadhwa", "ASK": "Dr. Anuja Shukla", "APJ": "Dr. Arpita Jadav Bhatt",
    "AM": "Dr. Asish Mishra", "ASP": "Dr. Asish Singh Parihar", "ASY": "Dr. Asmita Yadav",
    "BS": "Dr. Bhawna Saxena", "DEP": "Dr. Deepika Varshney", "DL": "Dr. Dhanalakshmi",
    "DSR": "Dr. Dharamveer Singh Rajput", "DCH": "Dr. Diksha Chawla", "DPT": "Dr. Dipti Tripathy",
    "HN": "Dr. Hema N", "IC": "Dr. Indu Chawla", "JAG": "Dr. Jagriti", "JN": "Dr. Janardhan",
    "KRL": "Dr. K. Rajalakshmi", "KM": "Dr. Kapil Madan", "KP": "Dr. Kavita Pandey",
    "KA": "Dr. Kirti Agarwal", "LM": "Dr. Lalita Mishra", "MEE": "Dr. Meenal",
    "MGR": "Dr. Megha Rathi", "MSH": "Dr. Mradula Sharma", "NIY": "Dr. Niyati Agarwal",
    "PAR": "Dr. Parmeet Kaur", "PAG": "Dr. Parul Agarwal", "PU": "Dr. Pawan Upadhyay",
    "PK": "Dr. Prakash Kumar", "PTK": "Dr. Pratik Shrivastava", "PRV": "Dr. Raghu Vamsi",
    "SAA": "Dr. Sakshi Gupta", "SHG": "Dr. Sherry Garg", "SHJ": "Dr. Shikha Jain",
    "SHP": "Dr. Shraddha Porwal", "SHB": "Dr. Shulabh Tyagi", "SHR": "Dr. Shweta Rani",
    "SJA": "Dr. Somya Jain", "SON": "Dr. Sonal", "SUD": "Dr. Suma Dawn",
    "SMS": "Dr. Sumeshwar Singh", "TAJ": "Dr. Taj Alam", "TNV": "Dr. Tanvee Gautam",
    "TRN": "Dr. Tarun Agrawal", "TKT": "Dr. Tribhuwan K. Tewari", "VRN": "Dr. Varun Srivastava",
    "VIK": "Dr. Vikash", "VIV": "Dr. Vivek Kumar Singh", "JSM": "Dr. Jasmin",
    "AKT": "Mr. Akshit", "AMT": "Mr. Amitesh", "AKM": "Mr. Anil Kumar Mehto",
    "AYS": "Mr. Ayush Sahoo", "KSA": "Mr. Kashav Ajmera", "MSI": "Mr. Megh Singhal",
    "MOS": "Mr. Mohit Singh", "NAC": "Mr. Naveen Chauhan", "PKU": "Mr. Prashant Kaushik",
    "PSO": "Mr. Prateek Soni", "RJM": "Mr. Rajeev Mishra", "ROH": "Mr. Rohit Soni",
    "SHV": "Mr. Shivendra Singh", "SHO": "Mr. Shobhit", "AMK": "Ms. Amarjeet Kaur",
    "ANP": "Ms. Anupama Padha", "ATI": "Ms. Arti Goel", "ASI": "Ms. Astha Singh",
    "CHA": "Ms. Chanchal", "DSI": "Ms. Dipti Singh", "KJ": "Ms. Kirti Jain",
    "MAY": "Ms. Mayuri", "NEH": "Ms. Neha", "PRK": "Ms. Purtee Kohli",
    "PHP": "Ms. Pushp", "RCA": "Ms. Richa", "RTK": "Ms. Ritika", "SRG": "Ms. Sarishty Gupta",
    "SYN": "Ms. Sayani", "SLK": "Ms. Silky", "SOS": "Ms. Sonal Sourabh",
    "AA": "Prof. Anuja Arora", "MKT": "Prof. Manish Kumar Thakur", "NSA": "Prof. Neetu Sardana",
    "SKS": "Prof. Sandeep K. Singh",

    // ECE
    "AB": "Dr. Ankur Bhardwaj", "AGO": "Dr. Ashish Goel", "AJK": "Dr. Ajay Kumar",
    "ABY": "Dr. Abhay Kumar", "ALJ": "Dr. Alok Joshi", "AKS": "Mr. Atul K. Srivastava",
    "APN": "Dr. Archana Pandey", "BHG": "Ms Bhawna Gupta", "GK": "Dr. Garima Kapoor",
    "GV": "Dr. Gaurav Verma", "JAS": "Dr. Jasmine Saini", "JG": "Dr. Juhi Gupta",
    "KUL": "Dr. Kuldeep Baderia", "MJ": "Dr. Madhu Jain", "MN": "Mandeep Narula",
    "MO": "Ms Monika", "NEJ": "Dr. Neetu Joshi", "NTN": "Dr. Nitin Muchal",
    "NSH": "Ms. Nisha", "PKY": "Dr. P.K. Yadav", "RHA": "Dr. Rachna Singh",
    "RMD": "Dr. Ramanand Basuriya", "RB": "Dr. Reema Buddhiraja", "RIG": "Dr. Richa Gupta",
    "RRJ": "Dr. RituRaj", "RK": "Dr. Rahul Kaushik", "RSB": "Dr Rishibrind K. Upadhyay",
    "RS": "Mr Ritesh Sharma", "RU": "Dr. Ruby Beniwal", "SLM": "Dr. Salman Khan",
    "SCH": "Dr. Saurabh Chaturvedi", "SHI": "Dr. Shivani", "SHA": "Dr. Shamim Akhtar",
    "SHS": "Ms. Shradha Saxena", "SKA": "Dr. Shruti Kalra", "SB": "Ms. Smriti Bhatanagar",
    "SMK": "Dr. Smriti Kalia", "VD": "Dr. Vivek Dwivedi", "VK": "Dr.. Vineet Khandelwal",
    "VKH": "Dr. Vijay Khare", "VNS": "Vishal Narain Saxena", "BVI": "Bhuvaneshwari S",
    "ATA": "Astha Sharma", "NHI": "Nidhi Tewari", "AMR": "Amrita Kaul",
    "VSL": "Vaishali Sharma", "MNA": "Manika Jha", "ACH": "Aanchal Agarwal",
    "JYO": "Jyoti Deshwal Yadav", "VRN": "Dr Varun Goel", "HEM": "Dr Hemant Kumar",
    "ABU": "Dr Abhijeet Upadhyay", "RRP": "Dr Radha Raman Pandey", "JYM": "Jyoti Mishra",

    // MATHEMATICS & OTHERS
    "SIM": "Simmi Sharma", "HIM": "Himanshu Chaudhary", "MTO": "Manoj Tolani",
    "JOY": "Joysmita", "NFY": "Nilufar Yasmin", "GG": "Prof. Goldie Gabrani",
    "BPC": "Prof. B. P. Chamola", "LK": "Prof. Lokendra Kumar", "PAT": "Dr. Pato Kumari",
    "YG": "Dr. Yogesh Gupta", "DCS": "Dr. Dinesh Bisht", "AN": "Dr. Anuj Bhardwaj",
    "HA": "Dr. Himanshu Agarwal", "RSH": "Dr. Richa Sharma", "MKB": "Dr. Manish Kumar Bansal",
    "NS": "Dr. Neha Singhal", "NSK": "Dr. Nisha Shukla", "MPA": "Dr. Mohd. Prawesh Alam",
    "HPT": "Dr. Himani Pant", "SP": "Dr. Shikha Pandey", "ATI": "Dr. Ayush Tripathi",
    "RSC": "Dr. Ram Surat Chauhan", "GA": "Dr. Gaurav Agrawal", "SGL": "Dr. Shashank Goel",
    "PSI": "Dr. Priya Shahi", "DM": "Prof. Deepti Mehrotra", "ANK": "Dr. Arpita Nayek",
    "MSD": "Dr. Mohd Shad", "RSA": "Dr. Rupali Srivastava", "HZR": "Dr. Hira Zaheer",
    "DGA": "Dr. Diksha Gupta", "NTS": "Mr. Nitesh Singh", "CDN": "Mr. Chandan Kumar",
    "GGL": "Dr. Gorav Gugliani", "MJH": "Ms. Madhu Jharia", "SNP": "Dr. Satyanarayan Patel",
    "ADM": "Adhirath Mandal", "SWET": "Mr. Shwetabh Singh", "ASG": "Dr. Ashish Gupta",
    "GRP": "Dr. Gorav Patel", "NBH": "Dr. Neha Badhuria"
};

const facultyNames128 = {
    // FROM SCREENSHOT 1
    "ATH": "ALKA TRIPATHI", "PKS": "Pankaj Kumar Srivastava", "NEA": "Neha Ahlawat",
    "KKS": "Kamlesh Kumar Shukla", "UMK": "Umesh Khatri", "PKR": "Pankaj Kumar Rana",
    "SKA": "Suneet Kumar Awasthi", "VM": "Vikas Malik", "AMV": "Amit Verma",
    "PKC": "Prashant Kumar Chauhan", "ADV": "Anshu Dhirendra Varshney", "URS": "Urbashi Satpathy",
    "ANK1": "Anuj Kumar", "SKH": "Sudip Kumar Haldar", "NAK": "Narender Khatri",
    "BHT": "Bharti Arora", "PRJ": "Prabhakar Jha", "HAB": "Harish Bishwakarma",
    "SUM": "Sumit Mahajan", "PSH": "Piyush Sharma", "RAK": "Rahul Kumar",
    "NIK": "Niraj Kumar", "ASP": "Asim Patra", "SHP": "Shivani Pant",
    "VIS": "Vikas Sharma", "KAS": "Kartik Samanta", "SHALU": "SHALU",
    "EKS1": "Ekta Srivastava", "AMA": "Amba Aggarwal", "ANB": "Anshu Banwari",
    "SHV": "Shweta Verma", "PRS": "Praveen Kumar Sharma", "DEV": "Deepak Verma",
    "SAV": "Sakshi Varshney", "NIC": "Nilu Chaudhary",

    // FROM SCREENSHOT 2
    "ARJ": "Arti Jain", "GAH": "Gaurav Sinha", "HMB": "Himani Bansal",
    "MKS": "Mukesh Saraswat", "NMD": "Noor Mohammad", "RSK": "Rashmi Kushwah",
    "SAP": "SatyaPrakash Patel", "SHM": "Shariq Murtuza", "SGU": "Shruti Gupta",
    "SHJ": "Shruti Jaiswal", "ADS": "Aditi Sharma", "AKB": "Akanksha Bhardwaj",
    "KKL": "Kakul", "ANG": "Avinash Gupta", "LKK": "Lakhveer Kaur"
};

// ==================== 2. SUBJECT DATA ====================
const subjectNames = {
  "15BT111": "BIOTech Lab",
  "B15CI121": "Programming Lab",
  "B11CI121": "Fundamentals of Computers & Prog",
  "MA211": "Maths-2", 
  "MA212": "Basic Maths-2",
  "PH211": "Physics-2", 
  "PH212": "Biophysical Techniques",
  "CI121": "SDF-2", 
  "CS121": "SDF Lab",
  "PH271": "Physics Lab-2", 
  "15BT111": "Biotech Lab",
  "GE112": "Workshop", 
  "HS111": "UHV" ,
  "CI211": "SDF-2",
  "EC171": "Elec. Science Lab",
  "CI271": "SDF Lab"
    
};

// ==================== 3. BATCH SCHEDULES ====================

// --- BATCH A SERIES ---
const scheduleA1 = [
    { day: 1, start: 9, duration: 1, title: "GE112", code: "TS6", teacher: "SNP", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "G1", teacher: "ANU", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "G1", teacher: "NSK", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "PH271", code: "PL1", teacher: "DIN/ABH", type: "lab" },
    { day: 1, start: 15, duration: 2, title: "HS111", code: "LL", teacher: "EKS", type: "lab" },
    { day: 2, start: 9, duration: 1, title: "PH211", code: "TS6", teacher: "RKG", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "G1", teacher: "NEJ", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "G1", teacher: "MAY", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "GE112", code: "EW1", teacher: "SNP", type: "lab" },
    { day: 3, start: 10, duration: 1, title: "HS111", code: "FF1", teacher: "NEJ", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "CI121", code: "FF3", teacher: "MAY", type: "lec" },
    { day: 4, start: 10, duration: 2, title: "CS121", code: "CL02", teacher: "MGR/RTK", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "G1", teacher: "NSK", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "CI121", code: "TS6", teacher: "AW", type: "tut" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "TS6", teacher: "MJH", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "TS6", teacher: "RSH", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "G1", teacher: "NSK", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "G1", teacher: "MAY", type: "lec" }
];

const scheduleA2 = [
    { day: 1, start: 9, duration: 1, title: "GE112", code: "TS7", teacher: "SWET", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "G1", teacher: "ANU", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "G1", teacher: "NSK", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "PH271", code: "PL2", teacher: "PC/SHIV", type: "lab" },
    { day: 1, start: 15, duration: 2, title: "HS111", code: "LL1", teacher: "KNP", type: "lab" },
    { day: 2, start: 9, duration: 1, title: "PH211", code: "TS7", teacher: "DIN", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "G1", teacher: "NEJ", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "G1", teacher: "MAY", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "GE112", code: "EW2", teacher: "SWET", type: "lab" },
    { day: 3, start: 10, duration: 1, title: "HS111", code: "FF1", teacher: "NEJ", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "CI121", code: "FF3", teacher: "MAY", type: "lec" },
    { day: 4, start: 9, duration: 2, title: "CS121", code: "CL01", teacher: "ANP/NSA", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "G1", teacher: "NSK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "HS111", code: "TS10", teacher: "MJH", type: "tut" },
    { day: 5, start: 9, duration: 1, title: "MA211", code: "TS7", teacher: "NSK", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "G1", teacher: "NSK", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "CI121", code: "TS6", teacher: "ROH", type: "tut" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "G1", teacher: "MAY", type: "lec" }
];

const scheduleA3 = [
    { day: 1, start: 9, duration: 1, title: "GE112", code: "TS8", teacher: "CDN", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF2", teacher: "RKD", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF1", teacher: "MPA", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "PH211", code: "TS7", teacher: "RKG", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "MA211", code: "TS12", teacher: "ATI", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "FF1", teacher: "RSC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "FF1", teacher: "AJS", type: "lec" },
    { day: 2, start: 15, duration: 2, title: "GE112", code: "EW1", teacher: "CDN", type: "lab" },
    { day: 3, start: 9, duration: 1, title: "CI121", code: "CR325", teacher: "AJS", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "HS111", code: "TS20", teacher: "MDU", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "HS111", code: "FF4", teacher: "RSC", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "MA211", code: "FF1", teacher: "MPA", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "CS121", code: "CL15", teacher: "ASA/MEE", type: "lab" },
    { day: 4, start: 10, duration: 2, title: "PH271", code: "PL3", teacher: "GPK/RKD", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "FF1", teacher: "MPA", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI121", code: "G8", teacher: "AJS", type: "lec" },
    { day: 6, start: 11, duration: 2, title: "HS111", code: "LL", teacher: "KNP", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "CI121", code: "TS6", teacher: "AW", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" }
];

const scheduleA4 = [
    { day: 1, start: 9, duration: 1, title: "CI121", code: "TS10", teacher: "APR", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF2", teacher: "RKD", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF1", teacher: "MPA", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "FF1", teacher: "RSC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "FF1", teacher: "AJS", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "CI121", code: "CR325", teacher: "AJS", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "GE112", code: "TS17", teacher: "SNP", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "HS111", code: "FF4", teacher: "RSC", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "CS121", code: "CL02", teacher: "KRL/SUD", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "PH211", code: "TS6", teacher: "EKY", type: "tut" },
    { day: 4, start: 10, duration: 2, title: "PH271", code: "PL2", teacher: "NG/DIP", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "FF1", teacher: "MPA", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "MA211", code: "TS7", teacher: "MSD", type: "tut" },
    { day: 4, start: 16, duration: 1, title: "CI121", code: "G8", teacher: "AJS", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "MA211", code: "FF1", teacher: "MPA", type: "lec" },
    { day: 5, start: 9, duration: 2, title: "GE112", code: "EW2", teacher: "SNP", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "TS6", teacher: "PRI", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 6, start: 11, duration: 2, title: "HS111", code: "LL1", teacher: "AMI", type: "lab" }
];

// --- BATCH A5 (NO CHANGES) ---
const scheduleA5 = [
    { day: 1, start: 10, duration: 2, title: "PH271", code: "PL1", teacher: "MKC/MTR", type: "lab" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "G1", teacher: "MTR", type: "lec" },
    { day: 2, start: 9, duration: 1, title: "GE112", code: "TS13", teacher: "SWET", type: "tut" },
    { day: 2, start: 10, duration: 2, title: "GE112", code: "EW1", teacher: "SWET", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "G1", teacher: "ANK", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "PH211", code: "G1", teacher: "SND", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI121", code: "FF1", teacher: "ROH", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "HS111", code: "TS6", teacher: "PRI", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "CS5", teacher: "SND", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF3", teacher: "ANK", type: "lec" },
    { day: 3, start: 15, duration: 2, title: "CS121", code: "CL01", teacher: "TNV/IMR", type: "lab" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "G1", teacher: "ROH", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "G1", teacher: "MTR", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "HS111", code: "LL1", teacher: "KMB", type: "lab" },
    { day: 5, start: 9, duration: 1, title: "CI121", code: "TS8", teacher: "APR", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF4", teacher: "SND", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "TS7", teacher: "NS", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "PH211", code: "TS7", teacher: "RAV", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "CI121", code: "FF1", teacher: "ROH", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF1", teacher: "ANK", type: "lec" }
];

// --- BATCH A6 (NO CHANGES) ---
const scheduleA6 = [
    { day: 1, start: 10, duration: 2, title: "PH271", code: "PL2", teacher: "NG/INC", type: "lab" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "G1", teacher: "MTR", type: "lec" },
    { day: 2, start: 9, duration: 1, title: "GE112", code: "TS16", teacher: "GRP", type: "tut" },
    { day: 2, start: 10, duration: 2, title: "GE112", code: "EW2", teacher: "GRP", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "G1", teacher: "ANK", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "PH211", code: "G1", teacher: "SND", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI121", code: "FF1", teacher: "ROH", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "HS111", code: "F10", teacher: "YN", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "CS5", teacher: "SND", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF3", teacher: "ANK", type: "lec" },
    { day: 3, start: 15, duration: 2, title: "CS121", code: "CL02", teacher: "MEE/PSO", type: "lab" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "G1", teacher: "ROH", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "G1", teacher: "MTR", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "HS111", code: "LL", teacher: "MM", type: "lab" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF4", teacher: "SND", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "TS8", teacher: "BCJ", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "TS8", teacher: "NS", type: "tut" },
    { day: 5, start: 15, duration: 1, title: "CI121", code: "TS6", teacher: "SHP", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "CI121", code: "FF1", teacher: "ROH", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF1", teacher: "ANK", type: "lec" }
];

const scheduleA7 = [
    { day: 1, start: 10, duration: 2, title: "CS121", code: "CL01", teacher: "SHP,APR", type: "lab" },
    { day: 1, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "DIP", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF1", teacher: "PRV", type: "lec" },

    { day: 2, start: 13, duration: 1, title: "PH211", code: "CR325", teacher: "DIP", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "CR526", teacher: "HZR", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI121", code: "TS6", teacher: "AM", type: "tut" },
    { day: 2, start: 16, duration: 1, title: "CI121", code: "G1", teacher: "PRV", type: "lec" },

    { day: 3, start: 11, duration: 1, title: "HS111", code: "TS12", teacher: "MB", type: "tut" },

    { day: 4, start: 9, duration: 1, title: "CI121", code: "FF1", teacher: "PRV", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "MA211", code: "TS7", teacher: "HZR", type: "tut" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "G8", teacher: "HZR", type: "lec" },

    { day: 5, start: 9, duration: 2, title: "HS111", code: "LL", teacher: "VSE", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "DIP", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "GE112", code: "TS10", teacher: "BCJ", type: "tut" },
    { day: 5, start: 15, duration: 2, title: "PH271", code: "PL3", teacher: "RKD,INC", type: "lab" },

    { day: 6, start: 9, duration: 2, title: "GE112", code: "EW1", teacher: "ASG,GRP", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "GE112", code: "TS6", teacher: "AM", type: "tut" },
    { day: 6, start: 12, duration: 1, title: "MA211", code: "G1", teacher: "HZR", type: "lec" },
];

const scheduleA8 = [
    { day: 1, start: 10, duration: 1, title: "PH211", code: "TS6", teacher: "DIP", type: "tut" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "TS6", teacher: "HZR", type: "tut" },
    { day: 1, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "DIP", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF1", teacher: "PRV", type: "lec" },

    { day: 2, start: 13, duration: 1, title: "PH211", code: "CR325", teacher: "DIP", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "CR526", teacher: "HZR", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI121", code: "TS7", teacher: "SHP", type: "tut" },
    { day: 2, start: 16, duration: 1, title: "CI121", code: "G1", teacher: "PRV", type: "lec" },

    { day: 4, start: 9, duration: 1, title: "CI121", code: "FF1", teacher: "PRV", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "FF1", teacher: "ANU", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "G8", teacher: "HZR", type: "lec" },
    { day: 4, start: 15, duration: 2, title: "CS121", code: "CL01", teacher: "MGR,RTK", type: "lab" },

    { day: 5, start: 9, duration: 2, title: "HS111", code: "LL1", teacher: "MDU", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "DIP", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "HS111", code: "TS12", teacher: "AMN", type: "tut" },
    { day: 5, start: 15, duration: 2, title: "PH271", code: "PL1", teacher: "GPK/SND", type: "lab" },

    { day: 6, start: 9, duration: 2, title: "GE112", code: "EW2", teacher: "MJH", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "GE112", code: "TS7", teacher: "MJH", type: "tut" },
    { day: 6, start: 12, duration: 1, title: "MA211", code: "G1", teacher: "HZR", type: "lec" },
];


const scheduleA10 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "FF4", teacher: "ASY", type: "lec" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "CS5", teacher: "SHIV", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "CS5", teacher: "ANK", type: "lec" },
    { day: 1, start: 15, duration: 2, title: "CS121", code: "CL23", teacher: "APJ/MEE", type: "lab" },
    { day: 2, start: 10, duration: 1, title: "CI121", code: "TS11", teacher: "ASA", type: "tut" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "CS5", teacher: "SHP", type: "lec" },
    { day: 2, start: 15, duration: 2, title: "PH271", code: "PL1", teacher: "SDC/SHIV", type: "lab" },
    { day: 2, start: 14, duration: 1, title: "HS111", code: "TS11", teacher: "IJ", type: "tut" },
    { day: 4, start: 15, duration: 1, title: "PH211", code: "TS8", teacher: "MTR", type: "tut" },
    { day: 4, start: 9, duration: 1, title: "CI121", code: "G8", teacher: "SHP", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "FF4", teacher: "ASY", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "CS5", teacher: "SHIV", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "CS5", teacher: "ANK", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "GE112", code: "TS7", teacher: "NBH", type: "tut" },
    { day: 5, start: 11, duration: 2, title: "GE112", code: "EW2", teacher: "NBH", type: "lab" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "FF1", teacher: "ANK", type: "lec" },
    { day: 5, start: 15, duration: 2, title: "HS111", code: "LL", teacher: "MRB", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "CI121", code: "CS5", teacher: "SHP", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "FF2", teacher: "SHIV", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "MA211", code: "TS6", teacher: "RSC", type: "tut" }
];

const scheduleA15 = [
    { day: 1, start: 14, duration: 1, title: "PH211", code: "FF4", teacher: "INC", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF4", teacher: "MAY", type: "lec" },    
    { day: 2, start: 13, duration: 1, title: "MA211", code: "CS5", teacher: "DGA", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "CS5", teacher: "MAY", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "HS111", code: "CR425", teacher: "SHS", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "FF2", teacher: "INC", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF2", teacher: "DGA", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "CI121", code: "G9", teacher: "NIY", type: "lec" }, 
    { day: 5, start: 11, duration: 1, title: "PH211", code: "CS5", teacher: "INC", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "FF1", teacher: "SHS", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "G1", teacher: "DGA", type: "lec" },
    
    { day: 1, start: 9, duration: 1, title: "GE112", code: "TS11", teacher: "ASG", type: "tut" },
    { day: 1, start: 10, duration: 2, title: "GE112", code: "EW1", teacher: "ASG", type: "lab" },
   
    { day: 2, start: 10, duration: 2, title: "PH271", code: "PL3", teacher: "NG/ABH", type: "lab" },
   
    { day: 3, start: 10, duration: 2, title: "HS111", code: "LL", teacher: "VSE", type: "lab" },
   
    { day: 3, start: 15, duration: 1, title: "PH211", code: "TS7", teacher: "SND", type: "tut" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "TS10", teacher: "PAC", type: "tut" },
   
    { day: 5, start: 13, duration: 2, title: "CS121", code: "CL01", teacher: "AW/SRG", type: "lab" },
   
    { day: 6, start: 9, duration: 1, title: "MA211", code: "TS7", teacher: "DGA", type: "tut" },
   
    { day: 5, start: 16, duration: 1, title: "CI121", code: "TS6", teacher: "NSA", type: "tut" },
];

const scheduleA16 = [
    { day: 1, start: 9, duration: 1, title: "GE112", code: "F10", teacher: "NBH", type: "tut" },
    { day: 1, start: 10, duration: 2, title: "GE112", code: "EW2", teacher: "NBH", type: "lab" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "TS7", teacher: "AMN", type: "tut" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "FF4", teacher: "INC", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF4", teacher: "MAY", type: "lec" },    
    { day: 2, start: 13, duration: 1, title: "MA211", code: "CS5", teacher: "DGA", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "CS5", teacher: "MAY", type: "lec" },
    { day: 2, start: 15, duration: 2, title: "PH271", code: "PL2", teacher: "RKG/GPK", type: "lab" },
    { day: 3, start: 9, duration: 1, title: "HS111", code: "CR425", teacher: "SHS", type: "lec" },
    { day: 3, start: 10, duration: 2, title: "HS111", code: "LL1", teacher: "EKS", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "FF2", teacher: "INC", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF2", teacher: "DGA", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "PH211", code: "TS8", teacher: "EKY", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "CI121", code: "G9", teacher: "NIY", type: "lec" }, 
    { day: 5, start: 11, duration: 1, title: "PH211", code: "CS5", teacher: "INC", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "FF1", teacher: "SHS", type: "lec" },
    { day: 5, start: 13, duration: 2, title: "CS121", code: "CL05", teacher: "ASA/PRV", type: "lab" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "TS7", teacher: "SUD", type: "tut" },
    
    { day: 6, start: 9, duration: 1, title: "MA211", code: "TS8", teacher: "YG", type: "tut" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "G1", teacher: "DGA", type: "lec" }
];

const scheduleA17 = [
    { day: 2, start: 13, duration: 1, title: "CI121", code: "FF9", teacher: "SHR", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "PH211", code: "CS2", teacher: "GPK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "MA211", code: "CS5", teacher: "RSA", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "HS111", code: "CR501", teacher: "VRT", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "G7", teacher: "GPK", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "G7", teacher: "RSA", type: "lec" },
    { day: 4, start: 9, duration: 1, title: "MA211", code: "G9", teacher: "RSA", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "CS3", teacher: "GPK", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "FF2", teacher: "VRT", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "FF1", teacher: "SHR", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "CI121", code: "FF1", teacher: "SHR", type: "lec" },
    
    { day: 2, start: 10, duration: 2, title: "CS121", code: "CL09", teacher: "APR/AM", type: "lab" },
    { day: 3, start: 11, duration: 1, title: "CI121", code: "TS16", teacher: "KP", type: "tut" },
    { day: 3, start: 15, duration: 2, title: "PH271", code: "PL3", teacher: "AP/SHIV", type: "lab" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "TS6", teacher: "INC", type: "tut" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "TS7", teacher: "HA", type: "tut" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "TS10", teacher: "PRI", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "GE112", code: "TS8", teacher: "SWET", type: "tut" },
    
    { day: 5, start: 13, duration: 2, title: "GE112", code: "EW2", teacher: "SWET", type: "lab" },
    
    { day: 6, start: 9, duration: 2, title: "HS111", code: "LL", teacher: "SKU", type: "lab" },
];

const scheduleA18 = [
    { day: 2, start: 10, duration: 2, title: "CS121", code: "CL08", teacher: "TNV/SHB", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "CI121", code: "FF9", teacher: "SHR", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "PH211", code: "CS2", teacher: "GPK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "MA211", code: "CS5", teacher: "RSA", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "HS111", code: "CR501", teacher: "VRT", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "CI121", code: "TS13", teacher: "SRG", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "G7", teacher: "GPK", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "G7", teacher: "RSA", type: "lec" },
    { day: 3, start: 15, duration: 2, title: "PH271", code: "PL1", teacher: "RKG/PC", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "MA211", code: "G9", teacher: "RSA", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "MA211", code: "TS6", teacher: "MSD", type: "tut" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "TS7", teacher: "RKG", type: "tut" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "TS11", teacher: "NES", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "GE112", code: "TS10", teacher: "ASG", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "CS3", teacher: "GPK", type: "lec" },
    { day: 5, start: 13, duration: 2, title: "GE112", code: "EW1", teacher: "ASG", type: "lab" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "FF2", teacher: "VRT", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "FF1", teacher: "SHR", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "CI121", code: "FF1", teacher: "SHR", type: "lec" },
    { day: 6, start: 9, duration: 2, title: "HS111", code: "LL1", teacher: "ASU", type: "lab" }
];

const scheduleB1 = [
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF2", teacher: "RKG", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF2", teacher: "YG", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "CS121", code: "CL04", teacher: "AJS/IMR", type: "lab" },
    { day: 2, start: 15, duration: 2, title: "HS111", code: "LL", teacher: "SKU", type: "lab" },
    { day: 2, start: 9, duration: 1, title: "CI121", code: "TS8", teacher: "NIY", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "FF2", teacher: "PRV", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "FF2", teacher: "APJ", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "TS6", teacher: "SPP", type: "tut" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "TS8", teacher: "YG", type: "tut" },
    { day: 3, start: 10, duration: 1, title: "PH211", code: "G8", teacher: "RKG", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "HS111", code: "FF1", teacher: "PRV", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "PH271", code: "PL3", teacher: "MTR/SDC", type: "lab" },    
    { day: 3, start: 15, duration: 1, title: "CI121", code: "FF1", teacher: "APJ", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "GE112", code: "TS8", teacher: "NTS", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "G9", teacher: "RKG", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "G9", teacher: "YG", type: "lec" },
    { day: 5, start: 9, duration: 2, title: "GE112", code: "EW1", teacher: "NTS", type: "lab" },
    { day: 5, start: 11, duration: 1, title: "HS111", code: "TS10", teacher: "KSA", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "CI121", code: "FF3", teacher: "APJ", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "MA211", code: "FF3", teacher: "YG", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "G1", teacher: "MAY", type: "lec" }
];
const scheduleB2 = [
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF2", teacher: "RKG", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF2", teacher: "YG", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "CS121", code: "CL05", teacher: "ROH/SOS", type: "lab" },
    { day: 1, start: 15, duration: 2, title: "GE112", code: "EW1", teacher: "CDN", type: "lab" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "FF2", teacher: "PRV", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "FF2", teacher: "APJ", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "TS7", teacher: "EKY", type: "tut" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "TS10", teacher: "MSD", type: "tut" },
    { day: 2, start: 15, duration: 2, title: "HS111", code: "LL1", teacher: "ASU", type: "lab" },
    { day: 3, start: 10, duration: 1, title: "PH211", code: "G8", teacher: "RKG", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "HS111", code: "FF1", teacher: "PRV", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "PH271", code: "PL2", teacher: "NKS/VRT", type: "lab" },
    { day: 3, start: 15, duration: 1, title: "CI121", code: "FF1", teacher: "APJ", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "CI121", code: "TS6", teacher: "AM", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "G9", teacher: "RKG", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "G9", teacher: "YG", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "CI121", code: "FF3", teacher: "APJ", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "MA211", code: "FF3", teacher: "YG", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "GE112", code: "TS8", teacher: "CDN", type: "tut" },
    { day: 6, start: 12, duration: 1, title: "HS111", code: "TS8", teacher: "KSA", type: "tut" }
];

const scheduleB3 = [
    { day: 1, start: 9, duration: 1, title: "CI121", code: "CR325", teacher: "ANP", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "CR501", teacher: "LK", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "HS111", code: "LL", teacher: "MDU", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "TS8", teacher: "HA", type: "tut" },
    { day: 1, start: 16, duration: 1, title: "PH211", code: "G1", teacher: "SPP", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "FF3", teacher: "ANP", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "CS121", code: "CL01", teacher: "SMS/PRV", type: "lab" },
    { day: 3, start: 9, duration: 1, title: "CI121", code: "TS8", teacher: "AW", type: "tut" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "G1", teacher: "LK", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "CI121", code: "FF7", teacher: "ANP", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "TS6", teacher: "ANU", type: "tut" },
    { day: 3, start: 16, duration: 1, title: "PH211", code: "G1", teacher: "SPP", type: "lec" },
    { day: 4, start: 9, duration: 1, title: "GE112", code: "TS7", teacher: "ADM", type: "tut" },
    { day: 4, start: 10, duration: 2, title: "GE112", code: "EW1", teacher: "ADM", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "HS111", code: "TS6", teacher: "MEE", type: "tut" },
    { day: 4, start: 15, duration: 2, title: "PH271", code: "PL3", teacher: "SPP/SND", type: "lab" },
    { day: 4, start: 14, duration: 1, title: "HS111", code: "G8", teacher: "PU", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "FF2", teacher: "LK", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "HS111", code: "FF2", teacher: "PU", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "PH211", code: "FF2", teacher: "SPP", type: "lec" }
];

const scheduleB4 = [
    { day: 1, start: 9, duration: 1, title: "CI121", code: "CR325", teacher: "ANP", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "CR501", teacher: "LK", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "HS111", code: "LL1", teacher: "PAC", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "TS10", teacher: "MSD", type: "tut" },
    { day: 1, start: 16, duration: 1, title: "PH211", code: "G1", teacher: "SPP", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "FF3", teacher: "ANP", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "CS121", code: "CL05", teacher: "PSO/ROH", type: "lab" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "G1", teacher: "LK", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "CI121", code: "FF7", teacher: "ANP", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "TS7", teacher: "RAV", type: "tut" },
    { day: 3, start: 15, duration: 1, title: "CI121", code: "TS6", teacher: "ROH", type: "tut" },
    { day: 3, start: 16, duration: 1, title: "PH211", code: "G1", teacher: "SPP", type: "lec" },
    { day: 4, start: 9, duration: 1, title: "GE112", code: "TS8", teacher: "CDN", type: "tut" },
    { day: 4, start: 10, duration: 2, title: "GE112", code: "EW2", teacher: "CDN", type: "lab" },
    { day: 4, start: 14, duration: 1, title: "HS111", code: "G8", teacher: "PU", type: "lec" },
    { day: 4, start: 15, duration: 2, title: "PH271", code: "PL1", teacher: "VRT/RKG", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "FF2", teacher: "LK", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "HS111", code: "TS7", teacher: "MEE", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "HS111", code: "FF2", teacher: "PU", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "PH211", code: "FF2", teacher: "SPP", type: "lec" }
];

const scheduleB5 = [
    { day: 1, start: 14, duration: 1, title: "HS111", code: "FF2", teacher: "IC", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF2", teacher: "AW", type: "lec" },
    { day: 2, start: 9, duration: 1, title: "CI121", code: "TS10", teacher: "APJ", type: "tut" },
    { day: 2, start: 10, duration: 2, title: "PH271", code: "PL1", teacher: "NAR/DAM", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF1", teacher: "RSA", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF1", teacher: "AW", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "TS8", teacher: "RSA", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "TS8", teacher: "GPK", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "FF3", teacher: "RSA", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 3, start: 15, duration: 2, title: "HS111", code: "LL", teacher: "PAC", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "GE112", code: "TS10", teacher: "SWET", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "FF2", teacher: "AW", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "FF2", teacher: "IC", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "GE112", code: "EW1", teacher: "SWET", type: "lab" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "TS13", teacher: "MEE", type: "tut" },
    { day: 6, start: 9, duration: 2, title: "CS121", code: "CL01", teacher: "ANP/ASA", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF3", teacher: "RSA", type: "lec" },
    ];

const scheduleB6 = [
    // Monday
    { day: 1, start: 14, duration: 1, title: "HS111", code: "FF2", teacher: "IC", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF2", teacher: "AW", type: "lec" },

    { day: 1, start: 10, duration: 2, title: "PH271", code: "PL3", teacher: "EKY/NKS", type: "lab" },
    
    // Tuesday
    { day: 2, start: 11, duration: 1, title: "HS111", code: "TS11", teacher: "MEE", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF1", teacher: "RSA", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF1", teacher: "AW", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },

    // Wednesday
    { day: 3, start: 10, duration: 1, title: "PH211", code: "TS10", teacher: "MTR", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "MA211", code: "TS10", teacher: "RSA", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "FF3", teacher: "RSA", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },
    { day: 3, start: 15, duration: 2, title: "HS111", code: "LL1", teacher: "KNP", type: "lab" },
    // Thursday
    { day: 4, start: 9, duration: 1, title: "GE112", code: "TS11", teacher: "NTS", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "FF2", teacher: "AW", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "FF2", teacher: "IC", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "GE112", code: "EW2", teacher: "NTS", type: "lab" },

    // Friday
    { day: 5, start: 9, duration: 1, title: "CI121", code: "TS16", teacher: "NSA", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "G1", teacher: "RKD", type: "lec" },

    // Saturday
    { day: 6, start: 9, duration: 2, title: "CS121", code: "CL05", teacher: "MAY/SHR", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF3", teacher: "RSA", type: "lec" }
];

const scheduleB7 = [
    { day: 1, start: 10, duration: 2, title: "HS111", code: "LL", teacher: "HK", type: "lab" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "FF3", teacher: "SOC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "TS12", teacher: "SHIV", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF8", teacher: "MKB", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "TS6", teacher: "IMR", type: "tut" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "FF4", teacher: "DAM", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "CI121", code: "CR401", teacher: "SHP", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "MA211", code: "TS6", teacher: "RSH", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "FF4", teacher: "DAM", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF4", teacher: "MKB", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "HS111", code: "TS10", teacher: "NES", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "HS111", code: "FF3", teacher: "SOC", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "CI121", code: "FF3", teacher: "SHP", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "PH211", code: "CR425", teacher: "DAM", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "FF1", teacher: "MKB", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "CI121", code: "CS4", teacher: "SHP", type: "lec" },
    { day: 5, start: 13, duration: 2, title: "PH271", code: "PL2", teacher: "NAR/ABH", type: "lab" },
    { day: 5, start: 15, duration: 2, title: "CS121", code: "CL01", teacher: "APR/PRV", type: "lab" },
    { day: 6, start: 10, duration: 1, title: "GE112", code: "TS6", teacher: "GGL", type: "tut" },
    { day: 6, start: 11, duration: 2, title: "GE112", code: "EW1", teacher: "GGL", type: "lab" }
];
const scheduleB8 = [
    { day: 1, start: 10, duration: 2, title: "HS111", code: "LL1", teacher: "KNP", type: "lab" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "FF3", teacher: "SOC", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "PH211", code: "TS8", teacher: "ANU", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF8", teacher: "MKB", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "TS7", teacher: "SUD", type: "tut" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "FF4", teacher: "DAM", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "CI121", code: "CR401", teacher: "SHP", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "MA211", code: "TS7", teacher: "NSK", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "FF4", teacher: "DAM", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF4", teacher: "MKB", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "HS111", code: "TS11", teacher: "YN", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "HS111", code: "FF3", teacher: "SOC", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "CI121", code: "FF3", teacher: "SHP", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "PH211", code: "CR425", teacher: "DAM", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "FF1", teacher: "MKB", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "CI121", code: "CS4", teacher: "SHP", type: "lec" },
    { day: 5, start: 13, duration: 2, title: "PH271", code: "PL3", teacher: "ANU/DIN", type: "lab" },
    { day: 5, start: 15, duration: 2, title: "CS121", code: "CL07", teacher: "SHB/AJS", type: "lab" },
    { day: 6, start: 10, duration: 1, title: "GE112", code: "TS7", teacher: "ADM", type: "tut" },
    { day: 6, start: 11, duration: 2, title: "GE112", code: "EW2", teacher: "ADM", type: "lab" }
];

const scheduleB9 = [
    { day: 1, start: 10, duration: 1, title: "MA211", code: "TS7", teacher: "RSC", type: "tut" },
    { day: 1, start: 11, duration: 1, title: "PH211", code: "TS7", teacher: "VRT", type: "tut" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF3", teacher: "ASA", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "PH211", code: "FF3", teacher: "MKC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "GE112", code: "TS7", teacher: "ASG", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF2", teacher: "RSC", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF2", teacher: "ASA", type: "lec" },
    { day: 2, start: 15, duration: 2, title: "GE112", code: "EW2", teacher: "ASG", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "MKC", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF1", teacher: "RSC", type: "lec" },
    { day: 3, start: 10, duration: 2, title: "CS121", code: "CL13", teacher: "AM/SHB", type: "lab" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "FF4", teacher: "ASA", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "PH271", code: "PL2", teacher: "RAV/EKY", type: "lab" },
    { day: 4, start: 16, duration: 1, title: "CI121", code: "TS7", teacher: "AM", type: "tut" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "TS11", teacher: "PRI", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "HS111", code: "FF2", teacher: "RAV", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF2", teacher: "MKC", type: "lec" },
    { day: 5, start: 13, duration: 2, title: "HS111", code: "LL", teacher: "NIS", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "HS111", code: "G1", teacher: "RAV", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF4", teacher: "RSC", type: "lec" }
    
];

const scheduleB10 = [
    { day: 1, start: 11, duration: 1, title: "HS111", code: "TS11", teacher: "SDA", type: "tut" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "FF3", teacher: "ASA", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "PH211", code: "FF3", teacher: "MKC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "TS8", teacher: "VRT", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF2", teacher: "RSC", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF2", teacher: "ASA", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "MA211", code: "TS8", teacher: "RSC", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "FF1", teacher: "MKC", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "FF1", teacher: "RSC", type: "lec" },
    { day: 3, start: 10, duration: 2, title: "CS121", code: "CL07", teacher: "AW/TNV", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "GE112", code: "TS20", teacher: "MJH", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "FF4", teacher: "ASA", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "PH271", code: "PL1", teacher: "BCJ/MKC", type: "lab" },
    { day: 4, start: 15, duration: 2, title: "GE112", code: "EW2", teacher: "MJH", type: "lab" },
    { day: 5, start: 9, duration: 1, title: "CI121", code: "TS12", teacher: "APJ", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "HS111", code: "FF2", teacher: "RAV", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF2", teacher: "MKC", type: "lec" },
    { day: 5, start: 13, duration: 2, title: "HS111", code: "LL1", teacher: "NAM", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "HS111", code: "G1", teacher: "RAV", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF4", teacher: "RSC", type: "lec" }
];

const scheduleB11 = [
    { day: 1, start: 10, duration: 1, title: "MA211", code: "TS8", teacher: "HPT", type: "tut" },
    { day: 1, start: 11, duration: 1, title: "PH211", code: "TS8", teacher: "NAR", type: "tut" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "G1", teacher: "AM", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "HS111", code: "TS10", teacher: "SDA", type: "tut" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "TS10", teacher: "ASA", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF3", teacher: "HPT", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF3", teacher: "AM", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "FF2", teacher: "NG", type: "lec" },
    { day: 3, start: 10, duration: 2, title: "PH271", code: "PL1", teacher: "RAV/BCJ", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "G1", teacher: "NG", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "CS5", teacher: "HPT", type: "lec" },
    { day: 3, start: 15, duration: 2, title: "GE112", code: "EW1", teacher: "NBH", type: "lab" },
    { day: 3, start: 9, duration: 1, title: "GE112", code: "TS10", teacher: "NBH", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "CS5", teacher: "AM", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "CS121", code: "CL01", teacher: "AM/PAR", type: "lab" },
    { day: 4, start: 15, duration: 2, title: "HS111", code: "LL", teacher: "HK", type: "lab" },
    { day: 5, start: 10, duration: 1, title: "HS111", code: "FF3", teacher: "APR", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF3", teacher: "NG", type: "lec" },
    { day: 6, start: 9, duration: 1, title: "HS111", code: "FF1", teacher: "APR", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF2", teacher: "HPT", type: "lec" }
];

// --- BATCH B12 (NO CHANGES - from original)
const scheduleB12 = [
    { day: 1, start: 10, duration: 1, title: "HS111", code: "TS10", teacher: "IJ", type: "tut" },
    { day: 1, start: 11, duration: 1, title: "PH211", code: "TS10", teacher: "RKD", type: "tut" },
    { day: 1, start: 13, duration: 1, title: "MA211", code: "TS6", teacher: "HPT", type: "tut" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "G1", teacher: "AM", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "TS6", teacher: "KP", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF3", teacher: "HPT", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF3", teacher: "AM", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "FF2", teacher: "NG", type: "lec" },
    { day: 3, start: 10, duration: 2, title: "PH271", code: "PL2", teacher: "NAR/ANU", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "G1", teacher: "NG", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "CS5", teacher: "HPT", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "CI121", code: "CS5", teacher: "AM", type: "lec" },
    { day: 4, start: 13, duration: 2, title: "CS121", code: "CL07", teacher: "ANP/ASA", type: "lab" },
    { day: 4, start: 15, duration: 2, title: "HS111", code: "LL1", teacher: "MDU", type: "lab" },
    { day: 5, start: 10, duration: 1, title: "HS111", code: "FF3", teacher: "APR", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "FF3", teacher: "NG", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "GE112", code: "TS11", teacher: "MJH", type: "tut" },
    { day: 5, start: 15, duration: 2, title: "GE112", code: "EW2", teacher: "MJH", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "HS111", code: "FF1", teacher: "APR", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "FF2", teacher: "HPT", type: "lec" }
];

const scheduleB14 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "FF4", teacher: "ASY", type: "lec" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "CS5", teacher: "SHIV", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "CS5", teacher: "ANK", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "HS111", code: "TS6", teacher: "MB", type: "tut" },
    { day: 1, start: 15, duration: 2, title: "CS121", code: "CL05", teacher: "KP/SUD", type: "lab" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "CS5", teacher: "SHP", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "PH271", code: "PL2", teacher: "MKC/ANU", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "TS7", teacher: "SPP", type: "tut" },
    { day: 3, start: 14, duration: 1, title: "CI121", code: "TS10", teacher: "AM", type: "tut" },
    { day: 4, start: 9, duration: 1, title: "CI121", code: "G8", teacher: "SHP", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "FF4", teacher: "ASY", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "CS5", teacher: "SHIV", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "CS5", teacher: "ANK", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "GE112", code: "TS11", teacher: "CDN", type: "tut" },
    { day: 5, start: 11, duration: 2, title: "GE112", code: "EW1", teacher: "CDN", type: "lab" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "FF1", teacher: "ANK", type: "lec" },
    { day: 5, start: 15, duration: 2, title: "HS111", code: "LL1", teacher: "YN", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "CI121", code: "CS5", teacher: "SHP", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "FF2", teacher: "SHIV", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "MA211", code: "TS7", teacher: "ANK", type: "tut" }
    
];

// --- GROUP C ---
const scheduleC1 = [
    { day: 1, start: 11, duration: 1, title: "MA212", code: "CR425", teacher: "AN", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "GE112", code: "EW1", teacher: "NTS", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "HS111", code: "TS6", teacher: "SMO", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "B11CI121", code: "TS11", teacher: "ALK", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "PH212", code: "FF4", teacher: "SDC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "B11CI121", code: "FF4", teacher: "ALK", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "GE112", code: "TS11", teacher: "NTS", type: "tut" }, 
    { day: 3, start: 15, duration: 1, title: "B11CI121", code: "FF3", teacher: "ALK", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF3", teacher: "VGU", type: "lec" },
    { day: 4, start: 9, duration: 2, title: "B15CI121", code: "CL05", teacher: "NIY/ALK", type: "lab" },
    { day: 4, start: 11, duration: 1, title: "MA212", code: "TS10", teacher: "AN", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH212", code: "FF2", teacher: "SDC", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "G1", teacher: "VGU", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "B11CI121", code: "CR325", teacher: "ALK", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "MA212", code: "G6", teacher: "AN", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "PH212", code: "TS13", teacher: "DAM", type: "tut" },
    { day: 5, start: 11, duration: 2, title: "HS111", code: "LL", teacher: "NES", type: "lab" },
    { day: 5, start: 14, duration: 2, title: "15BT111", code: "BT1", teacher: "PG/EKT/SHD/ANM/SBT", type: "lab" },
    { day: 6, start: 10, duration: 1, title: "PH212", code: "CR325", teacher: "SDC", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA212", code: "CR325", teacher: "AN", type: "lec" }
];

const scheduleC2 = [
    { day: 1, start: 11, duration: 1, title: "MA212", code: "CR425", teacher: "AN", type: "lec" },
    { day: 1, start: 13, duration: 2, title: "GE112", code: "EW2", teacher: "SWET", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "GE112", code: "TS11", teacher: "SWET", type: "tut" },
    { day: 1, start: 16, duration: 1, title: "HS111", code: "TS6", teacher: "SMO", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "PH212", code: "FF4", teacher: "SDC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "B11CI121", code: "FF4", teacher: "ALK", type: "lec" },
    { day: 2, start: 15, duration: 2, title: "B15CI121", code: "CL13", teacher: "ALK/PK", type: "lab" }, 
    { day: 3, start: 14, duration: 1, title: "PH212", code: "TS8", teacher: "DAM", type: "tut" },
    { day: 3, start: 15, duration: 1, title: "B11CI121", code: "FF3", teacher: "ALK", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF3", teacher: "VGU", type: "lec" },
    { day: 4, start: 10, duration: 2, title: "HS111", code: "LL", teacher: "HK", type: "lab" },
    
    { day: 4, start: 13, duration: 1, title: "PH212", code: "FF2", teacher: "SDC", type: "lec" },
    { day: 4, start: 14, duration: 2, title: "15BT111", code: "BT1", teacher: "PG/EKT/SHD/ANM/SBT", type: "lab" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "G1", teacher: "VGU", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "B11CI121", code: "CR325", teacher: "ALK", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "MA212", code: "G6", teacher: "AN", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "B11CI121", code: "TS16", teacher: "ALK", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "MA212", code: "TS8", teacher: "ANK", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "PH212", code: "CR325", teacher: "SDC", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA212", code: "CR325", teacher: "AN", type: "lec" }
];

const scheduleC3 = [
    { day: 1, start: 11, duration: 1, title: "MA212", code: "CR425", teacher: "AN", type: "lec" },
    { day: 1, start: 15, duration: 2, title: "GE112", code: "EW2", teacher: "GGL", type: "lab" },
    { day: 1, start: 9, duration: 1, title: "B11CI121", code: "F4", teacher: "ALK", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "PH212", code: "FF4", teacher: "SDC", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "B11CI121", code: "FF4", teacher: "ALK", type: "lec" },
    { day: 3, start: 10, duration: 2, title: "15BT111", code: "BT1", teacher: "PG/EKT/SHD/ANM/SBT", type: "lab" },
    { day: 3, start: 15, duration: 1, title: "B11CI121", code: "FF3", teacher: "ALK", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF3", teacher: "VGU", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "B15CI121", code: "CL17", teacher: "PK/PRK", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "HS111", code: "TS12", teacher: "IJ", type: "tut" },
    { day: 4, start: 10, duration: 2, title: "HS111", code: "LL1", teacher: "NAM", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "PH212", code: "FF2", teacher: "SDC", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "PH212", code: "TS12", teacher: "DAM", type: "tut" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "G1", teacher: "VGU", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "B11CI121", code: "CR325", teacher: "ALK", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "MA212", code: "G6", teacher: "AN", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "GE112", code: "TS12", teacher: "GGL", type: "tut" },     
    { day: 5, start: 14, duration: 1, title: "MA212", code: "TS11", teacher: "RSA", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "PH212", code: "CR325", teacher: "SDC", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA212", code: "CR325", teacher: "AN", type: "lec" }
];

// --- GROUP D ---
const scheduleD1 = [
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF4", teacher: "DIN", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF4", teacher: "SGL", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "CS5", teacher: "BCJ", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "CI121", code: "TS10", teacher: "ANP", type: "tut" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "TS6", teacher: "SGL", type: "tut" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "G6", teacher: "SRG", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "HS111", code: "LL", teacher: "KMB", type: "lab" },
    { day: 2, start: 15, duration: 2, title: "CS121", code: "CL01", teacher: "KP/SHB", type: "lab" },
    { day: 3, start: 10, duration: 1, title: "GE112", code: "TS6", teacher: "NTS", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "FF2", teacher: "DIN", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "GE112", code: "EW1", teacher: "NTS", type: "lab" },
    { day: 3, start: 15, duration: 1, title: "CI121", code: "FF4", teacher: "SRG", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "PH211", code: "TS8", teacher: "ABH", type: "tut" },
    { day: 4, start: 11, duration: 1, title: "HS111", code: "TS11", teacher: "EKT", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "FF4", teacher: "DIN", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "FF4", teacher: "SGL", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "CS5", teacher: "BCJ", type: "lec" },
    { day: 5, start: 10, duration: 2, title: "PH271", code: "PL1", teacher: "MTR/NKS", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "FF3", teacher: "SGL", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "FF3", teacher: "SRG", type: "lec" }
];

const scheduleD2 = [
    { day: 1, start: 9, duration: 1, title: "CI121", code: "TR302", teacher: "ROH", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF4", teacher: "DIN", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF4", teacher: "SGL", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "CS5", teacher: "BCJ", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "TS7", teacher: "SP", type: "tut" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "G6", teacher: "SRG", type: "lec" },
    { day: 2, start: 13, duration: 2, title: "HS111", code: "LL1", teacher: "AMI", type: "lab" },
    { day: 3, start: 10, duration: 1, title: "GE112", code: "TS7", teacher: "CDN", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "FF2", teacher: "DIN", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "GE112", code: "EW2", teacher: "CDN", type: "lab" },
    { day: 3, start: 15, duration: 1, title: "CI121", code: "FF4", teacher: "SRG", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "HS111", code: "TS10", teacher: "EKT", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "FF4", teacher: "DIN", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "FF4", teacher: "SGL", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "CS5", teacher: "BCJ", type: "lec" },
    { day: 5, start: 10, duration: 2, title: "PH271", code: "PL2", teacher: "VRT/PC", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "FF3", teacher: "SGL", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "FF3", teacher: "SRG", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "TS8", teacher: "EKY", type: "tut" },
    { day: 6, start: 11, duration: 2, title: "CS121", code: "CL09", teacher: "KRL/SOS", type: "lab" }
];

// --- GROUP G ---
const scheduleG1 = [
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF3", teacher: "NAR", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF3", teacher: "PAT", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "FF2", teacher: "MKB", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "TS7", teacher: "DAM", type: "tut" },
    { day: 1, start: 15, duration: 2, title: "PH271", code: "PL2", teacher: "EKY/DIP", type: "lab" },
    { day: 2, start: 11, duration: 1, title: "CI121", code: "G7", teacher: "RTK", type: "lec" },
    
    { day: 3, start: 9, duration: 1, title: "GE112", code: "TS11", teacher: "GGL", type: "tut" },
    { day: 3, start: 10, duration: 2, title: "GE112", code: "EW1", teacher: "GGL", type: "lab" },
    { day: 3, start: 13, duration: 2, title: "HS111", code: "LL", teacher: "KMB", type: "lab" },
    { day: 3, start: 15, duration: 1, title: "CI121", code: "FF2", teacher: "RTK", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF2", teacher: "MKB", type: "lec" },

    { day: 4, start: 11, duration: 1, title: "CI121", code: "TS12", teacher: "SHR", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "FF3", teacher: "NAR", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "FF3", teacher: "PAT", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "TS13", teacher: "NSK", type: "tut" },

    { day: 5, start: 10, duration: 1, title: "PH211", code: "G1", teacher: "NAR", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "FF4", teacher: "PAT", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "FF4", teacher: "RTK", type: "lec" },

    { day: 6, start: 10, duration: 1, title: "MA211", code: "TS10", teacher: "PAT", type: "tut" },
    { day: 6, start: 11, duration: 2, title: "CS121", code: "CL01", teacher: "SRG/SMS", type: "lab" },
];

const scheduleG2 = [
    { day: 1, start: 9, duration: 1, title: "CI121", code: "F7", teacher: "NIY", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "FF3", teacher: "NAR", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "FF3", teacher: "PAT", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "FF2", teacher: "MKB", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "TS8", teacher: "NKS", type: "tut" },
    { day: 1, start: 15, duration: 2, title: "PH271", code: "PL3", teacher: "RKD/DAM", type: "lab" },

    { day: 2, start: 11, duration: 1, title: "CI121", code: "G7", teacher: "RTK", type: "lec" },
    { day: 2, start: 15, duration: 2, title: "CS121", code: "CL09", teacher: "MAY/NSA", type: "lab" },
    
    { day: 3, start: 9, duration: 1, title: "GE112", code: "TS20", teacher: "MJH", type: "tut" },
    { day: 3, start: 10, duration: 2, title: "GE112", code: "EW2", teacher: "MJH", type: "lab" },
    { day: 3, start: 13, duration: 2, title: "HS111", code: "LL1", teacher: "MDU", type: "lab" },
    { day: 3, start: 15, duration: 1, title: "CI121", code: "FF2", teacher: "RTK", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF2", teacher: "MKB", type: "lec" },

    { day: 4, start: 10, duration: 1, title: "HS111", code: "TS11", teacher: "SP", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "FF3", teacher: "NAR", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "FF3", teacher: "PAT", type: "lec" },

    { day: 5, start: 10, duration: 1, title: "PH211", code: "G1", teacher: "NAR", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "MA211", code: "TS6", teacher: "DCS", type: "tut" },
    { day: 5, start: 13, duration: 1, title: "MA211", code: "FF4", teacher: "PAT", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "CI121", code: "FF4", teacher: "RTK", type: "lec" },
];

const scheduleG3 = [
    { day: 1, start: 10, duration: 1, title: "PH211", code: "TS11", teacher: "ABH", type: "tut" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "FF3", teacher: "SGL", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "CS5", teacher: "SRG", type: "lec" },

    { day: 2, start: 10, duration: 2, title: "HS111", code: "LL", teacher: "HK", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF4", teacher: "DCS", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF4", teacher: "SRG", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "FF3", teacher: "EKY", type: "lec" },

    { day: 3, start: 13, duration: 1, title: "PH211", code: "G6", teacher: "EKY", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "G6", teacher: "DCS", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF4", teacher: "SGL", type: "lec" },
    
    { day: 4, start: 10, duration: 1, title: "CI121", code: "CR425", teacher: "SRG", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "TS8", teacher: "DCS", type: "tut" },
    { day: 4, start: 14, duration: 1, title: "HS111", code: "TS13", teacher: "SP", type: "tut" },
    { day: 4, start: 15, duration: 2, title: "CS121", code: "CL07", teacher: "KP/PSO", type: "lab" },

    { day: 5, start: 9, duration: 1, title: "CI121", code: "TS13", teacher: "NIY", type: "tut" },
    { day: 5, start: 10, duration: 1, title: "GE112", code: "TS12", teacher: "ADM", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "CR425", teacher: "EKY", type: "lec" },
    { day: 5, start: 15, duration: 2, title: "GE112", code: "EW1", teacher: "ADM", type: "lab" },

    { day: 6, start: 9, duration: 2, title: "PH271", code: "PL1", teacher: "DAM/INC", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "CS5", teacher: "DCS", type: "lec" },
];

const scheduleG4 = [
    { day: 1, start: 10, duration: 2, title: "CS121", code: "CL05", teacher: "AVR/TNV", type: "lab" },
    { day: 1, start: 13, duration: 1, title: "HS111", code: "FF3", teacher: "SGL", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "CI121", code: "CS5", teacher: "SRG", type: "lec" },

    { day: 2, start: 10, duration: 2, title: "HS111", code: "LL1", teacher: "MRB", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "FF4", teacher: "DCS", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI121", code: "FF4", teacher: "SRG", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "FF3", teacher: "EKY", type: "lec" },

    { day: 3, start: 9, duration: 1, title: "HS111", code: "TS7", teacher: "NSK", type: "tut" },
    { day: 3, start: 10, duration: 1, title: "CI121", code: "TS11", teacher: "NIY", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "MA211", code: "TS11", teacher: "DCS", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "G6", teacher: "EKY", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "G6", teacher: "DCS", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "FF4", teacher: "SGL", type: "lec" },

    { day: 4, start: 10, duration: 1, title: "CI121", code: "CR425", teacher: "SRG", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "GE112", code: "TS7", teacher: "GGL", type: "tut" },
    { day: 4, start: 15, duration: 2, title: "GE112", code: "EW1", teacher: "GGL,GRP", type: "lab" },
    
    { day: 5, start: 11, duration: 1, title: "PH211", code: "CR425", teacher: "EKY", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "PH211", code: "TS7", teacher: "RKG", type: "tut" },

    { day: 6, start: 9, duration: 2, title: "PH271", code: "PL2", teacher: "DIP", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "CS5", teacher: "DCS", type: "lec" },
];



// ==================== 128 Batches (F, H, E Series) ====================
// ==================== 128 Batches (F, H, E Series) ====================




const scheduleF1 = [
    { day: 1, start: 9, duration: 3, title: "GE112", code: "WS04", teacher: "PRJ", type: "lab" },
    { day: 2, start: 9, duration: 2, title: "PH271", code: "027A", teacher: "AK", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "121", teacher: "SHV", type: "tut" },
    { day: 2, start: 14, duration: 1, title: "CI211", code: "116", teacher: "SSJ/ZUBAIR", type: "tut" },
    { day: 4, start: 9, duration: 1, title: "PH211", code: "116", teacher: "VM", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "MA211", code: "116", teacher: "PKS", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "3092", teacher: "SHP", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3092", teacher: "VM", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "3092", teacher: "NEA", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "SHJ", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "PH211", code: "3084", teacher: "VM", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "3084", teacher: "SHP", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "CI211", code: "3084", teacher: "SHJ", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "121", teacher: "SHV", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "CI211", code: "116", teacher: "SSJ/ZUBAIR", type: "tut" },
    { day: 6, start: 9, duration: 1, title: "MA211", code: "3028", teacher: "SHP", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "3028", teacher: "VM", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "HS111", code: "3028", teacher: "NEA", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "CI211", code: "3028", teacher: "SHJ", type: "lec" }
];

const scheduleF2 = [
    { day: 2, start: 9, duration: 2, title: "PH271", code: "256C", teacher: "SKH", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "116", teacher: "DEV", type: "tut" },
    { day: 2, start: 14, duration: 1, title: "CI211", code: "126", teacher: "SSJ/AVINASH", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "PH211", code: "121", teacher: "VM", type: "tut" },
    { day: 4, start: 11, duration: 1, title: "MA211", code: "127", teacher: "AMB", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "3092", teacher: "SHP", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3092", teacher: "VM", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "3092", teacher: "NEA", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "SHJ", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "PH211", code: "3084", teacher: "VM", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "3084", teacher: "SHP", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "CI211", code: "3084", teacher: "SHJ", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "116", teacher: "DEV", type: "tut" },
    { day: 5, start: 14, duration: 2, title: "PH271", code: "41", teacher: "VM", type: "lab" },
    { day: 5, start: 14, duration: 1, title: "CI211", code: "126", teacher: "SSJ/AVINASH", type: "tut" },
    { day: 6, start: 9, duration: 1, title: "MA211", code: "3028", teacher: "SHP", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "3028", teacher: "VM", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "HS111", code: "3028", teacher: "NEA", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "CI211", code: "3028", teacher: "SHJ", type: "lec" }
];

const scheduleF3 = [
    { day: 1, start: 9, duration: 2, title: "PH271", code: "041", teacher: "SKA", type: "lab" },
    { day: 1, start: 13, duration: 3, title: "GE112", code: "WS06", teacher: "SUM", type: "lab" },
    { day: 1, start: 11, duration: 1, title: "HS111", code: "116", teacher: "SHV", type: "tut" },
    { day: 2, start: 9, duration: 2, title: "HS111", code: "240", teacher: "MEENAKSHI", type: "lab" },
    { day: 2, start: 11, duration: 1, title: "MA211", code: "126", teacher: "NEA", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "CI211", code: "121", teacher: "SAP/ZUBAIR", type: "tut" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "3092", teacher: "ASP", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "3092", teacher: "PKC", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "SAP", type: "lec" },
    { day: 4, start: 9, duration: 1, title: "MA211", code: "3023", teacher: "ASP", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "CI211", code: "3023", teacher: "SAP", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "116", teacher: "AMV", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "226", teacher: "PKC", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "3092", teacher: "NFHSS1", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "SAP", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "CI211", code: "3028", teacher: "SAP", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "3028", teacher: "ASP", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "3028", teacher: "PKC", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "3028", teacher: "NFHSS1", type: "lec" }
];

const scheduleF4 = [
    { day: 1, start: 13, duration: 3, title: "GE112", code: "WS05", teacher: "PSH", type: "lab" },
    { day: 1, start: 9, duration: 2, title: "PH271", code: "256C", teacher: "VM", type: "lab" },
    { day: 2, start: 9, duration: 2, title: "HS111", code: "246", teacher: "CHANDERSHEKHAR", type: "lab" },
    { day: 2, start: 11, duration: 1, title: "HS111", code: "3092", teacher: "NIC", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "CI211", code: "127", teacher: "SAP/AVINASH", type: "tut" },
    { day: 3, start: 9, duration: 3, title: "CI271", code: "CL1", teacher: "SAP/SGU/ARJ/BAIBHAV", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "3092", teacher: "ASP", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "3092", teacher: "PKC", type: "lec" },
    { day: 3, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "SAP", type: "lec" },
    { day: 4, start: 9, duration: 1, title: "MA211", code: "3023", teacher: "ASP", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "CI211", code: "3023", teacher: "SAP", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "126", teacher: "KAS", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "226", teacher: "PKC", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "HS111", code: "3092", teacher: "NFHSS1", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "SAP", type: "lec" },
    { day: 5, start: 9, duration: 1, title: "CI211", code: "3028", teacher: "SAP", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "3028", teacher: "ASP", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "PH211", code: "3028", teacher: "PKC", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "3028", teacher: "NFHSS1", type: "lec" }
];

const scheduleF5 = [
    { day: 1, start: 9, duration: 2, title: "HS111", code: "240", teacher: "EKS1", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "HS111", code: "217", teacher: "ADV", type: "lec" },
    { day: 1, start: 16, duration: 1, title: "CI211", code: "217", teacher: "ADS", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "MA211", code: "217", teacher: "UMK", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "217", teacher: "PKC", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "CI211", code: "3084", teacher: "ADS", type: "lec" },
    { day: 2, start: 9, duration: 3, title: "GE112", code: "WS04", teacher: "PSH", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "3084", teacher: "ADV", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "UMK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "HS111", code: "3084", teacher: "ADV", type: "lec" },
    { day: 2, start: 16, duration: 1, title: "CI211", code: "3084", teacher: "ADS/ZUBAIR", type: "tut" },
    { day: 3, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "SAP/SGU/ARJ/BAIBHAV", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "CI211", code: "3045", teacher: "ADS", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "MA211", code: "116", teacher: "AMB", type: "tut" },
    { day: 4, start: 9, duration: 1, title: "CI211", code: "3045", teacher: "ADS", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "PH211", code: "3045", teacher: "ADV", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "MA211", code: "3045", teacher: "UMK", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "121", teacher: "PKC", type: "tut" },
    { day: 4, start: 14, duration: 2, title: "PH271", code: "256C", teacher: "ANK", type: "lab" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "116", teacher: "SHV", type: "tut" }
];

const scheduleF6 = [
    { day: 1, start: 9, duration: 2, title: "HS111", code: "246", teacher: "Amba Aggarwal", type: "lab" },
    { day: 1, start: 11, duration: 1, title: "CI211", code: "3084", teacher: "ADS", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "MA211", code: "217", teacher: "UMK", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "217", teacher: "Prashant Kumar Chauhan", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "HS111", code: "217", teacher: "Anshu Dhirendra Varshney", type: "lec" },
    { day: 1, start: 16, duration: 1, title: "CI211", code: "217", teacher: "ADS", type: "lec" },
    { day: 2, start: 9, duration: 3, title: "GE112", code: "WS05", teacher: "Sumit Mahajan", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "3084", teacher: "Anshu Dhirendra Varshney", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "UMK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "HS111", code: "3084", teacher: "Anshu Dhirendra Varshney", type: "lec" },
    { day: 2, start: 16, duration: 1, title: "CI211", code: "3092", teacher: "ADS, AVINASH", type: "tut" },
    { day: 3, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "Satyaprakash Patel, SGU, Arti Jain, Baibhav", type: "lab" },
    { day: 3, start: 13, duration: 1, title: "CI211", code: "3045", teacher: "ADS", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "HS111", code: "116", teacher: "Praveen Kumar Sharma", type: "tut" },
    { day: 4, start: 9, duration: 1, title: "CI211", code: "3045", teacher: "ADS", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "PH211", code: "3045", teacher: "Anshu Dhirendra Varshney", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "MA211", code: "3045", teacher: "UMK", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "127", teacher: "AMB", type: "tut" },
    { day: 4, start: 14, duration: 2, title: "PH271", code: "027A", teacher: "Sudip Kumar Haldar", type: "lab" },
    { day: 4, start: 16, duration: 1, title: "PH211", code: "121", teacher: "Prashant Kumar Chauhan", type: "tut" }
];

const scheduleF7 = [
    { day: 1, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, Arti Jain, Jatin", type: "lab" },
    { day: 1, start: 11, duration: 1, title: "CI211", code: "217", teacher: "MKS", type: "lec" },
    { day: 2, start: 9, duration: 1, title: "CI211", code: "3084", teacher: "MKS, ZUBAIR", type: "tut" },
    { day: 2, start: 11, duration: 1, title: "MA211", code: "127", teacher: "Pankaj Kumar Srivastava", type: "tut" },
    { day: 2, start: 13, duration: 3, title: "GE112", code: "WS04", teacher: "Niraj Kumar", type: "lab" },
    { day: 3, start: 9, duration: 2, title: "PH271", code: "41", teacher: "Suneet Kumar Awasthi", type: "lab" },
    { day: 3, start: 11, duration: 1, title: "CI211", code: "228", teacher: "MKS", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "HS111", code: "3028", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "3028", teacher: "Shivani Pant", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "PH211", code: "3028", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 4, start: 9, duration: 2, title: "HS111", code: "240", teacher: "SANJAY", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "CI211", code: "3045", teacher: "MKS", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "3045", teacher: "Shivani Pant", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "PH211", code: "3045", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "116", teacher: "Nilu Chaudhary", type: "tut" },
    { day: 6, start: 9, duration: 1, title: "PH211", code: "116", teacher: "Urbashi Satpathy", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "3045", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "3045", teacher: "Shivani Pant", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "HS111", code: "3045", teacher: "Urbashi Satpathy", type: "lec" }
];

const scheduleF8 = [
    { day: 1, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, Arti Jain, Jatin", type: "lab" },
    { day: 1, start: 11, duration: 1, title: "CI211", code: "217", teacher: "MKS", type: "lec" },
    { day: 2, start: 9, duration: 1, title: "MA211", code: "116", teacher: "Pankaj Kumar Rana", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "CI211", code: "3092", teacher: "MKS, AVINASH", type: "tut" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "116", teacher: "SHALU", type: "tut" },
    { day: 2, start: 13, duration: 3, title: "GE112", code: "WS05", teacher: "Sumit Mahajan", type: "lab" },
    { day: 3, start: 9, duration: 2, title: "PH271", code: "256C", teacher: "AV", type: "lab" },
    { day: 3, start: 11, duration: 1, title: "CI211", code: "228", teacher: "MKS", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "HS111", code: "3028", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "MA211", code: "3028", teacher: "Shivani Pant", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "PH211", code: "3028", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 4, start: 9, duration: 2, title: "HS111", code: "246", teacher: "Ekta Srivastava", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "CI211", code: "3045", teacher: "MKS", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "MA211", code: "3045", teacher: "Shivani Pant", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "PH211", code: "3045", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "126", teacher: "Praveen Kumar Sharma", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "3045", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "MA211", code: "3045", teacher: "Shivani Pant", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "HS111", code: "3045", teacher: "Urbashi Satpathy", type: "lec" }
];

const scheduleF9 = [
    { day: 1, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, Arti Jain, Jatin", type: "lab" },
    { day: 1, start: 12, duration: 1, title: "MA211", code: "226", teacher: "Asim Patra", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "121", teacher: "Anuj Kumar", type: "tut" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "121", teacher: "ATH", type: "tut" },
    { day: 1, start: 16, duration: 1, title: "HS111", code: "116", teacher: "AKS", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "HS111", code: "3045", teacher: "AMS", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3045", teacher: "Asim Patra", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "3045", teacher: "Anuj Kumar", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "CI211", code: "226", teacher: "Akanksha Bhardwaj", type: "lec" },
    { day: 2, start: 14, duration: 2, title: "PH271", code: "256C", teacher: "SHALU", type: "lab" },
    { day: 2, start: 16, duration: 1, title: "CI211", code: "3023", teacher: "Akanksha Bhardwaj, KAKUL", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "CI211", code: "3092", teacher: "Akanksha Bhardwaj", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "3092", teacher: "Anuj Kumar", type: "lec" },
    { day: 4, start: 13, duration: 3, title: "GE112", code: "WS06", teacher: "Piyush Sharma", type: "lab" },
    { day: 5, start: 9, duration: 2, title: "HS111", code: "240", teacher: "CHANDERSHEKHAR", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "MA211", code: "3023", teacher: "Asim Patra", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "3023", teacher: "Anuj Kumar", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "HS111", code: "3023", teacher: "PRK", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "CI211", code: "3023", teacher: "Akanksha Bhardwaj", type: "lec" }
];

const scheduleF10 = [
    { day: 1, start: 12, duration: 1, title: "MA211", code: "226", teacher: "Asim Patra", type: "lec" },
    { day: 1, start: 14, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, SHJ, Arti Jain", type: "lab" },
    { day: 1, start: 16, duration: 1, title: "HS111", code: "121", teacher: "Praveen Kumar Sharma", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "HS111", code: "3045", teacher: "AMS", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3045", teacher: "Asim Patra", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "3045", teacher: "Anuj Kumar", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "CI211", code: "226", teacher: "Akanksha Bhardwaj", type: "lec" },
    { day: 2, start: 14, duration: 2, title: "PH271", code: "027A", teacher: "KAS", type: "lab" },
    { day: 2, start: 16, duration: 1, title: "CI211", code: "3028", teacher: "Akanksha Bhardwaj, SAMARTH", type: "tut" },
    { day: 4, start: 9, duration: 1, title: "PH211", code: "121", teacher: "Anuj Kumar", type: "tut" },
    { day: 4, start: 10, duration: 1, title: "CI211", code: "3092", teacher: "Akanksha Bhardwaj", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "3092", teacher: "Anuj Kumar", type: "lec" },
    { day: 5, start: 9, duration: 2, title: "HS111", code: "246", teacher: "HIMANSNHI", type: "lab" },
    { day: 5, start: 11, duration: 1, title: "MA211", code: "127", teacher: "Neha Ahlawat", type: "tut" },
    { day: 5, start: 13, duration: 3, title: "GE112", code: "WS04", teacher: "Harish Bishwakarma", type: "lab" },
    { day: 6, start: 9, duration: 1, title: "MA211", code: "3023", teacher: "Asim Patra", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "3023", teacher: "Anuj Kumar", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "HS111", code: "3023", teacher: "PRK", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "CI211", code: "3023", teacher: "Akanksha Bhardwaj", type: "lec" }
];

const scheduleF11 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "3023", teacher: "JRD", type: "lec" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "3023", teacher: "Sudip Kumar Haldar", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "3023", teacher: "UMK", type: "lec" },
    { day: 1, start: 14, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, SHJ, Arti Jain", type: "lab" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3084", teacher: "UMK", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "3084", teacher: "Sudip Kumar Haldar", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "3045", teacher: "JRD", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "PH211", code: "3028", teacher: "Sudip Kumar Haldar", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "CI211", code: "3028", teacher: "Arti Jain", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "MA211", code: "3028", teacher: "UMK", type: "lec" },
    { day: 3, start: 13, duration: 3, title: "GE112", code: "WS04", teacher: "Harish Bishwakarma", type: "lab" },
    { day: 3, start: 16, duration: 1, title: "CI211", code: "3023", teacher: "Arti Jain, KAKUL", type: "tut" },
    { day: 4, start: 11, duration: 1, title: "CI211", code: "3023", teacher: "Arti Jain", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "PH211", code: "126", teacher: "Sudip Kumar Haldar", type: "tut" },
    { day: 4, start: 14, duration: 1, title: "HS111", code: "126", teacher: "Nilu Chaudhary", type: "tut" },
    { day: 5, start: 11, duration: 1, title: "MA211", code: "126", teacher: "Pankaj Kumar Srivastava", type: "tut" },
    { day: 5, start: 13, duration: 2, title: "HS111", code: "240", teacher: "ALOK", type: "lab" },
    { day: 6, start: 9, duration: 2, title: "PH271", code: "41", teacher: "Sudip Kumar Haldar", type: "lab" },
    { day: 6, start: 12, duration: 1, title: "CI211", code: "3084", teacher: "Arti Jain", type: "lec" }
];

const scheduleF12 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "3023", teacher: "JRD", type: "lec" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "3023", teacher: "Sudip Kumar Haldar", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "3023", teacher: "UMK", type: "lec" },
    { day: 1, start: 14, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, SHJ, Arti Jain", type: "lab" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3084", teacher: "UMK", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "PH211", code: "3084", teacher: "Sudip Kumar Haldar", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "3045", teacher: "JRD", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "PH211", code: "3028", teacher: "Sudip Kumar Haldar", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "CI211", code: "3028", teacher: "Arti Jain", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "MA211", code: "3028", teacher: "UMK", type: "lec" },
    { day: 3, start: 13, duration: 3, title: "GE112", code: "WS05", teacher: "Rahul Kumar", type: "lab" },
    { day: 3, start: 16, duration: 1, title: "CI211", code: "3028", teacher: "Arti Jain, SAMARTH", type: "tut" },
    { day: 4, start: 9, duration: 2, title: "PH271", code: "256C", teacher: "Bharti Arora", type: "lab" },
    { day: 4, start: 11, duration: 1, title: "CI211", code: "3023", teacher: "Arti Jain", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "116", teacher: "ATH", type: "tut" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "116", teacher: "Sudip Kumar Haldar", type: "tut" },
    { day: 6, start: 9, duration: 2, title: "HS111", code: "246", teacher: "SANJAY", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "HS111", code: "121", teacher: "Shweta Verma", type: "tut" },
    { day: 6, start: 12, duration: 1, title: "CI211", code: "3084", teacher: "Arti Jain", type: "lec" }
];

const scheduleF13 = [
    { day: 1, start: 10, duration: 1, title: "MA211", code: "3045", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "PH211", code: "3045", teacher: "KAS", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3045", teacher: "Gaurav Sinha", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "126", teacher: "KAS", type: "tut" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "116", teacher: "Asim Patra", type: "tut" },
    { day: 1, start: 16, duration: 1, title: "CI211", code: "126", teacher: "Gaurav Sinha, KAKUL", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "3023", teacher: "KAS", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3023", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI211", code: "3023", teacher: "Gaurav Sinha", type: "lec" },
    { day: 4, start: 9, duration: 3, title: "GE112", code: "WS04", teacher: "Piyush Sharma", type: "lab" },
    { day: 4, start: 13, duration: 2, title: "CI271", code: "CL1", teacher: "RSK, Arti Jain, NMD", type: "lab" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "3092", teacher: "ARM", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "3092", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 5, start: 11, duration: 2, title: "PH271", code: "027A", teacher: "Urbashi Satpathy", type: "lab" },
    { day: 5, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "KAS", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "CI211", code: "3028", teacher: "Gaurav Sinha", type: "lec" },
    { day: 6, start: 9, duration: 1, title: "HS111", code: "3092", teacher: "ARM", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "HS111", code: "116", teacher: "Shweta Verma", type: "tut" },
    { day: 6, start: 11, duration: 2, title: "HS111", code: "240", teacher: "MEENAKSHI", type: "lab" }
];

const scheduleF14 = [
    { day: 1, start: 10, duration: 1, title: "MA211", code: "3045", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "PH211", code: "3045", teacher: "KAS", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3045", teacher: "Gaurav Sinha", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "126", teacher: "LKK", type: "tut" },
    { day: 1, start: 16, duration: 1, title: "CI211", code: "127", teacher: "Gaurav Sinha, SAMARTH", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "3023", teacher: "KAS", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3023", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI211", code: "3023", teacher: "Gaurav Sinha", type: "lec" },
    { day: 4, start: 9, duration: 3, title: "GE112", code: "WS05", teacher: "Rahul Kumar", type: "lab" },
    { day: 4, start: 13, duration: 2, title: "CI271", code: "CL1", teacher: "RSK, Arti Jain, NMD", type: "lab" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "3092", teacher: "ARM", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "MA211", code: "3092", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "KAS", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "CI211", code: "3028", teacher: "Gaurav Sinha", type: "lec" },
    { day: 6, start: 9, duration: 1, title: "HS111", code: "3092", teacher: "ARM", type: "lec" },
    { day: 6, start: 10, duration: 1, title: "PH211", code: "121", teacher: "KAS", type: "tut" },
    { day: 6, start: 11, duration: 2, title: "HS111", code: "246", teacher: "HIMANSHI", type: "lab" },
    { day: 6, start: 11, duration: 1, title: "HS111", code: "126", teacher: "Deepak Verma", type: "tut" }
];

const scheduleF17 = [
    { day: 1, start: 9, duration: 2, title: "CI271", code: "CYBER SECURITY", teacher: "Himani Bansal, SAMARTH JAIN", type: "lab" },
    { day: 1, start: 11, duration: 2, title: "PH271", code: "256C", teacher: "Amit Verma", type: "lab" },
    { day: 1, start: 13, duration: 2, title: "HS111", code: "240", teacher: "Anshu Banwari", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "CI211", code: "118", teacher: "RKA", type: "lec" },
    { day: 1, start: 16, duration: 1, title: "HS111", code: "118", teacher: "ARM", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "PH211", code: "116", teacher: "Bharti Arora", type: "tut" },
    { day: 2, start: 13, duration: 3, title: "GE112", code: "WS06", teacher: "Prabhakar Jha", type: "lab" },
    { day: 2, start: 16, duration: 1, title: "HS111", code: "121", teacher: "Praveen Kumar Sharma", type: "tut" },
    { day: 3, start: 11, duration: 1, title: "CI211", code: "226", teacher: "RKA", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "3084", teacher: "Neha Ahlawat", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "3045", teacher: "Bharti Arora", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "HS111", code: "3045", teacher: "ARM", type: "lec" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "3023", teacher: "Neha Ahlawat", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3023", teacher: "Bharti Arora", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "3023", teacher: "RKA", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "3023", teacher: "RKA, KAKUL", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "MA211", code: "3084", teacher: "Neha Ahlawat", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "PH211", code: "3084", teacher: "Bharti Arora", type: "lec" },
    { day: 6, start: 12, duration: 1, title: "MA211", code: "126", teacher: "Shivani Pant", type: "tut" }
];

const scheduleF18 = [
    { day: 1, start: 11, duration: 2, title: "PH271", code: "41", teacher: "Prashant Kumar Chauhan", type: "lab" },
    { day: 1, start: 13, duration: 2, title: "HS111", code: "246", teacher: "CHANDERSHEKHAR", type: "lab" },
    { day: 1, start: 15, duration: 1, title: "CI211", code: "118", teacher: "RKA", type: "lec" },
    { day: 1, start: 16, duration: 1, title: "HS111", code: "118", teacher: "ARM", type: "lec" },
    { day: 2, start: 9, duration: 3, title: "GE112", code: "WS06", teacher: "Rahul Kumar", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "126", teacher: "Shivani Pant", type: "tut" },
    { day: 3, start: 9, duration: 2, title: "CI271", code: "CYBER SECURITY", teacher: "SHJ, Jatin", type: "lab" },
    { day: 3, start: 11, duration: 1, title: "CI211", code: "226", teacher: "RKA", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "3084", teacher: "Neha Ahlawat", type: "lec" },
    { day: 3, start: 14, duration: 1, title: "PH211", code: "3045", teacher: "Bharti Arora", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "HS111", code: "3045", teacher: "ARM", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "121", teacher: "Bharti Arora", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "3023", teacher: "Neha Ahlawat", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3023", teacher: "Bharti Arora", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "3023", teacher: "RKA", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "127", teacher: "Deepak Verma", type: "tut" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "3028", teacher: "RKA, SAMARTH", type: "tut" },
    { day: 6, start: 10, duration: 1, title: "MA211", code: "3084", teacher: "Neha Ahlawat", type: "lec" },
    { day: 6, start: 11, duration: 1, title: "PH211", code: "3084", teacher: "Bharti Arora", type: "lec" }
];

const scheduleF21 = [
    { day: 1, start: 9, duration: 3, title: "GE112", code: "WS06", teacher: "Niraj Kumar", type: "lab" },
    { day: 1, start: 13, duration: 1, title: "PH211", code: "116", teacher: "Vikas Malik", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "PH211", code: "3028", teacher: "Narender Khatri", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3028", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI211", code: "127", teacher: "JYR", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "3023", teacher: "ARM", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI211", code: "3023", teacher: "JYR", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "CI271", code: "CYBER SECURITY", teacher: "RSK, Himani Bansal, Jatin", type: "lab" },
    { day: 4, start: 9, duration: 2, title: "PH271", code: "41", teacher: "Vikas Malik", type: "lab" },
    { day: 4, start: 11, duration: 2, title: "HS111", code: "246", teacher: "Amba Aggarwal", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "3028", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "Narender Khatri", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "3028", teacher: "JYR", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "HS111", code: "3028", teacher: "ARM", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "CI211", code: "3028", teacher: "JYR", type: "lec" },
    { day: 5, start: 12, duration: 1, title: "MA211", code: "127", teacher: "ATH", type: "tut" },
    { day: 6, start: 13, duration: 1, title: "MA211", code: "3028", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 6, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "Narender Khatri", type: "lec" },
    { day: 6, start: 16, duration: 1, title: "HS111", code: "116", teacher: "Deepak Verma", type: "tut" }
];

const scheduleF22 = [
    { day: 1, start: 13, duration: 3, title: "GE112", code: "WS06", teacher: "Sumit Mahajan", type: "lab" },
    { day: 2, start: 9, duration: 1, title: "PH211", code: "3028", teacher: "Narender Khatri", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3028", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "CI211", code: "126", teacher: "JYR", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "3023", teacher: "ARM", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "CI211", code: "3023", teacher: "JYR", type: "lec" },
    { day: 3, start: 13, duration: 2, title: "CI271", code: "CYBER SECURITY", teacher: "RSK, Himani Bansal, Jatin", type: "lab" },
    { day: 4, start: 11, duration: 2, title: "PH271", code: "027A", teacher: "Vikas Malik", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "MA211", code: "3028", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "Narender Khatri", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "3028", teacher: "JYR", type: "lec" },
    { day: 5, start: 9, duration: 2, title: "HS111", code: "246", teacher: "HIMANSHI", type: "lab" },
    { day: 5, start: 10, duration: 1, title: "HS111", code: "3028", teacher: "ARM", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "CI211", code: "3028", teacher: "JYR", type: "lec" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "127", teacher: "Narender Khatri", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "127", teacher: "ATH", type: "tut" },
    { day: 6, start: 13, duration: 1, title: "MA211", code: "3028", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 6, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "Narender Khatri", type: "lec" },
    { day: 6, start: 15, duration: 1, title: "HS111", code: "3028", teacher: "ARM", type: "tut" }
];

const scheduleF24 = [
    { day: 1, start: 11, duration: 1, title: "MA211", code: "127", teacher: "Pankaj Kumar Rana", type: "tut" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3023", teacher: "RSK", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "3023", teacher: "Prashant Kumar Chauhan", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "3023", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 2, start: 9, duration: 2, title: "HS111", code: "240", teacher: "CHANDERSHEKHAR", type: "lab" },
    { day: 2, start: 11, duration: 1, title: "HS111", code: "3028", teacher: "Sakshi Varshney", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "CI211", code: "3028", teacher: "RSK", type: "lec" },
    { day: 3, start: 13, duration: 3, title: "GE112", code: "WS04", teacher: "Niraj Kumar", type: "lab" },
    { day: 4, start: 13, duration: 2, title: "CI271", code: "CL1", teacher: "RSK, Arti Jain, NMD", type: "lab" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "116", teacher: "RSK, AVINASH", type: "tut" },
    { day: 5, start: 9, duration: 1, title: "PH211", code: "127", teacher: "Prashant Kumar Chauhan", type: "tut" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "3092", teacher: "Prashant Kumar Chauhan", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "3092", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "3092", teacher: "Sakshi Varshney", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "HS111", code: "121", teacher: "Deepak Verma", type: "tut" },
    { day: 6, start: 13, duration: 2, title: "PH271", code: "027A", teacher: "SKH", type: "lab" }
];

const scheduleF25 = [
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3023", teacher: "RSK", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "PH211", code: "3023", teacher: "Prashant Kumar Chauhan", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "MA211", code: "3023", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 2, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "MKS, NMD, Gaurav Sinha, Baibhav", type: "lab" },
    { day: 2, start: 11, duration: 1, title: "HS111", code: "3028", teacher: "Sakshi Varshney", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "CI211", code: "3028", teacher: "RSK", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "127", teacher: "ATH", type: "tut" },
    { day: 3, start: 9, duration: 3, title: "GE112", code: "WS06", teacher: "Sumit Mahajan", type: "lab" },
    { day: 4, start: 13, duration: 2, title: "PH271", code: "256C", teacher: "Prashant Kumar Chauhan", type: "lab" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "126", teacher: "RSK, SAMARTH", type: "tut" },
    { day: 5, start: 11, duration: 2, title: "HS111", code: "246", teacher: "HIMANSHI", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "3092", teacher: "Prashant Kumar Chauhan", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "3092", teacher: "Pankaj Kumar Rana", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "3092", teacher: "Sakshi Varshney", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "PH211", code: "126", teacher: "Prashant Kumar Chauhan", type: "tut" },
    { day: 6, start: 16, duration: 1, title: "HS111", code: "3028", teacher: "Deepak Verma", type: "tut" }
];

const scheduleH1 = [
    { day: 1, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "SGU, Arti Jain, Jatin", type: "lab" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3084", teacher: "HMB", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "HS111", code: "3084", teacher: "PRK", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "3084", teacher: "SHALU", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "HS111", code: "3084", teacher: "PRK", type: "lec" },
    { day: 3, start: 13, duration: 3, title: "GE112", code: "WS06", teacher: "Niraj Kumar", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "MA211", code: "116", teacher: "AMB", type: "tut" },
    { day: 4, start: 13, duration: 1, title: "CI211", code: "3084", teacher: "HMB", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3084", teacher: "SHALU", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "PH211", code: "116", teacher: "SHALU", type: "tut" },
    { day: 5, start: 9, duration: 2, title: "HS111", code: "246", teacher: "HIMANSHI", type: "lab" },
    { day: 5, start: 11, duration: 1, title: "CI211", code: "127", teacher: "HMB, SAMARTH", type: "tut" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "127", teacher: "Nilu Chaudhary", type: "tut" },
    { day: 5, start: 14, duration: 2, title: "PH271", code: "41", teacher: "SHALU", type: "lab" }
];

const scheduleH2 = [
    { day: 1, start: 11, duration: 2, title: "HS111", code: "246", teacher: "HIMANSHI", type: "lab" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3084", teacher: "HMB", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 1, start: 15, duration: 1, title: "HS111", code: "3084", teacher: "PRK", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "PH211", code: "3084", teacher: "SHALU", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "HS111", code: "3084", teacher: "PRK", type: "lec" },
    { day: 3, start: 9, duration: 2, title: "CI271", code: "CYBER SECURITY", teacher: "Himani Bansal, Jatin", type: "lab" },
    { day: 4, start: 10, duration: 1, title: "CI211", code: "121", teacher: "HMB, AVINASH", type: "tut" },
    { day: 4, start: 11, duration: 2, title: "PH271", code: "256C", teacher: "Urbashi Satpathy", type: "lab" },
    { day: 4, start: 13, duration: 1, title: "CI211", code: "3084", teacher: "HMB", type: "lec" },
    { day: 4, start: 14, duration: 1, title: "PH211", code: "3084", teacher: "SHALU", type: "lec" },
    { day: 4, start: 15, duration: 1, title: "PH211", code: "127", teacher: "SHALU", type: "tut" },
    { day: 5, start: 9, duration: 3, title: "GE112", code: "WS06", teacher: "Niraj Kumar", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "HS111", code: "127", teacher: "Nilu Chaudhary", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "116", teacher: "AMB", type: "tut" }
];

const scheduleH3 = [
    { day: 1, start: 13, duration: 1, title: "MA211", code: "3023", teacher: "NEA/ATH", type: "lec" },
    { day: 1, start: 14, duration: 2, title: "PH271", code: "027A", teacher: "ADV", type: "lab" },
    { day: 1, start: 16, duration: 1, title: "CI211", code: "3023", teacher: "DVG/BAIBHAV", type: "tut" },
    { day: 2, start: 9, duration: 1, title: "CI211", code: "3092", teacher: "DVG", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "MA211", code: "3092", teacher: "NEA/ATH", type: "lec" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "3028", teacher: "NEA/ATH", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "3028", teacher: "NEA/ATH", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "PH211", code: "3028", teacher: "SKH", type: "lec" },
    { day: 2, start: 16, duration: 1, title: "MA211", code: "126", teacher: "ASP", type: "tut" },
    { day: 3, start: 9, duration: 1, title: "CI211", code: "3092", teacher: "DVG", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "3092", teacher: "NEA/ATH", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "3092", teacher: "SKH", type: "lec" },
    { day: 3, start: 15, duration: 1, title: "CI211", code: "3023", teacher: "DVG/JATIN", type: "tut" },
    { day: 4, start: 9, duration: 3, title: "GE112", code: "WS06", teacher: "HAB", type: "lab" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "3045", teacher: "PRS", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "CI211", code: "3045", teacher: "DVG", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "HS111", code: "116", teacher: "DEV", type: "tut" },
    { day: 5, start: 12, duration: 1, title: "HS111", code: "226", teacher: "PRS", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "PH211", code: "3045", teacher: "SKH", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "3045", teacher: "PRS", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "PH211", code: "126", teacher: "SKH", type: "tut" }
];

const scheduleH4 = [
    { day: 1, start: 13, duration: 1, title: "MA211", code: "3023", teacher: "NEA/ATH", type: "lec" },
    { day: 1, start: 14, duration: 2, title: "PH271", code: "256C", teacher: "URS", type: "lab" },
    { day: 2, start: 9, duration: 1, title: "CI211", code: "3092", teacher: "DVG", type: "lec" },
    { day: 2, start: 11, duration: 1, title: "HS111", code: "121", teacher: "SHV", type: "tut" },
    { day: 2, start: 13, duration: 1, title: "MA211", code: "3028", teacher: "NEA/ATH", type: "lec" },
    { day: 2, start: 14, duration: 1, title: "PH211", code: "3028", teacher: "SKH", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI211", code: "3028", teacher: "DVG", type: "lec" },
    { day: 2, start: 16, duration: 1, title: "MA211", code: "127", teacher: "UMK", type: "tut" },
    { day: 3, start: 9, duration: 1, title: "CI211", code: "3092", teacher: "DVG", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "3092", teacher: "NEA/ATH", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "3092", teacher: "SKH", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "PH211", code: "126", teacher: "KAS", type: "tut" },
    { day: 5, start: 9, duration: 1, title: "HS111", code: "3045", teacher: "PRS", type: "lec" },
    { day: 5, start: 10, duration: 1, title: "CI211", code: "3045", teacher: "DVG", type: "lec" },
    { day: 5, start: 11, duration: 1, title: "HS111", code: "121", teacher: "SHV", type: "tut" },
    { day: 5, start: 12, duration: 1, title: "HS111", code: "226", teacher: "PRS", type: "lec" },
    { day: 5, start: 14, duration: 1, title: "PH211", code: "3045", teacher: "SKH", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "HS111", code: "3045", teacher: "PRS", type: "lec" },
    { day: 6, start: 9, duration: 3, title: "GE112", code: "WS05", teacher: "RAK", type: "lab" }
];

const scheduleE1 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "116", teacher: "Shweta Verma", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "CI211", code: "SR05", teacher: "NMD", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "HS111", code: "SR05", teacher: "Nilu Chaudhary", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "PH211", code: "118", teacher: "SHALU", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "MA211", code: "118", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 2, start: 11, duration: 2, title: "PH271", code: "41", teacher: "Bharti Arora", type: "lab" },
    { day: 2, start: 14, duration: 1, title: "HS111", code: "228", teacher: "PRK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI211", code: "228", teacher: "NMD", type: "lec" },
    { day: 2, start: 16, duration: 1, title: "CI211", code: "3045", teacher: "Baibhav", type: "tut" },
    { day: 3, start: 9, duration: 1, title: "PH211", code: "3023", teacher: "SHALU", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "3023", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "CI211", code: "3023", teacher: "NMD", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "PH211", code: "121", teacher: "SHALU", type: "tut" },
    { day: 3, start: 15, duration: 2, title: "HS111", code: "240", teacher: "MEENAKSHI", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "HS111", code: "3084", teacher: "PRK", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "PH211", code: "3084", teacher: "SHALU", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "MA211", code: "3084", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 4, start: 13, duration: 3, title: "GE112", code: "WS04", teacher: "Niraj Kumar", type: "lab" },
    { day: 4, start: 16, duration: 1, title: "MA211", code: "118", teacher: "AMB", type: "tut" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "3045", teacher: "Nilu Chaudhary", type: "lec" }
];

const scheduleE2 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "121", teacher: "Praveen Kumar Sharma", type: "tut" },
    { day: 1, start: 10, duration: 1, title: "CI211", code: "SR05", teacher: "NMD", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "HS111", code: "SR05", teacher: "Nilu Chaudhary", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "PH211", code: "118", teacher: "SHALU", type: "lec" },
    { day: 1, start: 14, duration: 1, title: "MA211", code: "118", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 2, start: 10, duration: 1, title: "PH211", code: "121", teacher: "SHALU", type: "tut" },
    { day: 2, start: 11, duration: 2, title: "PH271", code: "256C", teacher: "Narender Khatri", type: "lab" },
    { day: 2, start: 14, duration: 1, title: "HS111", code: "228", teacher: "PRK", type: "lec" },
    { day: 2, start: 15, duration: 1, title: "CI211", code: "228", teacher: "NMD", type: "lec" },
    { day: 2, start: 16, duration: 1, title: "CI211", code: "3083", teacher: "Jatin", type: "tut" },
    { day: 3, start: 9, duration: 1, title: "PH211", code: "3023", teacher: "SHALU", type: "lec" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "3023", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "CI211", code: "3023", teacher: "NMD", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "MA211", code: "127", teacher: "AMB", type: "tut" },
    { day: 3, start: 15, duration: 2, title: "HS111", code: "246", teacher: "Ekta Srivastava", type: "lab" },
    { day: 4, start: 9, duration: 1, title: "HS111", code: "3084", teacher: "PRK", type: "lec" },
    { day: 4, start: 10, duration: 1, title: "PH211", code: "3084", teacher: "SHALU", type: "lec" },
    { day: 4, start: 11, duration: 1, title: "MA211", code: "3084", teacher: "Pankaj Kumar Srivastava", type: "lec" },
    { day: 4, start: 13, duration: 3, title: "GE112", code: "WS05", teacher: "Prabhakar Jha", type: "lab" },
    { day: 4, start: 16, duration: 1, title: "HS111", code: "3045", teacher: "Nilu Chaudhary", type: "lec" }
];

const scheduleE3 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "3092", teacher: "Nilu Chaudhary", type: "lec" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "3092", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "3092", teacher: "AMB", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3028", teacher: "Anuj Kumar", type: "lec" },
    { day: 3, start: 9, duration: 1, title: "MA211", code: "127", teacher: "Pankaj Kumar Srivastava", type: "tut" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "230", teacher: "AMB", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "230", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "CI211", code: "230", teacher: "Anuj Kumar", type: "lec" },
    { day: 3, start: 14, duration: 2, title: "PH271", code: "41", teacher: "SHALU", type: "lab" },
    { day: 3, start: 16, duration: 1, title: "HS111", code: "116", teacher: "Praveen Kumar Sharma", type: "tut" },
    { day: 4, start: 11, duration: 2, title: "PH271", code: "41", teacher: "SHALU", type: "lab" },
    { day: 4, start: 13, duration: 2, title: "HS111", code: "240", teacher: "Anshu Banwari", type: "lab" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "217", teacher: "Anuj Kumar", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "217", teacher: "Anuj Kumar, Baibhav", type: "tut" },
    { day: 5, start: 9, duration: 3, title: "GE112", code: "WS04", teacher: "Prabhakar Jha", type: "lab" },
    { day: 5, start: 13, duration: 1, title: "PH211", code: "3084", teacher: "KAS", type: "tut" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "AMB", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "PH211", code: "3084", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "HS111", code: "3084", teacher: "Nilu Chaudhary", type: "lec" }
];

const scheduleE4 = [
    { day: 1, start: 9, duration: 1, title: "HS111", code: "3092", teacher: "Nilu Chaudhary", type: "lec" },
    { day: 1, start: 10, duration: 1, title: "PH211", code: "3092", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 1, start: 11, duration: 1, title: "MA211", code: "3092", teacher: "AMB", type: "lec" },
    { day: 1, start: 13, duration: 1, title: "CI211", code: "3028", teacher: "Anuj Kumar", type: "lec" },
    { day: 2, start: 9, duration: 2, title: "CI271", code: "CL1", teacher: "MKS, NMD, Gaurav Sinha, Baibhav", type: "lab" },
    { day: 2, start: 13, duration: 1, title: "HS111", code: "116", teacher: "AKS", type: "tut" },
    { day: 2, start: 14, duration: 1, title: "MA211", code: "126", teacher: "Pankaj Kumar Srivastava", type: "tut" },
    { day: 3, start: 9, duration: 1, title: "PH211", code: "116", teacher: "KAS", type: "tut" },
    { day: 3, start: 10, duration: 1, title: "MA211", code: "230", teacher: "AMB", type: "lec" },
    { day: 3, start: 11, duration: 1, title: "PH211", code: "230", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 3, start: 13, duration: 1, title: "CI211", code: "230", teacher: "Anuj Kumar", type: "lec" },
    { day: 4, start: 11, duration: 2, title: "PH271", code: "027A", teacher: "Urbashi Satpathy", type: "lab" },
    { day: 4, start: 13, duration: 2, title: "HS111", code: "246", teacher: "ALOK", type: "lab" },
    { day: 4, start: 15, duration: 1, title: "CI211", code: "217", teacher: "Anuj Kumar", type: "lec" },
    { day: 4, start: 16, duration: 1, title: "CI211", code: "226", teacher: "Anuj Kumar, Jatin", type: "tut" },
    { day: 5, start: 9, duration: 3, title: "GE112", code: "WS05", teacher: "Niraj Kumar", type: "lab" },
    { day: 5, start: 14, duration: 1, title: "MA211", code: "3084", teacher: "AMB", type: "lec" },
    { day: 5, start: 15, duration: 1, title: "PH211", code: "3084", teacher: "Urbashi Satpathy", type: "lec" },
    { day: 5, start: 16, duration: 1, title: "HS111", code: "3084", teacher: "Nilu Chaudhary", type: "lec" }
];
const schedulef1 = [];
const schedulef2 = [];
const schedulef3 = [];
const schedulef4 = [];
const schedulef5 = [];
const schedulef6 = [];
const schedulef7 = [];
const schedulef8 = [];
const schedulef9 = [];
const schedulef10 = [];
const schedulef11 = [];
const schedulef12 = [];
const schedulef13 = [];
const schedulef14 = [];
// Note: F15, F16 were missing in your map, add if needed
const schedulef17 = [];
const schedulef18 = [];
// Note: F19, F20 were missing in your map
const schedulef21 = [];
const schedulef22 = [];
// Note: F23 was missing in your map
const schedulef24 = [];
const schedulef25 = [];

const scheduleh1 = [];
const scheduleh2 = [];
const scheduleh3 = [];
const scheduleh4 = [];

const schedulee1 = [];
const schedulee2 = [];
const schedulee3 = [];
const schedulee4 = [];
// ==================== 4. SCHEDULE MAPPING ====================
const scheduleMap = {
  'A1': scheduleA1,
  'A2': scheduleA2,
  'A3': scheduleA3,
  'A4': scheduleA4,
  'A5': scheduleA5,
  'A6': scheduleA6,
  'A7': scheduleA7,
  'A8': scheduleA8,
  'A10': scheduleA10,
  'A15': scheduleA15,
  'A16': scheduleA16,
  'A17': scheduleA17,
  'A18': scheduleA18,
  'B1': scheduleB1,
  'B2': scheduleB2,
  'B3': scheduleB3,
  'B4': scheduleB4,
  'B5': scheduleB5,
  'B6': scheduleB6,
  'B7': scheduleB7,
  'B8': scheduleB8,
  'B9': scheduleB9,
  'B10': scheduleB10,
  'B11': scheduleB11,
  'B12': scheduleB12,
  'B14': scheduleB14,
  'C1': scheduleC1,
  'C2': scheduleC2,
  'C3': scheduleC3,
  'D1': scheduleD1,
  'D2': scheduleD2,
  'G1': scheduleG1,
  'G2': scheduleG2,
  'G3': scheduleG3,
  'G4': scheduleG4,
  
      //128 maps
  'F1': scheduleF1,
  'F2': scheduleF2,
  'F3': scheduleF3,
  'F4': scheduleF4,
  'F5': scheduleF5,
  'F6': scheduleF6,
  'F7': scheduleF7,
  'F8': scheduleF8,
  'F9': scheduleF9,
  'F10': scheduleF10,
  'F11': scheduleF11,
  'F12': scheduleF12,
  'F13': scheduleF13,
  'F14': scheduleF14,
  'F17': scheduleF17,
  'F18': scheduleF18,
  'F21': scheduleF21,
  'F22': scheduleF22,
  'F24': scheduleF24,
  'F25': scheduleF25,
  'H1': scheduleH1,
  'H2': scheduleH2,
  'H3': scheduleH3,
  'H4': scheduleH4,
  'E1': scheduleE1,
  'E2': scheduleE2,
  'E3': scheduleE3,
  'E4': scheduleE4
};

// Export data (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    facultyNames,
    subjectNames,
    scheduleMap,
    scheduleA1,
    // ... export other schedules if needed
  };
}















