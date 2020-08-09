CREATE TABLE tasks(
    "id" SERIAL PRIMARY KEY,
    "actionItem" VARCHAR (20) NOT NULL,
    "levelOfImportance" VARCHAR (20) NOT NULL,
    "deadline" VARCHAR (20) NOT NULL,
    "complete" VARCHAR (20) DEFAULT 'NO',
    "additionalNotes" VARCHAR (255)
);