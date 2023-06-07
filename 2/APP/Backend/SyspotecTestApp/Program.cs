using Microsoft.EntityFrameworkCore;
using SyspotecTestService.Business.Services;
using SyspotecTestService.Contracts.Services;
using SyspotecTestService.DataService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//Agregando Los Servicios
builder.Services.AddScoped<IUserService, UserService>();

//Agregando Conexi�n Con la DB

var dbConnection = builder.Configuration.GetConnectionString("MySQLDB");

builder.Services.AddDbContext<SyspotecTestMySQLContext>(ops => ops.UseMySql(
        dbConnection,
        ServerVersion.AutoDetect(dbConnection)
    ));


//AutoMappers
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Agregando CORS 
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
