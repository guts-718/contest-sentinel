export function formatTime(date:string,tz:string){
  
  const d = new Date(date.includes("T") ? date : date.replace(" ","T")+"Z");
  d.setMinutes(d.getMinutes() + 330); // <-- add this line
  return d.toLocaleString("en-IN",{
    timeZone: tz,
    hour12:true,
  });
 
}