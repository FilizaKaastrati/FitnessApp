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

namespace fitnesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FitnesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FitnesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //Get Method
        [HttpGet]
        public JsonResult Get()
        {
            string query = @" 
               select FitnesId, FitnesName from dbo.Fitnes";
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
        public JsonResult Post(Fitnes fit)
        {
            string query = @" 
               insert into dbo.Fitnes values
                 ('" + fit.FitnesName + @"')";
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
        public JsonResult Put(Fitnes fit)
        {
            string query = @" 
               update dbo.fitnes set
               FitnesName = '" + fit.FitnesName + @"'
               where FitnesId = " + fit.FitnesId + @"";


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
               delete from dbo.fitnes 
               where FitnesId = " + id + @"";


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

    }
}





