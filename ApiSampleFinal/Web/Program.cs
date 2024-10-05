
using ApiSampleFinal.Automapper;
using AutoMapper;
using Infrastructure;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Services;
using System;
using System.Net;
using System.Net.Security;

namespace ApiSampleFinal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configutation = builder.Configuration;
            // Add services to the containe
            builder.Services.AddServices();
            builder.Services.AddControllers();
            builder.Services.AddRepositories(configutation);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //configuracion auto mapper
            var mappingConfiguration = new MapperConfiguration(m => m.AddProfile(new MappingProfile()));
            IMapper mapper = mappingConfiguration.CreateMapper();
            builder.Services.AddSingleton(mapper);

            //configuracion cors
            builder.Services.AddCors(p => p.AddPolicy("CORS_Policy", builder =>
            {
                CorsPolicyBuilder corsPolicyBuilder = builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
            }));

            //adiciona context database
            builder.Services.AddDbContext<AppDbContext>();
           

            var app = builder.Build();

            //configuracion ssl
            ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, errors) =>
             {
                 // local dev, just approve all certs
                 return app.Environment.IsDevelopment() ? true : errors == SslPolicyErrors.None;
             };


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //aplica cors policy
            app.UseCors("CORS_Policy");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
