using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Fluffy",
        CityId = 3,
        WalkerId = 5,
    },
    new Dog()
    {
        Id = 2,
        Name = "Sparky",
        CityId = 4,
        WalkerId = 3,
    },
    new Dog()
    {
        Id = 3,
        Name = "Rex",
        CityId= 8,
        WalkerId = 2,
    },
    new Dog()
    {
        Id = 4,
        Name = "Milo",
        CityId = 2,
        WalkerId = 4,
    },
    new Dog()
    {
        Id = 5,
        Name = "Luna",
        CityId = 8,
        WalkerId = 1,
    }
};

List<City> cities = new List <City>
{
    new City()
    {
        Id = 1,
        Name = "Nashville, Tennessee"
    },
    new City()
    {
        Id = 2,
        Name = "Hendersonville, Tennessee"
    },
    new City()
    {
        Id = 3,
        Name = "Franklin, Tennessee"
    },
    new City()
    {
        Id = 4,
        Name = "Murfreesboro, Tennessee"
    },
    new City()
    {
        Id = 5,
        Name = "Lebanon, Tennessee"
    },
    new City()
    {
        Id = 6,
        Name = "Mt. Juliet, Tennessee"
    },
    new City()
    {
        Id = 7,
        Name = "Dickson, Tennessee"
    },
    new City()
    {
        Id = 8,
        Name = "Clarksville, Tennessee"
    },
    new City()
    {
        Id = 9, 
        Name = "Portland, Oregon"
    }
};


List<Walker> walkers = new List<Walker>
{
    new Walker()
    {
        Id = 1,
        Name = "Shawn Walker"
    },
    new Walker()
    {
        Id = 2,
        Name = "Jesse Asa"
    },
    new Walker()
    {
        Id = 3,
        Name = "Rebecca Shells"
    },
    new Walker()
    {
        Id = 4,
        Name = "Joe Smith",
    },
    new Walker()
    {
        Id = 5,
        Name = "Martin Barton",
    }
};

List<WalkerCity> walkerCity = new List<WalkerCity> {};



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.Run();
