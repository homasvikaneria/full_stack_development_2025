<!-- 00.mongodb_assignment/readme_answers.md -->
# MongoDB Assignment Workbook

---

## Section A. CRUD Basics (40 Queries)

1. Insert a new company document for "Tesla" in Bangalore with base = 29 LPA.

    **Query** :
    ```javascript
    db.companies.insertOne({
    name: "Tesla",
    location: "Bangalore",
    salaryBand: { base: 29, bonus: 4, stock: 6 },
    hiringCriteria: { cgpa: 7.0, skills: ["DSA", "Python", "Distributed Systems"], experience: "1-2 years" },
    interviewRounds: [
        { round: 1, type: "OA" },
        { round: 2, type: "Technical" },
        { round: 3, type: "HR" }
    ],
    benefits: ["Relocation", "WFH"],
    headcount: 800
    })
    ```

    **Response** : 

    ```javascript
    {
    acknowledged: true,
    insertedId: ObjectId('68b6d9655558df3303b6fcd2')
    }
    ```

2. Insert multiple new companies at once (add "Stripe" and "Coinbase").
   
    **Query** :

    ```javascript
    db.companies.insertMany([
    { name: "Stripe", location: "Bangalore", base: "32 LPA" },
    { name: "Coinbase", location: "Bangalore", base: "30 LPA" }
    ])
    ```

    **Response** :
    {
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('68b8363eaeda33889fc48d69'),
    '1': ObjectId('68b8363eaeda33889fc48d6a')
  }
}
    
3. Find all companies.
   
    **Query** :
    ```javascript
    db.companies.find();
    ```

    **Response** :
    {
  _id: ObjectId('68b6d9655558df3303b6fcd2'),
  name: 'Tesla',
  location: 'Bangalore',
  salaryBand: {
    base: 29,
    bonus: 4,
    stock: 6
  },
  hiringCriteria: {
    cgpa: 7,
    skills: [
      'DSA',
      'Python',
      'Distributed Systems'
    ],
    experience: '1-2 years'
  },
  interviewRounds: [
    {
      round: 1,
      type: 'OA'
    },
    {
      round: 2,
      type: 'Technical'
    },
    {
      round: 3,
      type: 'HR'
    }
  ],
  benefits: [
    'Relocation',
    'WFH'
  ],
  headcount: 800
}

    
4. Find one company (`findOne()`) in Bangalore.
   
    **Query** :
    ```javascript
    db.companies.findOne({ location: "Bangalore" })
    ```

{
  _id: ObjectId('68b6cccb5558df3303b6fcbf'),
  name: 'Google',
  location: 'Bangalore',
  salaryBand: {
    base: 30,
    bonus: 5,
    stock: 10
  },
  hiringCriteria: {
    cgpa: 7.5,
    skills: [
      'DSA',
      'System Design',
      'Java',
      'Python'
    ],
    experience: '0-2 years'
  },
  interviewRounds: [
    {
      round: 1,
      type: 'Online Assessment'
    },
    {
      round: 2,
      type: 'Technical Interview'
    },
    {
      round: 3,
      type: 'Managerial Interview'
    },
    {
      round: 4,
      type: 'HR Round'
    }
  ],
  benefits: [
    'Relocation',
    'WFH',
    'Health Insurance'
  ],
  headcount: 2000
}

5. Find companies offering base > 30 LPA.
   
    **Query** :
    ```javascript
    db.companies.find({ "salaryBand.base": { $gt: 30 } })
    ```

    {
  _id: ObjectId('68b6cccb5558df3303b6fcc3'),
  name: 'Apple',
  location: 'Hyderabad',
  salaryBand: {
    base: 33,
    bonus: 4,
    stock: 18
  },
  hiringCriteria: {
    cgpa: 8,
    skills: [
      'C++',
      'OS',
      'DSA'
    ],
    experience: '1-3 years'
  },
  interviewRounds: [
    {
      round: 1,
      type: 'OA'
    },
    {
      round: 2,
      type: 'Technical'
    },
    {
      round: 3,
      type: 'System Design'
    },
    {
      round: 4,
      type: 'HR'
    }
  ],
  benefits: [
    'Relocation',
    'Device Discounts',
    'Free Snaks'
  ],
  headcount: 2500
}

6. Find companies in Hyderabad.
      
    **Query** :

    ```javascript
    db.companies.find({ location: "Hyderabad" })
    ```
   
{
  _id: ObjectId('68b6cccb5558df3303b6fcc6'),
  name: 'Salesforce',
  location: 'Hyderabad',
  salaryBand: {
    base: 29,
    bonus: 4,
    stock: 9
  },
  hiringCriteria: {
    cgpa: 7.5,
    skills: [
      'Java',
      'DSA',
      'Cloud'
    ],
    experience: '1-2 years'
  },
  interviewRounds: [
    {
      round: 1,
      type: 'OA'
    },
    {
      round: 2,
      type: 'Technical'
    },
    {
      round: 3,
      type: 'Managerial'
    },
    {
      round: 4,
      type: 'HR'
    }
  ],
  benefits: [
    'Stock Options',
    'Free Meals',
    'Free Snaks'
  ],
  headcount: 2200
}
   
7. Find companies requiring CGPA >= 8.0.
   

    **Query** :

    ```javascript
    db.companies.find({ "hiringCriteria.cgpa": { $gte: 8.0 } })
    ```

    **Response** :
    
8.  Find companies that list "System Design" in skills.
    **Query** :

    ```javascript
    db.companies.find({ "hiringCriteria.skills": "System Design" })
    ```
   

    **Response** :
    
9.  Find companies that offer "Relocation".
    
    **Query** :

    ```javascript
    db.companies.find({ benefits: "Relocation" })
    ``` 

    **Response** :
    
10. Find companies with stock >= 15 LPA.
    
    **Query** :
    ```javascript
    db.companies.find({ "salaryBand.stock": { $gte: 15 } })
        db.companies.deleteMany({"salaryBand.base":{$lt:10}})

    ```
    
11. Find companies with at least 4 interview rounds.
        
    **Query** :
    ```javascript
    db.companies.find({ "interviewRounds.3": { $exists: true } })
    ```

    
12. Find companies with headcount > 5000.
        
    **Query** :
    ```javascript
    db.companies.find({ headcount: { $gt: 5000 } })
    ```

13. Insert a company with only `name` and `location`.
        
    **Query** :
    ```javascript
    db.companies.insertOne({ name: "Freshworks", location: "Chennai" })
    ```

{
  acknowledged: true,
  insertedId: ObjectId('68b836cbaeda33889fc48d6b')
}
    
14. Update Amazon’s bonus to 6.
        
    **Query** :
    ```javascript
    db.companies.updateOne(
      { name: "Amazon" },
      { $set: { "salaryBand.bonus": 6 } }
    )
    ```


  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
    
15. Update all companies in Hyderabad to add benefit = "Free Snacks".
    
    **Query** :
    ```javascript
    db.companies.updateMany(
      { location: "Hyderabad" },
      { $addToSet: { benefits: "Free Snacks" } }
    )
    ```

    
16. Add skill "Python" to Google’s criteria.
        
    **Query** :
    ```javascript
    db.companies.updateOne(
      { name: "Google" },
      { $addToSet: { "hiringCriteria.skills": "Python" } }
    )
    ```

    
17. Remove "Gym" from Microsoft benefits.
        
    **Query** :
    ```javascript
    db.companies.updateOne(
      { name: "Microsoft" },
      { $pull: { benefits: "Gym" } }
    )
    ```

    
18. Replace entire salaryBand for Netflix.
        
    **Query** :
    ```javascript
    db.companies.updateOne(
      { name: "Netflix" },
      { $set: { salaryBand: { base: 40, bonus: 8, stock: 20 } } }
    )
    ```

    
19. Delete company "Infosys".
        
    **Query** :
    ```javascript
    db.companies.deleteOne({ name: "Infosys" })
    ```

    
20. Delete all companies with base < 10.
        
    **Query** :
    db.companies.deleteMany({"salaryBand.base":{$lt:10}})

    {
  acknowledged: true,
  deletedCount: 1
}

    
21. Use `$set` to add a new field `isTopTier: true` for Google.
        
    **Query** :
    db.companies.updateOne(
  { name: "Google" },
  { $set: { isTopTier: true } }
)


    {
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

    
22. Use `$inc` to increase Amazon’s stock by 2.
        
    **Query** :
db.companies.updateOne({name:"Amazon"},
                       {$inc:{"salaryBand.stock":2}})

    {
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
23. Use `$rename` to rename field `headcount` → `employeeCount`.
        
    **Query** :
    db.companies.updateMany(
  {},
  { $rename: { headcount: "employeeCount" } }
)

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 22,
  modifiedCount: 18,
  upsertedCount: 0
}

    
24. Use `$unset` to remove "bonus" from salaryBand.
        
    **Query** :
    db.companies.updateMany(
  {},
  { $unset: { "salaryBand.bonus": "" } }
)


{
  acknowledged: true,
  insertedId: null,
  matchedCount: 22,
  modifiedCount: 18,
  upsertedCount: 0
}
    
25. Insert 5 dummy companies with minimal fields.
        
    **Query** : db.companies.insertMany([
      {name:"Dummy1"},
      {name:"Dummy2"},
      {name:"Dummy3"},
      {name:"Dummy4"},
      {name:"Dummy5"},
    ])

    {
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('68b8dd19fca54e3df93b3b87'),
    '1': ObjectId('68b8dd19fca54e3df93b3b88'),
    '2': ObjectId('68b8dd19fca54e3df93b3b89'),
    '3': ObjectId('68b8dd19fca54e3df93b3b8a'),
    '4': ObjectId('68b8dd19fca54e3df93b3b8b')
  }
}

26. Delete all dummy companies.
        
    **Query** :

    db.companies.deleteMany({
  name:{$in:["Dummy1,Dummy2,Dummy3,Dummy4,Dummy5"]}
})

    {
  acknowledged: true,
  deletedCount: 0
}

    
27. Find all companies, project only `name` and `salaryBand`.
        
    **Query** :
    db.companies.find({},{name:1,salaryBand:1})

    
    {
  _id: ObjectId('68b6cccb5558df3303b6fccf'),
  name: 'Paytm'
}

{
  _id: ObjectId('68b6cccb5558df3303b6fccf'),
  name: 'Paytm'
}
    
28. Find all companies, exclude `_id`.
    
    **Query** :

    db.companies.find({},{_id:0});

    {
  name: 'Paytm',
  location: 'Noida',
  hiringCriteria: {
    cgpa: 6.5,
    skills: [
      'DSA',
      'JavaScript'
    ],
    experience: '0-2 years'
  },
  interviewRounds: [
    {
      round: 1,
      type: 'OA'
    },
    {
      round: 2,
      type: 'Technical'
    },
    {
      round: 3,
      type: 'HR'
    }
  ],
  benefits: [
    'Health Insurance',
    'Free Lunch'
  ],
  employeeCount: 2500
}

    
29.  Find only `name` and `benefits` for Microsoft.
    
    **Query** :
    db.companies.find({name:"Microsoft"},{name:1,benefits:1,_id:0})

    
30.  Count all companies in Bangalore.
    
    **Query** :
    db.companies.countDocuments({location:"Bangalore})
    12
    
31.  Count all companies requiring CGPA >= 7.0.
    
    **Query** :
    db.companies.countDocuments({ "hiringCriteria.cgpa": { $gte: 7.0 } })

    15

    
32.  Get distinct locations.
    
    **Query** :
    db.companies.distinct(""location)
  [ 'Bangalore', 'Chennai', 'Gurgaon', 'Hyderabad', 'Mumbai', 'Noida' ]
    
33.  Get distinct benefits offered.
    
    **Query** :
    db.companies.distinct("benefits")

[  'Device Discounts',
  'Free Food',
  'Free Lunch',
  'Free Meals',
  'Free Snaks',
  'Free Streaming',
  'Health Insurance',
  'Relocation',
  'Stock Options',
  'WFH'
]

    
34.  Check if any company offers stock = 20.
    
    **Query** :
    db.companies.findOne({salaryBand.stock":2})
    null

    
35.  Insert company with nested object `{ perks: { transport: true } }`.
    
    **Query** :
    db.companies.insertOne({
        name: "PerkCorp",
  location: "Chennai",
  perks: { transport: true }
    })

    {
  acknowledged: true,
  insertedId: ObjectId('68b8e9acfca54e3df93b3b8c')
}

36.  Push new round `{ round: 5, type: "CTO Interview" }` to Meta.
    
    
    **Query** :

        db.companies.updateOne(
  { name: "Meta" },
  { $push: { interviewRounds: { round: 5, type: "CTO Interview" } } }
)


    {
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}



    
37.  Pull "HR" round out of Amazon’s rounds.
    
    **Query** : 
    db.companies.updateOne(
  { name: "Amazon" },
  { $pull: { interviewRounds: { type: "HR" } } }
)

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

38. Add "Health Insurance" only if not present in Swiggy benefits.
    
    **Query** : 
    db.companies.updateOne(
  { name: "Swiggy" },
  { $addToSet: { benefits: "Health Insurance" } }
)


    {
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

39. Increase base salary by 2 for all companies in Bangalore.
    
    **Query** :
    db.companies.updateMany(
      {location:"Bangalore"},
      {$inc:{"salaryBand.base":2}}
    )

    {
    acknowledged: true,
    insertedId: null,
    matchedCount: 12,
    modifiedCount: 12,
    upsertedCount: 0
    }
    
40. Delete all companies in "Delhi" (if any exist).
        
    **Query** :
    ```javascript
    db.companies.deleteMany({ location: "Delhi" })
    ```

---

## Section B. Advanced Queries (60 Queries)

41. Find companies with base between 25–35.
    db.companies.find({"salaryBand.base": { $gte: 25, $lte: 35 }})

42. Find companies where stock < 10.
    db.companies.find({ "salaryBand.stock": { $lt: 10 } })    

43. Find companies with bonus > 5 AND stock > 10.
    db.companies.find({ "salaryBand.bonus": { $gt: 5 }, "salaryBand.stock": { $gt: 10 } })

44. Find companies with base >= 30 OR stock >= 12.
    db.companies.find({ $or: [ { "salaryBand.base": { $gte: 30 } }, { "salaryBand.stock": { $gte: 12 } } ] })

45. Find companies NOT requiring "OS".
    db.companies.find({ "hiringCriteria.skills": { $ne: "OS" } })
    
46. Find companies requiring at least one skill from \["Java", "C++"].
    db.companies.find({ "hiringCriteria.skills": { $in: ["Java","C++"] } })

47. Find companies requiring BOTH "DSA" and "System Design".
    db.companies.find({"hiringCriteria.skills": { $all: ["DSA","System Design"] } })

48. Find companies not offering WFH.
    db.companies.find({ "benefits": { $ne: "WFH" } })

49. Find companies with > 3 benefits.
    db.companies.find({ benefits: { $exists: true }, $where: "this.benefits.length > 3" })
50. Find companies with exactly 4 interview rounds.
    db.companies.find({ "interviewRounds": { $size: 4 } })

51. Find companies where employeeCount > 2000.
    
52. Find companies offering salaries in multiples of 5.
53. Find companies where CGPA is in \[6.5, 7.0, 7.5].
54. Find companies not in Bangalore.
55. Use regex to find skills ending in "Design".
56. Use regex to find companies starting with "A".
57. Case-insensitive search for "amazon".
58. Find companies where `salaryBand.stock` exists.
59. Find companies where `perks` does NOT exist.
60. Find companies where `salaryBand.base` is of type number.
61. Sort companies by base ascending.
62. Sort companies by base descending.
63. Sort by bonus, then stock.
64. Limit results to top 5 highest base salary.
65. Skip first 5 and return next 5.
66. Find company with maximum base salary.
67. Find company with minimum CGPA requirement.
68. Return first 3 companies alphabetically by name.
69. Find companies with at least one "Technical" interview round.
70. Find companies where round 2 is "System Design".
71. Find companies where interviewRounds length > 3.
72. Find companies where second benefit = "WFH".
73. Use `$all` to find companies requiring \["DSA", "Java"].
74. Use `$elemMatch` for base > 25 and stock > 5 in salaryBand.
75. Use `$in` for location in \["Hyderabad", "Bangalore"].
76. Use `$nin` for location not in \["Mumbai", "Pune"].
77. Find company closest to base = 30.
78. Use `$not` to exclude base < 20.
79. Use `$expr` to find companies where bonus < base/10.
80. Use `$size` to find companies with exactly 2 benefits.
81. Project new field `totalComp = base+bonus+stock`.
82. Find companies where totalComp > 45.
83. Sort companies by totalComp descending.
84. Use `$mul` to multiply stock by 2.
85. Use `$max` to ensure bonus >= 5.
86. Use `$min` to cap base salary at 35.
87. Use `$addToSet` to ensure unique benefit "WFH".
88. Use arrayFilters to update only 3rd round = "Tech Screen".
89. Update multiple docs with `$currentDate` for `lastUpdated`.
90. Delete companies without benefits field.
91. Upsert: Update "Tesla" if exists, insert if not.
92. Find all companies but exclude "salaryBand".
93. Project only name and computed field `doubleStock = stock*2`.
94. Match companies whose name length = 6 using `$expr`.
95. Query with `$mod`: base % 2 = 0.
96. Query with `$where`: headcount > 2000.
97. Query using `$text` after creating text index on `skills`.
98. Use collation for case-insensitive sort by name.
99.  Query with `$type: "array"` on benefits.
100. Find companies where "Free Meals" is one of the benefits.

---

