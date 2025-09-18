public class AddBearerMiddleware
{
    private readonly RequestDelegate _next;

    public AddBearerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        if (context.Request.Headers.TryGetValue("Authorization", out var authHeader))
        {
            var token = authHeader.ToString();
            if (!string.IsNullOrEmpty(token) && !token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                // Prepend "Bearer " to the token
                context.Request.Headers["Authorization"] = $"Bearer {token}";
            }
        }

        await _next(context);
    }
}
