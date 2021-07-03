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
    public class PaisjeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PaisjeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        //Get Method
        [HttpGet]
        public JsonResult Get()
        {
            string query = @" 
               select PaisjeId, PaisjeName, Pesha
               
               ,PhotoOfPaisje
               from dbo.Paisje";


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
        public JsonResult Post(Paisje pai)
        {
            string query = @" 
               insert into dbo.Paisje 
               (PaisjeName, Pesha, PhotoOfPaisje)
               values
                 (
                   '" + pai.PaisjeName + @"'
                   ,'" + pai.Pesha + @"'
                   
                   ,'" + pai.PhotoOfPaisje + @"'
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
        public JsonResult Put(Paisje pai)
        {
            string query = @" 
               update dbo.Paisje set
                PaisjeName = '" + pai.PaisjeName + @"'
               ,Pesha = '" + pai.Pesha + @"'
               
               ,PhotoOfPaisje = '" + pai.PhotoOfPaisje + @"'
              where PaisjeId = " + pai.PaisjeId + @"";


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
               delete from dbo.Paisje 
               where PaisjeId = " + id + @"";


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

        [Route("GetAllPeshaNames")]

        public JsonResult GetAllPeshaNames()
        {
            string query = @" 
               select PeshaName from dbo.Pesha";

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