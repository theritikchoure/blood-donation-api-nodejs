const stockBhopalData = [
    [
        "1",
        "Blood Bank, Bhopal Memorial Hospital & Research Centre<br/>Bhopal Memorial Hospital & Research Centre , Raisen Bypass Road, Karond, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 2742549,09425012342 ,Fax: 0755-2748309, Email: bloodbank.bmhrc@gmail.com",
        "Govt.",
        "<p class='text-success'>Available, O+Ve:1</p>",
        "<img src='../hisglobal/bbpublic/images/transparent/live_stock.png'>",
        "Blood Bank"
    ],
    [
        "2",
        "Karond Blood Centre And Component Centre<br/> Plot No. 3 & 4¸ First Floor, Maa Archana Complex, Ayodhya Bypass, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 8839402126 ,Fax: -, Email: karondbb@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 12:17:11",
        "Blood Bank"
    ],
    [
        "3",
        "Tatpar Blood Centre & Component Centre Bhopal<br/>10, Neelam Colony, zabait lane, near lily talkies, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 2576466 ,Fax: 07552766566, Email: tatparbloodbank@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 10:40:46",
        "Blood Bank"
    ],
    [
        "4",
        "Jawahar Lal Nehru Cancer Hospital & Research Centre, Bhopal<br/>Idgah Hills, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 4255682 ,Fax: -, Email: -",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 09:46:34",
        "Blood Bank"
    ],
    [
        "5",
        "City Blood Centre Of Bhojpal Charitable Trust, Bhopal<br/>Bajaj Complex Opposite Sindhi Gurudwara, Jehangirabad, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 7415570335 ,Fax: -, Email: priyansh31r@gmail.com",
        "Charitable/Vol",
        "<p class='text-success'>Available, A+Ve:3, O+Ve:7, B-Ve:1, B+Ve:8, AB+Ve:1</p>",
        "2022-11-24 09:25:50",
        "Blood Bank"
    ],
    [
        "6",
        "Indira Gandhi Mahila Evam Balya Chikitsalaya, Bhopal<br/>Indira Gandhi Hospital Gas Rahat Bhopal, Near Sultania Zanana Hospital, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: Mob:9893426253, 9826118869, 0755–2713100 ,Fax: -, Email: -",
        "Govt.",
        "<p class='text-success'>Available, A+Ve:1</p>",
        "2022-11-24 09:23:08",
        "Blood Bank"
    ],
    [
        "7",
        "Vision Blood Centre Bhopal<br/>Inflo Social Organization Society, Bhopal at C-6, 3rd floor, Vidya Nagar, Infront of Bagsewaniya Thana, Hoshangabad Road, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 00 ,Fax: -, Email: -",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 09:11:15",
        "Blood Bank"
    ],
    [
        "8",
        "All India Institute Of Medical Sciences. Aiims Bhopal<br/>Saket Nagar, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 9893156250 ,Fax: -, Email: head.patho@aiimsbhopal.edu.in",
        "Govt.",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-23 14:13:17",
        "Blood Bank"
    ],
    [
        "9",
        "Chirayu Medical College And Hospital, Bhopal<br/>Bhainsakhedi, Bairagarh, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 6679000, 0755 6679101, 0755 6679102 ,Fax: 0755-6679132, Email: bloodbank@cmchbhopal.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-23 11:13:31",
        "Blood Bank"
    ],
    [
        "10",
        "J P Hospital, Tulsi Nagar, Bhopal <br/>1250, Tulsi Nagar, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: Mob: 9827056443, 0755–2556812  Extn.337 ,Fax: -, Email: -",
        "Govt.",
        "<p class='text-success'>Available, AB+Ve:6, B+Ve:2, O+Ve:6, A+Ve:11</p>",
        "2022-11-23 10:49:48",
        "Blood Bank"
    ],
    [
        "11",
        "People Hospital Blood Centre, Bhopal<br/>Bhanpura Bhopal, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 4005227, 0755 4005200 ,Fax: -, Email: -",
        "Charitable/Vol",
        "<p class='text-success'>Available, B+Ve:2, AB-Ve:1, O+Ve:1</p>",
        "2022-11-23 10:15:01",
        "Blood Bank"
    ],
    [
        "12",
        "J.K. Hospital And Medical Research Centre, Bhopal<br/>J.K. Town, Kolar Road, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 7554087069, 9425649059 ,Fax: -, Email: drvivekkhare@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-21 10:47:48",
        "Blood Bank"
    ],
    [
        "13",
        "Avanti Bai Blood Centre <br/>37 A SECTOR INDRAPURI INFRONT OF BHEL GATE NO 1 , RAISEN ROAD BHOPAL, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 8959333001 ,Fax: -, Email: Avantibaibloodcentre@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-20 14:01:33",
        "Blood Bank"
    ],
    [
        "14",
        "Sewa Blood Centre & Component Centre, 10, <br/>San Kanwar Colony, Near D.I.G. Bunglow Square, Berasia Road,, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 9993421721 ,Fax: -, Email: sewabloodbankbhopal@gmail.com",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-18 11:01:49",
        "Blood Bank"
    ],
    [
        "15",
        "Noble Blood Centre & Component Centre<br/>Plot No. 269/1, Opp. Misrod Police Station Misrod, Bhopal, Bhopal, Madhya Pradesh<br/>Phone:  0755-2985786, 0755-7110711 , 9098185214 ,Fax: -, Email: bloodbank@noblebhopal.com",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-13 11:20:30",
        "Blood Bank"
    ],
    [
        "16",
        "Bansal Hospital Redefining Health Care, A Unit Of Ayushman Medical Diagnostic Private Limited,Bhopal<br/>C-Sector, Shahpura, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 7086000, 0755 4086099 ,Fax: -, Email: -",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-09 14:08:21",
        "Blood Bank"
    ],
    [
        "17",
        "Chirayu Health And Medicare, Bhopal<br/>Malipura, Bhopal, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 2737401-03 ,Fax: -, Email: -",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-09 10:46:04",
        "Blood Bank"
    ],
    [
        "18",
        "VED HI TECH CHARITABLE BLOOD CENTRE<br/>1st AND 2nd FLOOR E-3/116, ARERA COLONY, BHOPAL, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 9827432007 ,Fax: -, Email: VEDHITECHCHARITABLEBLOODBANK@GMAIL.COM",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-10-22 10:25:33",
        "Blood Bank"
    ],
    [
        "19",
        "Gandhi Medical College, Hamidia Hospital, Bhopal<br/>Royal Market, Hamidia Road, Peer Gate, Medical College Campus, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 9425010647, 9826449849, 0755 – 4050148 ,Fax: -, Email: bbhhbpl@gmail.com",
        "Govt.",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-09-23 14:11:59",
        "Blood Bank"
    ],
    [
        "20",
        "Life Saver Blood Centre<br/>Diabetologist  Society, Bhopal at  E-3/75, second floor, Arera Colony, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 9926526010 ,Fax: -, Email: lifesaverbloodcentre@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-09-17 11:36:41",
        "Blood Bank"
    ],
    [
        "21",
        "New Bhopal Blood Centre, Bhopal<br/>E-4/149, Arera Colony, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 3206332, 0755 3206327 ,Fax: -, Email: drarunmaity@gmail.com",
        "Charitable/Vol",
        "<p class='text-success'>Available, O+Ve:18, B+Ve:22, A+Ve:4, AB+Ve:2</p>",
        "2022-09-16 23:56:01",
        "Blood Bank"
    ],
    [
        "22",
        "Arpan Blood Centre, Bhopal<br/>Maiti Chari. Trust 131/6, M.P. Nagar, Kiram Complex, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 4090142 ,Fax: -, Email: -",
        "Charitable/Vol",
        "<p class='text-success'>Available, B+Ve:10, A+Ve:30, O+Ve:5</p>",
        "2022-09-14 12:07:26",
        "Blood Bank"
    ],
    [
        "23",
        "Kasturba Hospital, BHEL<br/>Kasturba Market, BHEL, Opposite Habibganj Station, Habib Gan, Bhopal, Bhopal, Madhya Pradesh<br/>Phone: 0755 2505304, 0755 2506426 ,Fax: -, Email: -",
        "Govt.",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2021-06-07 09:14:12",
        "Blood Bank"
    ],
    [
        "24",
        "Indian Red Cross Society Blood Centre, Bhopal<br/>Shivaji Nagar, Near J.P.Hospital,  <br/>Phone: Mob: 9303132652, 0755 – 2556707/2550441 ,Fax: -, Email: bloodbank.ircs@gmail.com",
        "Red Cross ",
        "<p class='text-danger'><b>Stock</b>Not Available Search for another Component",
        "<img src='../hisglobal/bbpublic/images/transparent/live_stock.png'>",
        "Blood Bank"
    ]
]

const stockIndoreData = [
    [
        "1",
        "Indian Red Cross Society Blood Centre, Indore<br/>Chhawani Haat Maidan, Near Agarwal Kanya Vidhyalaya, Indore, Indore, Madhya Pradesh<br/>Phone: 0731-4933101 ,Fax: -, Email: indianredcrosssociety@gmail.com",
        "Red Cross ",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-25 04:42:43",
        "Blood Bank"
    ],
    [
        "2",
        "Choitram Hospital & Research Centre, Indore<br/>Manik Bagh Road,, Indore, Indore, Madhya Pradesh<br/>Phone: 0731 2362491, 0731 2362499, 9753222462 ,Fax: 0731 2470068 , 0731 , Email: -",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 11:13:46",
        "Blood Bank"
    ],
    [
        "3",
        "M/S Modern Institute  of Medical Science  and Sewakunj Hospital & Research Centre blood bank<br/>Sewa Kunj Hospital & Research Centre, Gram Kanadiya, Indore(M.P.), Indore, Indore, Madhya Pradesh<br/>Phone: 9617308076 ,Fax: -, Email: chouhan@rediffmail.com",
        "Charitable/Vol",
        "<p class='text-success'>Available, A+Ve:1, A-Ve:1, AB+Ve:2, O+Ve:2, B+Ve:2</p>",
        "2022-11-24 10:43:56",
        "Blood Bank"
    ],
    [
        "4",
        "Jupiter Hospital Projects Pvt. Ltd. Blood Centre<br/>Basement-1, Scheme No. 94, Sector-1, Ring Road, Near Teen Imli Square, Indore, Indore, Madhya Pradesh<br/>Phone: 0731 3505137, 0731 3505111, 9826036424 ,Fax: 0731 2499330, Email: bloodbank.indore@jupiterhospital.com",
        "Private",
        "<p class='text-success'>Available, B+Ve:1, A+Ve:2, O+Ve:2</p>",
        "2022-11-24 10:29:15",
        "Blood Bank"
    ],
    [
        "5",
        "Aurobindo Blood Centre Saims Hospital, Indore<br/>Indore-Ujjain Road , Indore, Indore, Madhya Pradesh<br/>Phone: 0731 4231000, 0731 4231259 ,Fax: 0731 4231010, Email: -",
        "Charitable/Vol",
        "<p class='text-success'>Available, O-Ve:1, B-Ve:1</p>",
        "2022-11-24 10:21:46",
        "Blood Bank"
    ],
    [
        "6",
        "Lahoti Medicare Pvt. Ltd., Indore<br/>4/5 Old Palasia, Ravindra Nagar,, Indore, Indore, Madhya Pradesh<br/>Phone: 0731 2490577 ,Fax: -, Email: -",
        "Charitable/Vol",
        "<p class='text-success'>Available, B+Ve:1</p>",
        "2022-11-24 10:21:46",
        "Blood Bank"
    ],
    [
        "7",
        "Suyash Blood Centre, Indore<br/>Opp. M.G.M. Medical College, A.B.Road,, Indore, Indore, Madhya Pradesh<br/>Phone: 0731 2493911, 0731 2493912, 0731 2493913 ,Fax: -, Email: -",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 10:16:55",
        "Blood Bank"
    ],
    [
        "8",
        "CHL Charitable Trust Blood Center, Indore<br/>A B Road, Indore, Indore, Madhya Pradesh<br/>Phone: 9827634345 ,Fax: 07312445544, Email: pathology@chlhospitals.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-24 10:06:44",
        "Blood Bank"
    ],
    [
        "9",
        "Modern Blood Centre, Indore <br/>160 Dreamland Theatre Annex.,  Mhow, , MHOW, Indore, Madhya Pradesh<br/>Phone: 07312438138 ,Fax: 9826064696, Email: modernpathmhow@yahoo.co.in",
        "Private",
        "<p class='text-success'>Available, B-Ve:2, AB-Ve:1</p>",
        "2022-11-24 09:31:50",
        "Blood Bank"
    ],
    [
        "10",
        "Shri Indore Cloth Market Hospital, Indore<br/>MOG Lines, Dhar Road, Indore, Indore, Madhya Pradesh<br/>Phone: 8770940465,07312439223, 0731 2439200 ,Fax: -, Email: icmhospital@yahoo.com",
        "Charitable/Vol",
        "<p class='text-success'>Available, AB+Ve:2, A+Ve:1, O+Ve:3</p>",
        "2022-11-24 09:24:13",
        "Blood Bank"
    ],
    [
        "11",
        "Mohit Blood Centre Services, Indore<br/>21-22, Ground Floor Sch.No.54, Opp. Meghdoot Garden, Indore, Indore, Madhya Pradesh<br/>Phone: 9669624576 ,Fax: 0731 2552554, Email: bhrc@email.com",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-23 18:51:36",
        "Blood Bank"
    ],
    [
        "12",
        "DNS Blood Centre Indore<br/>Anoop nagar AB Road Indore, Indore, Indore, Madhya Pradesh<br/>Phone: 9329560044 ,Fax: -, Email: -",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-23 11:53:20",
        "Blood Bank"
    ],
    [
        "13",
        "Shubham Pathological Diagnostic Centre and Blood Centre<br/>51, shree nagar ext., Khajrana road near SNS hospital indore M.P., Indore, Indore, Madhya Pradesh<br/>Phone: 9827333573 ,Fax: -, Email: Shubhambloodbank21@gmail.com",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-23 07:41:55",
        "Blood Bank"
    ],
    [
        "14",
        "Greater Kailash Hospitals Pvt Ltd., Indore<br/>11/A, Old Palasia, , Indore, Indore, Madhya Pradesh<br/>Phone: 0731 6633333,  0731 4051160, 0731 249116 ,Fax: -, Email: -",
        "Private",
        "<p class='text-success'>Available, A+Ve:1</p>",
        "2022-11-22 10:58:25",
        "Blood Bank"
    ],
    [
        "15",
        "Bombay Hospital Trust, Indore<br/>Eastern Ring Rd, IDA Scheme No.94/95, Tulsi Nagar, , Indore, Indore, Madhya Pradesh<br/>Phone: 0731 2558866 ,Fax: -, Email: atharvasharma15@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-21 11:02:25",
        "Blood Bank"
    ],
    [
        "16",
        "Gokuldas Hospital Blood Centre Sarju Bai Charitable Trust, Indore<br/>11, Sarju Prasad Marg,, Indore, Indore, Madhya Pradesh<br/>Phone: 0731 2519212, 09826077557 ,Fax: -, Email: gokuldaspathology@gmail.com",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-11-03 16:20:10",
        "Blood Bank"
    ],
    [
        "17",
        "State Of Art Model Blood Centre Mgm Medical College, M Y Hospital, Indore<br/> M.Y.Hospital Lg-9, Cross Road Scheme 54 CRP Line Indore, Madhya Pradesh 452010, Indore, Indore, Madhya Pradesh<br/>Phone: 0731-2438138 , 07312528301 ,Fax: -, Email: modelbloodbankmyh@gmail.com",
        "Govt.",
        "<p class='text-success'>Available, O-Ve:6, B+Ve:10, A-Ve:1, AB+Ve:2, A+Ve:6, B-Ve:4, O+Ve:12</p>",
        "2022-10-29 15:10:28",
        "Blood Bank"
    ],
    [
        "18",
        "Index Medical College Hospital And Research Centre Run By Mayank Welfare Society, Indore<br/>104, Trishul Apartment, 5, Sanghi Colony, Opp. Amaltas Hotel, , Indore, Indore, Madhya Pradesh<br/>Phone: 0731 4215757,  09752538454 ,Fax: 0731 4044715, Email: -",
        "Charitable/Vol",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-10-14 09:51:04",
        "Blood Bank"
    ],
    [
        "19",
        "Sanghvi Blood Centre, Indore<br/>1st Floor,Manas Bhavan, RNT Marg,, Indore, Indore, Madhya Pradesh<br/>Phone: 0731 2527081, 0731 4208761 ,Fax: -, Email: -",
        "Private",
        "<p class='text-danger'><b>Whole Blood</b>Not Available Search for another Component",
        "2022-09-16 10:01:14",
        "Blood Bank"
    ]
]

module.exports = { stockBhopalData, stockIndoreData }