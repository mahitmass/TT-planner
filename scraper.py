import os
import re
import requests
from bs4 import BeautifulSoup
import urllib3

# Disable annoying SSL warnings (college websites often have bad SSL certificates)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://www.jiit.ac.in/latest-announcements?type=time-table"
BASE_URL = "https://www.jiit.ac.in"

# 1. THE SMART REGEX RULES
# Looks for "B" and "Tech" with or without dots and spaces
btech_pattern = re.compile(r'b\.?\s*tech', re.IGNORECASE)

# Looks for "Sem" followed by an optional dash/space, and then "1" or "I"
sem1_pattern = re.compile(r'sem(?:ester)?\s*[-]?\s*(1|i)\b', re.IGNORECASE)

# Looks for "Sem" followed by "3" or "III"
sem3_pattern = re.compile(r'sem(?:ester)?\s*[-]?\s*(3|iii)\b', re.IGNORECASE)

# Looks for 62 or 128 anywhere in the string
campus62_pattern = re.compile(r'62', re.IGNORECASE)
campus128_pattern = re.compile(r'128', re.IGNORECASE)

print("Fetching JIIT Announcements Page...")
response = requests.get(URL, verify=False)
soup = BeautifulSoup(response.content, 'html.parser')

# 2. HUNT FOR THE LINKS
found_files = 0
os.makedirs("raw_data", exist_ok=True)

for link in soup.find_all('a', href=True):
    text = link.get_text(strip=True)
    href = link['href']
    
    # Must have some variation of "B.Tech"
    if btech_pattern.search(text):
        
        # Determine Semester
        semester = None
        if sem1_pattern.search(text):
            semester = "1"
        elif sem3_pattern.search(text):
            semester = "3"
            
        # Determine Campus
        campus = None
        if campus62_pattern.search(text):
            campus = "62"
        elif campus128_pattern.search(text):
            campus = "128"
            
        # 3. DOWNLOAD IF IT MATCHES OUR RULES
        if semester and campus:
            found_files += 1
            print(f"\n✅ MATCH FOUND: {text}")
            print(f"   -> Categorized as: Sector {campus} | Semester {semester}")
            
            # Fix relative URLs
            download_url = href if href.startswith("http") else BASE_URL + href
            
            # Download and save
            file_ext = download_url.split('.')[-1].lower()
            if len(file_ext) > 4: 
                file_ext = "xlsx" # Fallback if URL doesn't have extension
                
            # If it's an excel file, name it nicely for the parser
            if file_ext == "xlsx":
                save_path = f"raw_data/{semester}-{campus}.xlsx"
            else:
                # If it's a PDF or something else, prefix with manual_ so the parser ignores it
                save_path = f"raw_data/manual_{semester}-{campus}.{file_ext}"
            
            print(f"   -> Downloading to {save_path}...")
            file_resp = requests.get(download_url, verify=False)
            with open(save_path, 'wb') as f:
                f.write(file_resp.content)

if found_files == 0:
    print("\n❌ No matching timetables found on the website today.")
else:
    print(f"\n🎉 Successfully downloaded {found_files} timetable(s).")
