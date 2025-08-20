# 📚 Database Management System (DBMS)


---

## 1) What is a Database System?
A **Database Management System (DBMS)** is a software system that is designed
to manage and organize data in a structured manner. It allows users to create,
modify, and query a database, as well as manage the security and access controls
for that database.

**DBMS** provides an environment to store and retrieve the data in coinvent and
efficient manner.

---

## 2) Key Features of DBMS

- **Data modeling**: A DBMS provides tools for creating and modifying
data models, which define the structure and relationships of the data
in a database.
- **Data storage and retrieval**: A DBMS is responsible for storing and
retrieving data from the database and can provide various methods for
searching and querying the data.
- **Concurrency contro**: A DBMS provides mechanisms for controlling
concurrent access to the database, to ensure that multiple users can
access the data without conflicting with each other.
- **Data integrity and security**: A DBMS provides tools for enforcing
data integrity and security constraints, such as constraints on the
values of data and access controls that restrict who can access the data.
- **Backup and recovery**: A DBMS provides mechanisms for backing
up and recovering the data in the event of a system failure.
- **SDBMS can be classified into two types**: Relational Database
Management System (RDBMS) and Non-Relational Database
Management System (NoSQL or Non-SQL).
- **RDBMS**: Data is organized in the form of tables and each table has a
set of rows and columns. The data are related to each other through
primary and foreign keys.
- **NoSQL**: Data is organized in the form of key-value pairs, documents,
graphs, or column-based. These are designed to handle large-scale,
high-performance scenarios.

A database is a collection of interrelated data which helps in the efficient
retrieval, insertion, and deletion of data from the database and organizes the data
in the form of tables, views, schemas, reports, etc. For Example, a university
database organizes the data about students, faculty, admin staff, etc. which helps
in the efficient retrieval, insertion, and deletion of data from it.

---

## 3) View of Data (Data Abstraction)
DBMS hides low-level details via **three levels** (ANSI/SPARC):

1. **External Level (View):** What each user/app sees (customized views).  
   *Example:* A student portal shows *their* grades only.
2. **Conceptual Level (Logical Schema):** Overall organization — entities, attributes, relationships, constraints.  
   *Example:* Tables: `Students`, `Courses`, `Enrollments`.
3. **Internal Level (Physical):** How data is stored — files, indexes, pages, access paths.  
   *Example:* B-Tree indexes on `StudentID`, clustered storage.

**Data Independence:**  
- **Logical independence:** Change tables/relationships without breaking views.  
- **Physical independence:** Change storage details (indexes, file organization) without changing the logical schema.

**Real-life example:**  
An **e-commerce** app adds a `loyalty_points` column (logical change) or a new index (physical change) — customer-facing pages continue to work.

---

## 4) Advantages/Disadvantages of DBMS

### A. Advantages of DBMS
- **Data organization:** A DBMS allows for the organization and storage
of data in a structured manner, making it easy to retrieve and query the
data as needed.
- **Data integrity:** A DBMS provides mechanisms for enforcing data
integrity constraints, such as constraints on the values of data and
access controls that restrict who can access the data.
  *Example:* Product catalogs, content management.
- **Concurrent access:** A DBMS provides mechanisms for controlling
concurrent access to the database, to ensure that multiple users can
access the data without conflicting with each other.
- **Data security:** A DBMS provides tools for managing the security of
the data, such as controlling access to the data and encrypting sensitive
data.
- **Backup and recovery:** A DBMS provides mechanisms for backing
up and recovering the data in the event of a system failure.
- **Data sharing:** A DBMS allows multiple users to access and share the
same data, which can be useful in a collaborative work environment.

### B. Disadvantages of DBMS
- **Complexity:** DBMS can be complex to set up and maintain, requiring
specialized knowledge and skills.
- **Performance overhead:** The use of a DBMS can add overhead to the
performance of an application, especially in cases where high levels
of concurrency are required.
- **Scalability:** : The use of a DBMS can limit the scalability of an
application since it requires the use of locking and other
synchronization mechanisms to ensure data consistency
- **Cost:** The cost of purchasing, maintaining, and upgrading a DBMS
can be high, especially for large or complex systems.
- **Limited Use Cases:** Not all use cases are suitable for a DBMS, some
solutions do not need high reliability, consistency or security and may
be better served by other types of data storage.

These are the main reasons which made a shift from file system to DBMS.
Also, see.
A Database Management System (DBMS) is a software system that allows users
to create, maintain, and manage databases. It is a collection of programs that
enables users to access and manipulate data in a database. A DBMS is used to
store, retrieve, and manipulate data in a way that provides security, privacy, and
reliability.

### C. Several Types of DBMS
- **Relational DBMS (RDBMS):** An RDBMS stores data in tables with
rows and columns and uses SQL (Structured Query Language) to
manipulate the data.
- **Object-Oriented DBMS (OODBMS):** An OODBMS stores data as
objects, which can be manipulated using object-oriented programming
languages.
- **NoSQL DBMS:** A NoSQL DBMS stores data in non-relational data
structures, such as key-value pairs, document-based models, or graph
models.


---

## 5) Database Architecture

A Database stores a lot of critical information to access data quickly and
securely. Hence it is important to select the correct architecture for efficient data
management. DBMS Architecture helps users to get their requests done while
connecting to the database. We choose database architecture depending on
several factors like the size of the database, number of users, and relationships
between the users. There are two types of database models that we generally
use, logical model and physical model. Several types of architecture are there in
the database which we will deal with in the next section.

### Types of DBMS Architecture
There are several types of DBMS Architecture that we use according to the
usage requirements. Types of DBMS Architecture are discussed here.

- **1-Tier Architecture** 
- **2-Tier Architecture** 
- **3-Tier Architecture** 

### **1-Tier Architecture** 
In 1-Tier Architecture the database is directly available to the user, the user can
directly sit on the DBMS and use it that is, the client, server, and Database are
all present on the same machine. For Example: to learn SQL we set up an SQL
server and the database on the local system. This enables us to directly interact
with the relational database and execute operations. The industry won’t use this
architecture they logically go for 2-tier and 3-tier Architecture.
### **Advantages of 1-Tier Architecture**
Below mentioned are the advantages of 1-Tier Architecture.
- **Simple Architecture:** 1-Tier Architecture is the simplest architecture
to set up, as only a single machine is required to maintain it.
- **Cost-Effective:** No additional hardware is required for implementing
1-Tier Architecture, which makes it cost-effective.
- **Easy to Implement:** 1-Tier Architecture can be easily deployed, and
hence it is mostly used in small projects.

### **2-Tier Architecture**

The 2-tier architecture is like a basic client-server model. The application at
the client end directly communicates with the database on the server side.
APIs like ODBC and JDBC are used for this interaction. The server side is
responsible for providing query processing and transaction management
functionalities. On the client side, the user interfaces and application programs
are run. The application on the client side establishes a connection with the
server side to communicate with the DBMS.
An advantage of this type is that maintenance and understanding are easier,
and compatible with existing systems. However, this model gives poor
performance when there are many users

### **Advantages of 2-Tier Architecture**
- **Easy to Access:** 2-Tier Architecture makes easy access to the
database, which makes fast retrieval.
- **Scalable:** We can scale the database easily, by adding clients or
upgrading hardware.
- **Low Cost:** 2-Tier Architecture is cheaper than 3-Tier Architecture
and Multi-Tier Architecture.
- **Easy Deployment:** 2-Tier Architecture is easier to deploy than 3-Tier
Architecture.
- **Simple:** 2-Tier Architecture is easily understandable as well as simple
because of only two components.

### **3-Tier Architecture**
In 3-Tier Architecture, there is another layer between the client and the server.
The client does not directly communicate with the server. Instead, it interacts
with an application server which further communicates with the database system
and then the query processing and transaction management takes place. This
intermediate layer acts as a medium for the exchange of partially processed data
between the server and the client. This type of architecture is used in the case of
large web applications.

### **Advantages of 3-Tier Architecture**
- **Enhanced scalability:** Scalability is enhanced due to the distributed
deployment of application servers. Now, individual connections need
not be made between the client and server.
- **Data Integrity:** 3-Tier Architecture maintains Data Integrity. Since
there is a middle layer between the client and the server, data
corruption can be avoided/removed.
- **Security:** 3-Tier Architecture Improves Security. This type of model
prevents direct interaction of the client with the server thereby
reducing access to unauthorized data.

### **Disadvantages of 3-Tier Architecture**
- **More Complex:** 3-Tier Architecture is more complex in comparison
to 2-Tier Architecture. Communication Points are also doubled in 3-
Tier Architecture.
- **Difficult to Interact:** It becomes difficult for this sort of interaction
to take place due to the presence of middle layers.
---

## 6) Transaction Management
A **transaction** is a unit of work that must follow **ACID**:

- **Atomicity:** All or nothing.  
- **Consistency:** Preserves rules (constraints, invariants).  
- **Isolation:** Concurrent transactions don’t interfere (as if serialized).  
- **Durability:** Once committed, changes survive crashes.

### Transaction States
`Active → Partially Committed → Committed` or `Failed → Aborted` (then possibly retried).

### Concurrency Problems (Anomalies)
- **Dirty Read:** Read uncommitted data.
- **Non-Repeatable Read:** Same row read twice gives different values.
- **Phantom Read:** New rows appear/disappear between reads.

### Isolation Levels (typical SQL)
- **Read Uncommitted:** Allows dirty reads.
- **Read Committed:** Prevents dirty reads.
- **Repeatable Read:** Prevents non-repeatable reads.
- **Serializable:** Prevents phantoms (behaves like serial execution).

### Concurrency Control
- **Locking (2PL):** Shared/Exclusive locks; deadlock detection.
- **MVCC:** Readers don’t block writers; snapshots avoid many locks.
- **Timestamps / OCC:** Order by timestamps or validate at commit.

### Recovery
- **Write-Ahead Logging (WAL):** Log first, then data; supports **UNDO/REDO**.
- **Checkpoints & Backups:** Faster recovery and point-in-time restore.

**Real-life example (Fund Transfer):**  
Debit A by ₹500 and credit B by ₹500 is **one transaction**. Either both happen or none — balances and totals must remain consistent even if a crash occurs mid-way.

---

## 7) Hierarchical Data Model
- **Structure:** **Tree** (one-to-many). Each child has **one parent**.  
- **Navigation:** Via parent–child pointers/paths.  
- **Best for:** Naturally hierarchical data.

**ASCII Sketch:**
```
Company
├── Division A
│   ├── Dept A1
│   └── Dept A2
└── Division B
    └── Dept B1
```

**Example:**  
- **Organization charts**, **file systems**, **product categories** (Electronics → Phones → Android).

**Pros:**
- Simple, fast for hierarchy queries; integrity via strict parent-child rules.

**Cons:**
- Poor for many-to-many; rigid structure; changes ripple widely.

---

## 8) Network Data Model
- **Structure:** **Graph** with **owner–member** sets (many-to-many allowed).  
- **Standard:** CODASYL (older, navigational).  
- **Navigation:** Follow set pointers; procedural access.

**ASCII Sketch (owner→members):**
```
Airline → {Flights}
Flight  → {Crew, Passengers}
```

**Example:**  
**Airline reservation**: A crew member can work many flights; a flight has many crew members (M:N), modeled directly.

**Pros:**
- Efficient for complex relationships; flexible compared to hierarchical.

**Cons:**
- Application tightly coupled to paths; hard to change; complex to query.

---

## 9) Relational Data Model
- **Structure:** Data as **relations (tables)** with **tuples (rows)** and **attributes (columns)**.
- **Keys & Constraints:** Primary key, foreign key, unique, not null, check.
- **Language:** **SQL** for DDL/DML; **relational algebra** under the hood.
- **Normalization:** 1NF, 2NF, 3NF, BCNF reduce redundancy & anomalies.

**Mini Example (University):**
```text
STUDENT(StudentID PK, Name, Email UNIQUE)
COURSE(CourseID PK, Title)
ENROLLMENT(StudentID FK → STUDENT, CourseID FK → COURSE, PRIMARY KEY(StudentID, CourseID), Grade)
```

**Sample SQL:**
```sql
-- Create tables
CREATE TABLE Student(
  StudentID INT PRIMARY KEY,
  Name      VARCHAR(100) NOT NULL,
  Email     VARCHAR(255) UNIQUE
);

CREATE TABLE Course(
  CourseID  VARCHAR(10) PRIMARY KEY,
  Title     VARCHAR(100) NOT NULL
);

CREATE TABLE Enrollment(
  StudentID INT NOT NULL,
  CourseID  VARCHAR(10) NOT NULL,
  Grade     CHAR(2),
  PRIMARY KEY(StudentID, CourseID),
  FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
  FOREIGN KEY (CourseID)  REFERENCES Course(CourseID)
);

-- A typical query (Join)
SELECT s.Name, c.Title, e.Grade
FROM Enrollment e
JOIN Student s ON s.StudentID = e.StudentID
JOIN Course  c ON c.CourseID  = e.CourseID
ORDER BY s.Name, c.Title;
```

**Real-life examples:**  
Bank accounts & transactions, shopping carts & orders, school enrollments.

**Pros:**
- Strong theory; declarative queries; data independence; mature tooling.

**Cons:**
- Joins can be expensive for certain workloads; rigid schema for highly variable data (where NoSQL may fit better).

---

## 10) Quick Comparison of Data Models

| Feature / Model     | Hierarchical            | Network                         | Relational                         |
|---------------------|-------------------------|----------------------------------|------------------------------------|
| Structure           | Tree (1:N)              | Graph (M:N via sets)            | Tables (relations)                 |
| Typical Use         | Org charts, categories  | Reservations, complex links     | OLTP systems, general-purpose      |
| Flexibility         | Low (fixed paths)       | Medium (navigational)           | High (declarative SQL)             |
| Query Language      | Procedural navigation   | Procedural navigation           | SQL (declarative)                  |
| Many-to-Many        | Awkward                 | Natural                         | Natural via junction tables        |
| Ease of Change      | Low                     | Low–Medium                      | High                               |
| Learning Curve      | Low                     | Medium–High                     | Medium                             |

---
