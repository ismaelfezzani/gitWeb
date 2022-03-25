
function requestLines(){
    let request= new XMLHttpRequest()

    request.open("get", "https://api.tisseo.fr/v1/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb");
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            let data=JSON.parse(request.responseText)
            console.log(data)
            let lignes=data.lines.line;
            for (let i=0; i<=lignes.length-1 ;i++){
                document.querySelector("#listLines").innerHTML+="<li class=\"item\" id=\""+lignes[i].id+"\"> "+lignes[i].name+"</li>"
                
            } 
            
            document.querySelectorAll(".item").forEach(elt=>{
                elt.addEventListener("click",()=>{
                    console.log(elt.id)
                    requestArrets(elt.id)

                })

            })

            
        } 
    }
    request.send(); 

}


function requestArrets(id){
    let request=new XMLHttpRequest()
    const url="https://api.tisseo.fr/v1/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId="+id
    request.open("get",url)
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            let data=JSON.parse(request.responseText)

            let arrets=data.physicalStops.physicalStop
            for(let i=0;i<=arrets.length-1;i++){
                document.getElementById(id).innerHTML+="<br>"+"<p class=\"arrets\" id=\""+arrets[i].id+"\">"+arrets[i].name+"</p>"
            }
            document.querySelectorAll(".arrets").forEach(elt=>{
                elt.addEventListener("click",()=>{
                    passageArretsSuivants(elt.id)
                })
            })
        
        }
    }
    request.send(); 
}

function passageArretsSuivants(arret){
    console.log(arret)
    let request=new XMLHttpRequest()
    const url="https://api.tisseo.fr/v1/stops_schedules.json?key=a3732a1074e2403ce364ad6e71eb998cb&stopPointId="+arret
    request.open("get",url)
    request.onreadystatechange = function () {
        if(request.readyState === 4 && request.status === 200) {
            let data=JSON.parse(request.responseText)
            
            let horaires=data.departures.departure
            console.log(horaires)
            for (let i=0;i<=horaires.length-1;i++){
                console.log(horaires[i].dateTime)
               document.getElementById(arret).innerHTML+="<br>"+"<p class=\"horaires\">"+horaires[i].dateTime+"</p>"
            }
            
        
        }
    }
    request.send(); 
    
}




document.querySelector(".button").addEventListener("click",requestLines);


