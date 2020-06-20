create procedure insertIntoCityTable( IN zipcode VARCHAR(300),IN cityname VARCHAR(300))
begin 
DECLARE countvar INTEGER;
SELECT count(*) into countvar 
from city where zip=zipcode;
if(countvar=0) then
insert into city values (zipcode,cityname);
end if;
end;

//////////////////////
create procedure insertIntoStateTable( IN cityname VARCHAR(300),IN statename VARCHAR(300))
begin 
DECLARE countvar INTEGER;
SELECT count(*) into countvar 
from state where city=cityname;
if(countvar=0) then
insert into state values (cityname,statename);
end if;
end;

//////////////////////
create view studentlist as select fname,lname,email,dob,phoneno from students;