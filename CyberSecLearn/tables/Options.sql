﻿CREATE TABLE Options (
    OptionId INT PRIMARY KEY IDENTITY(1,1),
    QuestionId INT FOREIGN KEY REFERENCES Questions(QuestionId),
    Text NVARCHAR(MAX) NOT NULL
);
