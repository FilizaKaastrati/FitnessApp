create table dbo.Fitnes(
FitnesId int identity(1,1),
FitnesName varchar(500),)

select* from dbo.Fitnes

insert into dbo.Fitnes values ('GYM 24/7')
insert into dbo.Fitnes values ('FiveStar')
create table dbo.Pesha
(
	PeshaId int identity(1,1),
	PeshaName varchar(500)

)
insert into dbo.Pesha values('100')

create table dbo.Paisjet
(
PaisjetId int identity(1,1),
PaisjetName varchar(500),
Pesha varchar(500)

)

insert into dbo.Paisjet values('free weights','100')
select * from dbo.ProteinItems

create table dbo.ProteinItems
(
ProteinItemId int identity(1,1),
ProteinItemName varchar(500),
Price decimal (18,2)
)
insert into dbo.ProteinItems values('Whey Gold Vanilla', '3.50')
insert into dbo.ProteinItems values('Whey 100% Cherry', '3.30')


create table dbo.OrderMaster
(
OrderMasterId int identity(1,1),
OrderNumber int,
Klienti int,
PMethod varchar(500),
Gtotal decimal (18,2)
)
insert into dbo.OrderMaster
 values('1','2','Cash','3.50')
 select*
 from dbo.OrderMaster
 drop table dbo.OrderMaster

create table dbo.OrderDetails
(
OrderDetailId int identity(1,1),
OrderMasterId int,
ProteinItemId int,
ProteinItemPrice decimal (18,2),
Quantity int
)
insert into dbo.OrderDetails
 values('1','1', '3.50','2')

drop table dbo.OrderMasters