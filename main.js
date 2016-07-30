const readline = require('readline');
const fs = require('fs');
var year=[];
var jsonData1=[],
    jsonData2=[];

var val=[];
var hash=[],
    hash1=[];
var arrest1=[],
    arrest2=[];
var i=0,
    j=0;
for(i=2001;i<=2016;i++)
{
  hash[i]=0;
  hash1[i]=0;
  arrest1[i]=0;
  arrest2[i]=0;
}

const rl = readline.createInterface({
 input: fs.createReadStream('csv/crimes2001onwards.csv')

});
var outstream1 = fs.createWriteStream('json/out1.json');
var outstream2 = fs.createWriteStream('json/out2.json');
rl.on('line',function(line)
{
    var lineRecords=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


for(i=2001;i<=2016;i++)
{

   if(" "+lineRecords[17]==" "+i && lineRecords[5]=="THEFT")
   {

     if(lineRecords[6]=="OVER $500")
     {

       hash[i]++;
     }
      if(lineRecords[6]=="$500 AND UNDER")
      {

        hash1[i]++;
      }
       }

      if(" "+lineRecords[17]==" "+i && lineRecords[8].trim()=="true" && lineRecords[5]=="ASSAULT"){
            arrest1[i]++;
      }

      if (" "+lineRecords[17]==" "+i && lineRecords[8].trim()=="false" && lineRecords[5]=="ASSAULT") {
            arrest2[i]++;
      }
}
 });

 rl.on('close',function()
 {

   for(j=2001;j<=2016;j++)
   {
     tempData1={};
     tempData1["year"]=j;
     tempData1["above$500"]=hash[j];
     tempData1["below$500"]=hash1[j];

     jsonData1.push(tempData1);

     tempData2={};
     tempData2["year"]=j;
     tempData2["Arrested"]=arrest1[j];
     tempData2["NotArrested"]=arrest2[j];

     jsonData2.push(tempData2);
}

 console.log(jsonData1);
 console.log(jsonData2);


 outstream1.write(JSON.stringify(jsonData1),encoding="utf8")
 outstream2.write(JSON.stringify(jsonData2),encoding="utf8")

});
