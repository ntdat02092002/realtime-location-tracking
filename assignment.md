# Data Engineering (CO5173)
**Assoc. Prof. Dr. Võ Thị Ngọc Châu** (chauvtn@hcmut.edu.vn)  
**Semester 2 - 2025-2026**

This is to provide you with the descriptions of Presentation and Project along with their assessment schemes.

## 1. Objectives
Presentation and Project aim at the knowledge and skills expected in course learning outcomes. They help the learners self-study and work in group on data engineering-related topics. They also enable the learners to develop an application that can reflect the effectiveness of data engineering results, support the learners to improve presentation skills.

## 2. Detailed Description

### 2.1. Application domain
The learners are asked to **select one application domain** for their group which is expected to be unique in the scope of our course. Some typical domains that can be taken into account are education, healthcare, manufacturing, marketing, e-commerce, tourism industry, science, transportation, supply chain management, entertainment, etc. These domains are introduced because it is easy to approach the domain for **business processes and datasets**.

With the selected domain, the learners are asked to **identify the potential key user groups** that the learners would like to support. After that, the learners are asked to **determine the business requirements that need data prepared by data engineering**. Such business requirements are related to data analysis, data science, data mining, business intelligence systems, decision support systems, and so on.

### 2.2. Topic: Build an application that utilizes the data prepared by data engineering in a specific application domain
The topic requires the learners to do data engineering in such a way that the resulting data can be utilized specifically for users in an application domain.

There are three main parts of the product of the topic:
1. Business and related data in an application domain
2. Data engineering for the business requirements
3. Application development to bring the results to the real world

In the scope of the course, data management and processing aspects are focused. Therefore, each group needs to clarify and work with several technologies selected for data management and processing. Several technology choices are listed as follows:
* **Data management:** Redshift, Hive, Synapse Analytics, Cassandra, BigQuery (BigLake), CouchBase, Databricks, Neo4J, RavenDB, Dynamo, Oracle data lakehouse, …
* **Data processing:** Flink, Spark Streaming, Hadoop Map-Reduce, Storm, Kafka Stream, …

For each group, at least **2 * n** business requirements must be defined to utilize the data from data engineering where **n** is the number of members. The business requirements need to show the support for the business objectives of the enterprise in the application domain uniquely selected by each group.

Each group also needs to provide the rationales behind the data engineering’s support for those requirements and evaluate the selected technologies in the solution for the application. Alternative solutions might be considered for benchmarking the selected technologies from the different perspectives, especially in the Big Data context.

The presentation is then related to the Big Data’s issues and selected technologies, while the project is dedicated to the data engineering solution and application development. Specific requirements for the Presentation and Project of each group are as follows:

**i. Presentation**
* Introduce the context of the topic
* Present the overall system architecture (similar to DBMS architecture) and the distributed data architecture (e.g., NameNode–DataNode in HDFS, primary–secondary in MongoDB, etc.) tentatively for the application
* Present the data management with the selected technologies
* Present data processing support capabilities: application connectivity and supported processing types (transaction, batch, stream, etc.)
* Present representative application contexts (domain, case study, etc.) of the technologies
* Introduce a data engineering solution using the selected technologies for the topic

**ii. Project**
* Introduce the context of the project topic
* Introduce stakeholders (especially users), along with business requirements and data usage needs, in order to shape a data-driven application for the application domain of each group
* Present the expected data sources and data characteristics that should be considered when implementing data engineering
* Present the data engineering solution and introduce at least one alternative solution (for comparison)
* Present the technology for data management, the technology for data processing, and approaches to leveraging these technologies for the application
* Develop the application for the project topic
* Evaluate the data engineering solution and data-driven application based on the following criteria:
  * Data correctness after data engineering is performed
  * Performance of the data engineering solution
  * Effectiveness of supporting data exploitation through the application

### 2.3. Change policy
* **Group changes:** Members of different groups may switch groups after the announcement, following discussion with the instructor. The condition for any change is mutual agreement among members of both original and new groups.
* **Presentation schedule changes:** A group may change the presentation schedule as published in the class timetable. The condition for the change is swapping presentation slots with another group in the new week that the group wishes to move to.

---

## 3. Assessment
All submitted files for assessment need to be named with your group ID.

### 3.1. Presentation
* **Submission:** A **presentation file** in pdf format (10% of the total score) which is used to present the Presentation part of each group in 20 minutes, a **video** in mp4 or webm format (10% of the total score) that is used for the detailed presentation of each group in at most 45 minutes.
* **In-class presentation:** Each group is asked to present your Presentation part in class in 20 minutes (10% of the total score).
* **Due:** 2 days before the first presentation of the Presentation part in our class.

**Criteria for Presentation evaluation:**

| Evaluation Description | 0–<4 points | 4–<6.5 points | 6.5–<8.5 points | 8.5–10 points |
| :--- | :--- | :--- | :--- | :--- |
| **Video content (5/10)** | Does not match the assigned content; consistent with less than 40% of the slides | Matches the assigned content; consistent with 40%–65% of the slides | Matches the assigned content; consistent with 65%–85% of the slides | Matches the assigned content; consistent with 85%–100% of the slides |
| **Video presentation (4/10)** | Presentation is not confident, not coherent, and lacks harmonious coordination | Presentation is confident, coherent, and well-coordinated but has no interaction | Presentation is confident, coherent, and well-coordinated but has limited interaction | Presentation is confident, coherent, well-coordinated, and includes appropriate interaction |
| **Video duration (1/10)** | Shorter or longer than 10 minutes | Shorter or longer by 5–10 minutes | Shorter or longer by 1–5 minutes | Nearly meets the required duration |
| **Slide structure (2/10)** | No clear organization of presentation content | Content is organized but overly detailed (>7 sections) or overly general (<4 sections) | Overall organization is reasonable, but at least two sections are structurally inappropriate in detail | Overall organization and detailed structure of all sections are appropriate |
| **Slide content (6/10)** | Superficial details; no discussion; no illustrative examples | Rich details aligned with assigned content; some discussion but not detailed and/or not well-reasoned; no illustrative examples | Rich details aligned with assigned content; reasonable discussion but not detailed; illustrative examples included but not appropriate | Rich details aligned with assigned content; well-reasoned and detailed discussion; appropriate illustrative examples |
| **Slide presentation format (2/10)** | More than 10 errors in text, color, tables, images, animations, spelling, etc. | 5–10 errors in text, color, tables, images, animations, spelling, etc. | 2–5 errors in text, color, tables, images, animations, spelling, etc. | Nearly no errors in text, color, tables, images, animations, spelling, etc. |
| **In-class presentation style (8/10)** | Not confident or coherent; no interaction with the audience; poor coordination among group members; some members present too little or too much | Confident, coherent, and well-coordinated but no interaction | Confident, coherent, and well-coordinated with limited interaction | Confident, coherent, well-coordinated, and includes appropriate interaction |
| **Time management (2/10)** | More than 5 minutes late or over time | 3–5 minutes late or over time | 1–3 minutes late or over time | Nearly on time |

### 3.2. Project
* **Submission:** A final **technical report** in a pdf file (10% of the total score; but a required one for scoring the Project part).
* **Presentation:** This includes two parts: a presentation file and an oral presentation in class. A **presentation file** is a pdf file (5% of the total score; but a required one for scoring the Project part). This file needs to show the data engineering solution proposed by each group and the application that demonstrates the effectiveness of this solution in a specific application domain. An **oral presentation** (5% of the total score) is completed along with an application demonstration in class in 25 minutes.
* **Product:** A **proof of the application development** (15% of the total score), showing a demonstration of the resulting application that can be executed and evaluated.
* **Due:** 2 days before the first presentation of the Project part in our class.

**Criteria for Project evaluation:**

| Criteria | 0 – <4 points | 4 – <6.5 points | 6.5 – <8.5 points | 8.5 – 10 points |
| :--- | :--- | :--- | :--- | :--- |
| **Report Structure (1/10)** | The report lacks clear organization and logical structure. | The report is organized, but the structure is either overly detailed (more than 7 sections) or overly general (fewer than 4 sections). | The overall structure is reasonable; however, at least two sections have an inappropriate or unclear internal structure. | The report is well organized overall, and all sections have a clear and logical structure. |
| **Technology Content (Assigned Technology) (4/10)** | The report barely presents the assigned technology and provides only a brief introduction. | The technology is presented superficially, with no illustrative examples. | The technology is presented fairly completely for the group’s application, with 1–3 illustrative examples. | The technology is presented thoroughly for the group’s application, with more than 3 illustrative examples. |
| **Application Content (4/10)** | More than 75% of the required topic content is missing. | Between 40% and 75% of the required topic content is missing. | Between 10% and 40% of the required topic content is missing. | Less than 10% of the required topic content is missing. |
| **Evaluation of Technology Usage (1/10)** | No evaluation of technology usage is conducted. | An evaluation is conducted superficially; evaluation criteria are unclear or poorly defined. | A systematic evaluation is conducted; fewer than 85% of the evaluation criteria are clearly defined. | A systematic evaluation is conducted; more than 85% of the evaluation criteria are clearly defined. |
| **In-class Presentation (8/10)** | Presentation lacks confidence and coherence; no audience interaction; poor coordination among group members; some members present too little or too much. | Presentation is confident and coherent with good group coordination, but no audience interaction. | Presentation is confident and coherent with good coordination and limited audience interaction. | Presentation is confident, coherent, well coordinated, and includes appropriate audience interaction. |
| **Time Management (2/10)** | Presentation exceeds or falls short of the allotted time by more than 5 minutes. | Presentation exceeds or falls short of the allotted time by 3–5 minutes. | Presentation exceeds or falls short of the allotted time by 1–3 minutes. | Presentation adheres closely to the allotted time. |
| **User Interface Design (2/10)** | The user interface is not appropriate for the application context. | The interface fits the application context but does not consider user characteristics and lacks harmony in presentation and/or interaction. | The interface fits the application context but either does not consider user characteristics or lacks harmony in presentation and/or interaction. | The interface fits the application context, considers user characteristics, and demonstrates harmonious presentation and interaction. |
| **Application Implementation (8/10)** | *For each successful demonstration of a business requirement and corresponding data exploitation result, the score is calculated as 4/n/10, where n is the number of group members.* | | | |

---

## 4. Bonus
Bonus will be added directly to the final score of Presentation and/or that of Project.
* **Individuals:** Discussions and questions/answers excellent for any presentations.
* **Groups:** More alternative solutions with excellent evaluation results, more interesting business requirements with more user groups, more discussions with research results for the topics.