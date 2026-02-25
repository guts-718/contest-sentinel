export function formatTime(date:string,tz:string){
  console.log("time: ",date, "    timezone: ",tz)
  const d = new Date(date.includes("T") ? date : date.replace(" ","T")+"Z");
  const p= new Date(date.includes("T") ? date : date.replace(" ","T")+"Z");
  p.toLocaleString("en-IN",{
    timeZone: tz,
    hour12:true,
  });

console.log("new time: ", d);
d.setMinutes(d.getMinutes() + 330); // <-- add this line
return d.toLocaleString("en-IN",{
  timeZone: tz,
  hour12:true,
});
 
}