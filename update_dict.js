const fs = require('fs');
let code = fs.readFileSync('parser_tool/dictionaries.js', 'utf8');

const newNames = {
  'ABU': 'Abhijeet Upadhyay', 'ADM': 'Adhirath Mandal',
  'AKT': 'AKSHIT RAJ PATEL', 'ALJ': 'Alok Joshi', 'AMI': 'ANKITA MISHRA',
  'AN': 'Dr. Anuj Bhardwa', 'ANP': 'ANUPAMA PADHA', 'ASG': 'Ashish Gupta',
  'ASU': 'ASHU KUMARI', 'ATA': 'Astha Sharma', 'AW': 'ANKITA',
  'AYS': 'AYUSH SAHU', 'BHA': 'Bhawna Gupta', 'BVI': 'Bhuvneshwari S',
  'CDN': 'Chandan Kumar', 'DCH': 'DIKSHA CHAWLA', 'DCS': 'Dr Dinesh Bisht',
  'DGA': 'Dr. Diksha Gupta', 'DSI': 'DEEPTI', 'GGL': 'Gorav Gugliani',
  'GRP': 'Gaurav Patel', 'GV': 'Gaurav Verma', 'HA': 'Dr. Himanshu Agarwal',
  'HEM': 'Hemant Kumar', 'HPT': 'Dr. Himani Pant', 'JG': 'Juhi gupta',
  'JMO': 'Jitendra Mohan', 'JYM': 'Jyoti Mishra', 'KMB': 'KANUPRIYA MISRA BAKHRU',
  'KNP': 'KANU PRIYA', 'KUL': 'Kuldeep Baderia', 'LK': 'Prof. Lokendra Kumar',
  'MAY': 'MAYURI GUPTA', 'MB': 'MONALI BHATTACHARYA', 'MDU': 'MOHUA DUTTA',
  'MGR': 'MEGHA RATHI', 'MJ': 'Madhu Jain', 'MJH': 'Madhu Jhariya',
  'MKB': 'Dr. Manish Kumar Bansal', 'MKC': 'Dr. Manoj Kumar',
  'MKT': 'MANISH KUMAR THAKUR', 'MN': 'Mandeep Narula',
  'MPA': 'Dr. Mohd. Prawesh Alam', 'MSI': 'MEGH SINGHAL',
  'NAC': 'NAVEEN CHAUHAN', 'NAR': 'Dr. Narinder Kaur', 'NBH': 'Neha Bhadauria',
  'NEJ': 'Neetu Joshi', 'NHI': 'Nidhi Tewari', 'NIS': 'NIBHA SINHA',
  'NIY': 'NIYATI AGGRAWAL', 'NS': 'Dr. Neha Singhal', 'NSH': 'K.Nisha',
  'NSK': 'Dr. Nisha Shukla', 'NTN': 'Nitin Muchal', 'NTS': 'Nitesh Singh',
  'PAC': 'PARIDHI', 'PKU': 'PRASHANT KAUSHIK', 'PKY': 'Pankaj Yadav',
  'PSI': 'Dr. Priya Shahi', 'PSO': 'PRATEEK KUMAR SONI',
  'PTK': 'PRATIK SHRIVASTAVA', 'RCA': 'RICHA KUSHWAHA', 'RHA': 'Rachna Singh',
  'RJM': 'RAJIV KUMAR MISHRA', 'ROH': 'ROHIT KUMAR SONY', 'RRJ': 'Rituraj',
  'RRP': 'Radha Raman Pandey', 'RS': 'Ritesh Sharma',
  'RSA': 'Dr. Rupali Srivastav', 'RSC': 'Dr. RAM SURAT CHAUHAN',
  'RSH': 'Dr. Richa Sharma', 'RU': 'Ruby Beniwal', 'SAA': 'SAKSHI GUPTA',
  'SDA': 'SURAJ DAS', 'SGL': 'Dr. Shashank Goel', 'SHA': 'Shamim Akhter',
  'SHO': 'SHOBHIT TYAGI', 'SHR': 'SHWETA RANI', 'SHV': 'SHIVENDRA VIKRAM SINGH',
  'SIM': 'Simmi Sharma', 'SLK': 'SILKI KHARALIYA', 'SLM': 'Salman Khan',
  'SMK': 'Samriti Kalia', 'SMS': 'SUMESHWAR SINGH', 'SNP': 'SatyaNarayan Patel',
  'SOS': 'SONAL SAURABH', 'SP': 'Dr. Shikha Pandey', 'SRG': 'SARISHTY GUPTA',
  'SWET': 'Shwetabh Singh', 'TAJ': 'TAJ ALAM', 'TNV': 'TANVI GAUTAM',
  'VD': 'Vivek Dwivedi', 'VGO': 'Varun Goel', 'VKH': 'Vijay Khare'
};

let newNamesStr = '        // NEW NAMES\n';
for (const [k, v] of Object.entries(newNames)) {
  newNamesStr += '        "' + k + '": "' + v + '",\n';
}

code = code.replace(/("DL": "Dr\. Dhanalakshmi",)/, '$1\n' + newNamesStr);

let sem1SubjectsStr = `    subjectsSem1: {
        "HS112": "English",
        "15B11HS112": "English",
        "CI111": "Software Development Fundamentals- I",
        "15B11CI111": "Software Development Fundamentals- I",
        "CS111": "Software Development Fundamentals- I Lab",
        "24B15CS111": "Software Development Fundamentals- I Lab",
        "18B11CI111": "Fundamentals of Computers & Programming - I",
        "24B45CS111": "Fundamentals of Computers & Programming - I Lab",
        "EC111": "Basic Electronics",
        "24B11EC111": "Basic Electronics",
        "24B15EC111": "Basic Electronics Lab",
        "EC112": "Basic Electronics",
        "24B11EC112": "Basic Electronics",
        "24B15EC112": "Basic Electronics Lab",
        "GE111": "Engineering Drawing and Design",
        "18B15GE111": "Engineering Drawing and Design",
        "PH111": "Physics-1",
        "15B11PH111": "Physics-1",
        "PH112": "Physics for Biotechnology",
        "15B11PH112": "Physics for Biotechnology",
        "PH171": "Physics Lab-1",
        "15B17PH171": "Physics Lab-1"
    },
    subjectsSem3: {`;

code = code.replace(/subjects:\s*\{/, sem1SubjectsStr);

fs.writeFileSync('parser_tool/dictionaries.js', code);
