using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class SwaggerAuthOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        // Ensure the operation includes security requirements
        operation.Security ??= new List<OpenApiSecurityRequirement>();

        // Add Bearer Authentication to the operation's security requirement
        var securityScheme = new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        };

        operation.Security.Add(new OpenApiSecurityRequirement
        {
            { securityScheme, new List<string>() }
        });

        // Update the parameter description for the Authorization header (if exists)
        var authParameter = operation.Parameters?.FirstOrDefault(p => p.Name.Equals("Authorization", StringComparison.OrdinalIgnoreCase));
        if (authParameter != null)
        {
            authParameter.Description = "Paste your JWT token here. If 'Bearer ' is not included, it will be added automatically.";
        }
    }
}
