create database TrainerDB

create table dbo.Trainer(
TrainerId int identity(1,1),
TrainerName varchar(500),
Fitnes varchar(500),
DateOfJoining date,
PhotoFileName varchar(500)
) 
drop table dbo.Trainer

insert into dbo.Trainer values('Filiza', 'FiveStar','2021-06-06', 'anonymous.png')
insert into dbo.Trainer values('Anda', 'GYM 24/7','2021-06-06', 'anonymous.png')

select* from dbo.Trainer

create table dbo.Klienti(
	KlientId int identity(1,1),
	KlientName varchar(500),
	Trainer varchar(500),
	DateOfJoining date,
	PhotoFileName varchar(500)

)
insert into dbo.Klienti values('Diellza', 'Filiza','2021-03-06', 'anonymous.png')

select * from dbo.Klienti

