/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 [OrderDetailId]
      ,[OrderMasterId]
      ,[ProteinItemId]
      ,[ProteinItemPrice]
      ,[Quantity]
      
  FROM [FitDB].[dbo].[OrderDetails]