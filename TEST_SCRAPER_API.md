# Testing Canvas Scraper API

## Step 1: Start Docker Backend

```bash
cd backend
docker-compose up -d
```

Wait ~10 seconds for the database to initialize.

## Step 2: Test the Scraper API

### Option A: Using Python Script

Run this test script:

```bash
python test_scraper_api.py
```

### Option B: Using Swagger UI

1. Open: http://localhost:8000/api/docs
2. Find: **canvas-integration** section
3. Click: `POST /api/v1/canvas/scrape-courses`
4. Click: **Try it out**
5. Replace the example data with:

```json
{
  "canvas_url": "https://usflearn.instructure.com",
  "session_cookie": "2bphp1Rq5npX_T_Nb-1Ptw+gDVN-YFQ0B6T6GELL7yri2uTYA0Eh1wcj0ZzPL6guBK5VaDHK6TWHYNr6W7YB3Q-N2SC-E7dmyrnIOr5yZ3cGtO-gsXB_qMBLSL4039FlVGD4KSndVe94c5UoB_cxP8I21NegKUOn5Nn8iKn_-WPSEQLBhstVDM2f2isV_QuFIQI2XtP6_NtR-H-SXmwl4fJUvfSiulD1mxgVvtdfowwlFmuap6pKl_oeVyfAf1yv0HItu3bTYWJoJ4UHrVj67RybMhyxlUuTLnIygXkmDPRGgCd7GZkSw9iMSyI-MVS3TBoaaRIVQiS_dV_1vTWFmVwnANs3s_ZuHo8o99QASo1K3lxFgAOw55XrlrOaj6v-45X8SmbPDnNKqhAkWmACR2SsKXNpiLzsRCS1G_ATVxUGYSq0eJSzDASpVlrwm3Eu7lsypUYioY6k0_PF-GwBlBa6GcQy9oI2H8dRUtxktYUebMDcsGAz0PfwxhCVWDpKOU8Y8Jg6e7Wq1gx8VUmhBXKtCUVf1iNzDMIpiGD__ThU5i5h9YVqkb-gmstNumZF8g1m-2ttM3WjLQwYN3ivJl_A6ktrbw49AXFJ-AkmDwcpsqK1F-ND2mdiop564vlyYUXpnVeJdZQXxLPrSsdMGV_GPUeI_xnGSjqLD1t2psZ-eDsz-dPPr-PxrbbMreUrLk._PDjbePSjx9R86MeaFuTJFb0vMk.aQ-rgg",
  "user_id": 1
}
```

6. Click: **Execute**

Expected Response:
```json
{
  "success": true,
  "courses_imported": 12,
  "modules_imported": 145,
  "message": "Successfully imported 12 courses and 145 modules"
}
```

## Step 3: Verify Import

### Check Courses

```bash
curl http://localhost:8000/api/v1/courses
```

Should return your 12 courses!

### Check Modules for a Course

```bash
curl http://localhost:8000/api/v1/modules/course/1
```

Should return modules for course ID 1.

## Expected Results

Your 12 Fall 2024/2025 courses:
1. ARH2000 - Art & Culture
2. CAP4641 - Natural Language Processing
3. CDA4205L - Computer Architecture Lab
4. CEN4020 - Software Engineering
5. CHM2046 - General Chemistry II
6. CIS4930 - Human-Computer Interaction
7. CNT4419 - Secure Coding
8. COP4365 - Software System Development
9. IDH3400 - Honors Soc/Behavioral Sciences
10. IDS3947 - Adv Undergrad Research Exp
11. POS2041 - American National Government
12. CHM 2046 F24 All Sections

## Troubleshooting

### Docker Not Starting

```bash
# Check Docker Desktop is running
# Start it from Windows Start Menu

# Then try again
cd backend
docker-compose up -d
```

### "User not found" Error

The API expects user_id = 1. If no users exist:

```bash
# Create a test user via import script
docker exec canvas_ext_backend python import_canvas_data.py
```

### Session Cookie Expired

If you get authentication errors, update your session cookie:
1. Open Canvas in browser
2. F12 → Application → Cookies
3. Copy new `canvas_session` value
4. Update in the request


