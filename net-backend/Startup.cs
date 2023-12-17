using System;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SurveillanceTasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MySqlConnector;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.PickupAndDeliveryTasks;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Infrastructure.SurveillanceTasks;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DDDSample1DbContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("MySQL82"),
                    new MySqlServerVersion(new Version(8, 0, 22)))
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>().EnableDetailedErrors()
            );
            services.AddCors(options =>
            { 
                options.AddPolicy("AllowAll", builder => 
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader().Build(); 
                }); 
            });

            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("AllowAll");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();
            
            services.AddTransient<IPickupAndDeliveryTaskRepository,PickupAndDeliveryTaskRepository>();
            services.AddTransient<PickupAndDeliveryTaskService>();
            
            services.AddTransient<ISurveillanceTaskRepository,SurveillanceTaskRepository>();
            services.AddTransient<SurveillanceTaskService>();
        }
    }
}
