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
    public class OrderDetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public OrderDetailsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        //Get Method
        [HttpGet]
        public JsonResult Get()
        {
            string query = @" 
               select OrderDetailId, OrderMasterId, ProteinItemId
               ,ProteinItemPrice,Quantity
               from dbo.OrderDetails";


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
        public JsonResult Post(OrderDetails ord)
        {
            string query = @" 
               insert into dbo.OrderDetails 
               (OrderMasterId, ProteinItemId,ProteinItemPrice, Quantity)
               values
                 (
                   '" + ord.OrderMasterId + @"'
                   ,'" + ord.ProteinItemId + @"'
                   ,'" + ord.ProteinItemPrice + @"'
                   ,'" + ord.Quantity + @"'
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
        public JsonResult Put(OrderDetails ord)
        {
            string query = @" 
               update dbo.OrderDetails set
                OrderMasterId = '" + ord.OrderMasterId + @"'
               ,ProteinItemId = '" + ord.ProteinItemId + @"'
               ,ProteinItemPrice = '" + ord.ProteinItemPrice + @"'
               ,Quantity = '" + ord.Quantity + @"'
              where OrderDetailId = " + ord.OrderDetailId + @"";


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
               delete from dbo.OrderDetails 
               where OrderDetailId = " + id + @"";


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

        /*   //API Method
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
           }*/

        [Route("GetAllOrderMasterId")]

        public JsonResult GetAllOrderMasterId()
        {
            string query = @" 
               select OrderMasterId from dbo.OrderMaster";

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


        [Route("GetAllProteinItemId")]

        public JsonResult GetAllProteinItemId()
        {
            string query = @" 
               select ProteinItemId from dbo.ProteinItems";

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

        [Route("GetAllProteinItemPrice")]

        public JsonResult GetAllProteinItemPrice()
        {
            string query = @" 
               select ProteinItemPrice from dbo.ProteinItems";

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


