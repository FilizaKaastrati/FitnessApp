/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 [OrderDetailId]
      ,[OrderMasterId]
      ,[ProteinItemId]
      ,[ProteinItemPrice]
      ,[Quantity]
	 -- ,[OrderMasterId1]

  FROM [FitDB].[dbo].[OrderDetails]