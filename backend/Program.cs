using backend.Enums;
using backend.Interfaces;
using backend.Repositiories;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Load configuration
var configuration = builder.Configuration;

// Get config values with validation
string jwtKey = configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key is missing in the configuration.");

string jwtIssuer = configuration["Jwt:Issuer"]
    ?? throw new InvalidOperationException("JWT issuer is missing in the configuration.");

string jwtAudience = configuration["Jwt:Audience"]
    ?? throw new InvalidOperationException("JWT audience is missing in the configuration.");

string connectionString = configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Database connection string is missing in the configuration.");

string pepper = configuration["Hashing:Pepper"]
    ?? throw new InvalidOperationException("Pepper key is missing from configuration.");

// Configure services
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://cyber-learn-git-main-matus-projects-15b61c40.vercel.app",
                "https://cyber-learn-six.vercel.app")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CyberSecLearn API", Version = "v1" });
    c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
    c.SupportNonNullableReferenceTypes();
    c.UseAllOfToExtendReferenceSchemas();
    c.UseAllOfForInheritance();

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization token. Example: ""<token>"". Don't prefix with Bearer.",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme,
                }
            }, new List<string>()
        }
    });
});

// Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // Prefer cookie over Authorization header
                var token = context.Request.Cookies["auth_token"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }

                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });


// Authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(RolePolicy.Admin, policy =>
        policy.Requirements.Add(new RoleRequirement(RolePolicy.Admin)));
    options.AddPolicy(RolePolicy.Manager, policy =>
        policy.Requirements.Add(new RoleRequirement(RolePolicy.Manager)));
    options.AddPolicy(RolePolicy.BasicUser, policy =>
        policy.Requirements.Add(new RoleRequirement(RolePolicy.BasicUser)));
});
builder.Services.AddScoped<IAuthorizationHandler, RoleRequirementHandler>();


// App services
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IModuleRepository, ModuleRepository>();
builder.Services.AddScoped<IUserProgressRepository, UserProgressRepository>();
builder.Services.AddScoped<IQuizRepository, QuizRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<IUserContext, UserContext>();
builder.Services.AddScoped<IImageStorageService, AzureImageStorageService>();
builder.Services.AddScoped<IDapperProcedureCaller, DapperProcedureCaller>();
builder.Services.AddScoped<IAchievementRepository, AchievementRepository>();
builder.Services.AddScoped<IAchievementService, AchievementService>();
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();


// Shared instances
builder.Services.AddSingleton(new PasswordService(pepper));
builder.Services.AddSingleton(new DatabaseService(connectionString));

// Build the app (only once!)
var app = builder.Build();

// Enable Swagger in development and production
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware


app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<AddBearerMiddleware>();

app.MapControllers();
app.Run();
