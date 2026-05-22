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
    },
    new Dog()
    {
        Id = 6,
        Name = "Big Bubba",
        CityId = 8,
    },
    new Dog()
    {
        Id = 7,
        Name = "Terrance",
        CityId = 3,
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
        Id = 7,
        Name = "Doo Doo Boy"
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

List<WalkerCity> walkerCity = new List<WalkerCity>
{
    new WalkerCity()
    {
        Id = 1,
        CityId = 1,
        WalkerId = 1,
    },
    new WalkerCity()
    {
        Id = 2,
        CityId = 2,
        WalkerId = 2,
    },
    new WalkerCity()
    {
        Id = 3,
        CityId = 3,
        WalkerId = 3,
    },
    new WalkerCity()
    {
        Id = 4,
        CityId = 4,
        WalkerId = 4,
    },
    new WalkerCity()
    {
        Id = 5,
        CityId = 5,
        WalkerId = 5,
    },
    new WalkerCity()
    {
        Id = 6,
        CityId = 2,
        WalkerId = 1,
    },
    new WalkerCity()
    {
        Id = 7,
        CityId = 6,
        WalkerId = 2,
    },
    new WalkerCity()
    {
        Id = 8,
        CityId = 8,
        WalkerId = 3,
    },
};



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


app.MapGet("/api/dogs", () =>
{
    return dogs.Select(dog => new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        WalkerId = dog.WalkerId,
        City = cities.FirstOrDefault(c => c.Id == dog.CityId) == null ? null : new CityDTO
        {
            Id = cities.First(c => c.Id == dog.CityId).Id,
            Name = cities.First(c => c.Id == dog.CityId).Name,
        },
        Walker = dog.WalkerId == null ? null : new WalkerDTO
        {
          Id = walkers.First(w => w.Id == dog.WalkerId).Id,
          Name = walkers.First(w => w.Id == dog.WalkerId).Name  
        }
    });
});


app.MapGet("/api/dogs/{id}", (int id) =>    
 {
    Dog dog = dogs.FirstOrDefault(dog => dog.Id == id);
    if (dog == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        WalkerId = dog.WalkerId,
        City = cities.FirstOrDefault(c => c.Id == dog.CityId) == null ? null : new CityDTO
        {
            Id = cities.First(c => c.Id == dog.CityId).Id,
            Name = cities.First(c => c.Id == dog.CityId).Name,
        },
        Walker = dog.WalkerId == null ? null : new WalkerDTO
        {
          Id = walkers.First(w => w.Id == dog.WalkerId).Id,
          Name = walkers.First(w => w.Id == dog.WalkerId).Name  
        }
        
    });
 }
);

 app.MapPost("/api/dogs", (Dog dog) =>
{

dog.Id = dogs.Any() ? dogs.Max (dog => dog.Id) + 1 : 1;
dogs.Add(dog);
 
return Results.Created($"/api/dogs/{dog.Id}", new DogDTO
{
Id = dog.Id,
Name = dog.Name,
CityId = dog.CityId,
WalkerId = dog.WalkerId
});
});


app.MapGet("/api/cities", () =>
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/walkers", () => {
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name,
        Cities = walkerCity
            .Where(wc => wc.WalkerId == w.Id)
            .Select(wc => new CityDTO
            {
                Id = cities.First(c => c.Id == wc.CityId).Id,
                Name = cities.First(c => c.Id == wc.CityId).Name
            })
            .ToList()
    });
});
app.MapPost("/api/cities", (City city) =>
{
    city.Id = cities.Any() ? cities.Max(c => c.Id) + 1 : 1;
    cities.Add(city);
    return Results.Created($"/api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});


app.MapPut("/api/dogs/{id}", (int id, Dog updatedDog) =>{
Dog dog = dogs.FirstOrDefault(d => d.Id == id);
if (dog == null)
{
   return Results.NotFound();
}
dog.WalkerId = updatedDog.WalkerId;
return Results.NoContent();
});

app.MapGet("/api/walkers/{id}", (int id) =>
{
    Walker walker = walkers.FirstOrDefault(walker => walker.Id == id);
    if (walker == null)
    {
        return Results.NotFound();
    }
    
    return Results.Ok(new WalkerDTO
{
    Id = walker.Id,
    Name = walker.Name,
    Cities = walkerCity
        .Where(wc => wc.WalkerId == walker.Id)
        .Select(wc => new CityDTO
        {
            Id = cities.First(c => c.Id == wc.CityId).Id,
            Name = cities.First(c => c.Id == wc.CityId).Name
        })
        .ToList()
});
});


app.MapPut("/api/walkers/{id}/cities", (int id, List<int> cityIds) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    if (walker == null)
    {
        return Results.NotFound();
    }
    walkerCity.RemoveAll(wc => wc.WalkerId == id);
    foreach (int cityId in cityIds)
    {
        walkerCity.Add(new WalkerCity
        {
            WalkerId = id,
            CityId = cityId
        });
    }
    return Results.NoContent();
});

app.MapDelete("/api/dogs/{id}", (int id) =>
{
 Dog dog = dogs.FirstOrDefault(d => d.Id == id);
 if (dog == null) return Results.NotFound();
 dogs.Remove(dog);
 return Results.NoContent();   
});


app.MapDelete("/api/walkers/{id}", (int id) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    if (walker == null) return Results.NotFound();
    walkers.Remove(walker);
    foreach (var dog in dogs.Where(d =>d.WalkerId == id))
    {
        dog.WalkerId = null;
    }
    return Results.NoContent();
});
app.Run();



