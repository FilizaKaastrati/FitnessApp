using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using fitnesAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace fitnesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PastruesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PastruesiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        //Get Method
        [HttpGet]
        public JsonResult Get()
        {
            string query = @" 
               select PastruesId, PastruesName, Fitnes, 
               convert(varchar(10),DateOfJoining,120) as DateOfJoining 
               ,PhotoFileName
               from dbo.Pastruesi";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }
        //post method
        [HttpPost]
        public JsonResult Post(Pastruesi pas)
        {
            string query = @" 
               insert into dbo.Pastruesi 
               (PastruesName, Fitnes,DateOfJoining, PhotoFileName)
               values
                 (
                   '" + pas.PastruesName + @"'
                   ,'" + pas.Fitnes + @"'
                   ,'" + pas.DateOfJoining + @"'
                   ,'" + pas.PhotoFileName + @"'
                 )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Added Successfully");
        }



        [HttpPut]
        public JsonResult Put(Pastruesi pas)
        {
            string query = @" 
               update dbo.Pastruesi set
                PastruesName = '" + pas.PastruesName + @"'
               ,Fitnes = '" + pas.Fitnes + @"'
               ,DateOfJoining = '" + pas.DateOfJoining + @"'
               ,PhotoFileName = '" + pas.PhotoFileName + @"'
              where PastruesId = " + pas.PastruesId + @"";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerAppCon");

            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Updated Successfully");
        }
        //we need to add it in the root parameter
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @" 
               delete from dbo.Pastruesi 
               where PastruesId = " + id + @"";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerAppCon");

            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Successfully");
        }

        //API Method
        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllFitnesNames")]

        public JsonResult GetAllFitnesNames()
        {
            string query = @" 
               select FitnesName from dbo.Fitnes";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("TrainerAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))

                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);
        }
    }


}