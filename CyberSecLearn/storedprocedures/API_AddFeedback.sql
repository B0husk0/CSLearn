CREATE PROCEDURE API_AddFeedback
    @Rating INT,
    @Category NVARCHAR(50),
    @Message NVARCHAR(MAX),
    @Recommend BIT
AS
BEGIN
    INSERT INTO Feedback (Rating, Category, Message, Recommend)
    VALUES (@Rating, @Category, @Message, @Recommend);

    SELECT SCOPE_IDENTITY() AS FeedbackId; -- Return the generated ID
END;
