# Nurse Next Door
Ellen Gao, Rebecca Sassower, Claire Walker, Tommy Yong

## Setup
This repository contains a application using a Node backend with Express.js and a React frontend. The server directory contains the JavaScript files that include the API endpoints to the database, and the necessary routing within our webapplication. The Client directory contains all the React components and styling of the frontend. To run, simply run the commands `npm install` (to install all the dependencies) from the server and Client directory. Then execute `npm start` from the server and Client directory to run the application on localhost. To access full features of the webapplication a Maps JavaScript API key is required from the Google Maps Platform.

## Objective
The year 2020 will always be remembered due to the Covid-19 global pandemic. The pandemic, which has affected over 60 million people worldwide, has caused the deaths of over 250,000 American citizens, and has disrupted a multitude of industries, is still a persistent issue. Covid-19 has disproportionately affected the eldery, specifically those at nursing homes and assisted living communities. It has been estimated that over 40% of all Covid-19 deaths in the United States have been within nursing homes. Nurse Next Door is a streamlined solution to help tackle the issue of finding and choosing good quality healthcare for your loved ones. By collating nursing home and Covid-19 data from the CMS, Nurse next door, allows users to carefully search for nursing homes that fit their needs. 

## Features
Users of Nurse Next Door can search for nursing homes based on a wide variety of filters and requirements. Users can carefully analyze which nursing homes were aptly prepared for the pandemic and take note of those that were caught off-guard. Nurse Next Door provides key ranking metrics, suggestions on similar nursing homes, warning indicators, and state and nation wide statistics so that you can find a nursing home that you’ll love.

## Development
We have a MySQL instance set up on Amazon Web Services. We use a Node/Express backend and the frontend is developed using the React library with additional components taken from Blueprint and Google Map React. The majority of styling has been done manually.

## Data
We collected data from the CMS from their ['Provider Information'](https://data.cms.gov/provider-data/dataset/4pq5-n9py) and ['COVID-19 Nursing Home"](https://data.cms.gov/Special-Programs-Initiatives-COVID-19-Nursing-Home/COVID-19-Nursing-Home-Dataset/s2uc-8wxp) datasets.

## Database
Both the Nursing Home Compare Provider Info and the COVID-19 Nursing Home Dataset contain location attributes - street, city, state, zip code. Location information is functionally dependent on the Federal Provider Number FPN (FPN), which serves as the primary key for both datasets. Therefore, Location is broken out into its own relation to eliminate redundancy. The SQL DDL statements that we used to create our relationships are shown [here](https://github.com/ellenzhixingao/550Project/blob/main/550%20MySQL%20Workbench.docx).

The four relations are therefore in the Third Normal Form (3NF), in which no dependency can be removed and no left-hand side of a dependency can be reduced. This guarantees a lossless join and dependency preservation. 

Relational Schema:  
**Providers**(FPN, ProviderName, LegalBusinessName, CertifiedBeds, TotalNumberofOccupiedBeds, AveResidentsPerDay, ProviderType, OwnershipType, AbuseIcon)

**Locations**(FPN, Address, City, State, Zip, SSACounty, CountyName, Longitude, Latitude, Phone)
Foreign Key FPN References Providers.FPN 

**CMSData** (FPN,  OverallRating, HealthInspectionRating, QMRating, StaffingRating, LicensedStaffing_ReportedHoursPerResidentPerDay, TotalNurse_ReportedHoursPerResidentPerDay, PT_ReportedHoursPerResidentPerDay, TotalWeightedHealthSurveyScore, NumReportedIncidents, NumSubstantiatedComplaints, NumFines, AmountFines, NumPaymentDenials, NumPenalties)
	Foreign Key FPN References Providers.FPN 

**COVIDData**(FPN, SubmittedData, PassedQACheck,ResidentsWeeklyAdmissions, ResidentsTotalAdmissions, ResidentsWeeklyConfirmed, ResidentsTotalConfirmed, ResidentsWeeklySuspected, ResidentsTotalSuspected, ResidentsTotalAllDeath, ResidentsWeeklyCovidDeaths, ResidentsTotalCovidDeaths, ResidentsAbleToTestAllWithinWeek, StaffAbleToTestAllWithinWeek, StaffWeeklyConfirmed, StaffTotalConfirmed, StaffWeeklySuspected, StaffTotalSuspected, StaffWeeklyCovidDeaths, StaffTotalCovidDeaths, AnyCurrentSupplyN95Masks, NumVentilatorsInFacility)
	Foreign Key FPN References Providers.FPN 


## Sample images of Nurse Next Door

### Frontpage
![Frontpage](https://github.com/ellenzhixingao/550Project/blob/main/frontpage.png)
### Search page
![Search page](https://github.com/ellenzhixingao/550Project/blob/main/search.png)
### Profile page
![Profile page](https://github.com/ellenzhixingao/550Project/blob/main/profile.png)
### State page
![State page](https://github.com/ellenzhixingao/550Project/blob/main/state.png)
