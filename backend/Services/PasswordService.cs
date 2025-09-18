using Konscious.Security.Cryptography;
using System;
using System.Security.Cryptography;
using System.Text;

public class PasswordService
{
    private const int SaltSize = 16; // 128-bit
    private const int HashSize = 32; // 256-bit
    private const int Iterations = 4; // Recommended number of iterations
    private const int MemorySize = 65536; // Memory size in KB (64 MB)
    private const int Parallelism = 8; // Degree of parallelism

    private readonly string _pepper;

    public PasswordService(string pepper)
    {
        _pepper = pepper ?? throw new ArgumentNullException(nameof(pepper));
    }

    public string HashPassword(string password)
    {
        // Combine password with the pepper
        var pepperedPassword = password + _pepper;

        // Generate a unique salt
        var salt = new byte[SaltSize];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);

        // Hash the peppered password with Argon2
        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(pepperedPassword))
        {
            Salt = salt,
            Iterations = Iterations,
            MemorySize = MemorySize,
            DegreeOfParallelism = Parallelism
        };
        var hash = argon2.GetBytes(HashSize);

        // Combine the salt and hash into a single byte array
        var hashBytes = new byte[SaltSize + HashSize];
        Array.Copy(salt, 0, hashBytes, 0, SaltSize);
        Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

        // Convert to Base64 for storage
        return Convert.ToBase64String(hashBytes);
    }

    public bool VerifyPassword(string password, string storedHash)
    {
        // Decode the stored hash and extract the salt
        var hashBytes = Convert.FromBase64String(storedHash);
        var salt = new byte[SaltSize];
        Array.Copy(hashBytes, 0, salt, 0, SaltSize);

        // Combine the input password with the pepper
        var pepperedPassword = password + _pepper;

        // Rehash the password with the same salt and Argon2 settings
        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(pepperedPassword))
        {
            Salt = salt,
            Iterations = Iterations,
            MemorySize = MemorySize,
            DegreeOfParallelism = Parallelism
        };
        var computedHash = argon2.GetBytes(HashSize);

        // Compare the stored hash with the computed hash
        for (int i = 0; i < HashSize; i++)
        {
            if (hashBytes[i + SaltSize] != computedHash[i])
                return false;
        }

        return true;
    }
}
