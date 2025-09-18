CREATE TABLE Users (
    UserId INT IDENTITY PRIMARY KEY,             -- Auto-incrementing primary key
    FirstName NVARCHAR(100) NOT NULL,            -- First name for better personalization
    LastName NVARCHAR(100) NOT NULL,             -- Last name for better personalization
    PasswordHash NVARCHAR(255) NOT NULL,         -- Storing hashed passwords
    Email NVARCHAR(255) NOT NULL UNIQUE,         -- Unique email address for login
    CreatedAt DATETIME DEFAULT GETDATE(),        -- Timestamp of account creation
    IsVerified BIT DEFAULT 0,                    -- Indicates if the user has verified their email
    ImageUrl NVARCHAR(1000) NULL,			-- URL to the user's profile image
    IsAdmin BIT DEFAULT 0                        -- Indicates if the user has admin privileges
);
