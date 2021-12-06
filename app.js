var videoList;    
var count=0;


document.addEventListener('DOMContentLoaded', getPlaylist);     //getting values from local storage

function getPlaylist(){

    let playlist=document.querySelector(".playlist")
    let playlistItem;
    
    let serialNo;
    let name;
    let delBtn;

    if(localStorage.getItem("videoList")!==null){

        videoList=JSON.parse(localStorage.getItem('videoList'));


        videoList.forEach(e => {                 //for every entry it creates all the div and assign values and then append it.
            
            playlistItem=document.createElement("div");
            playlistItem.className="playlist-item";
            playlistItem.id=e.id;                     //unique id for every playlist item


            serialNo=document.createElement("div");
            name=document.createElement("div");
            delBtn=document.createElement("div");
            delBtn.className="del-btn";

            serialNo.innerHTML=`<i class="fa-solid fa-circle-play"></i>`;
            name.innerHTML=e.title;
            delBtn.innerHTML=`<i class="fa-solid fa-xmark"></i>`

            playlistItem.appendChild(serialNo);
            playlistItem.appendChild(name)
            playlistItem.appendChild(delBtn);
            playlist.appendChild(playlistItem);
        });
    }
}



function addUrl(){
     
    let videoUrl=document.getElementById("youtube-url");
    let videoTitle=document.getElementById("youtube-title");
    let vUrl=videoUrl;

    let video=document.getElementById("video");
    let playlist=document.querySelector(".playlist")
    let playlistItem=document.createElement("div");
    playlistItem.className="playlist-item";
    
    
    let serialNo=document.createElement("div");
    let name=document.createElement("div");
    let delBtn=document.createElement("div");
    delBtn.className="del-btn";

 
   
    

if(validateInput(videoUrl.value,videoTitle.value)){   //validating Inputs

    videoUrl = embedUrl(videoUrl.value);


    video.src = videoUrl;
    let title = document.querySelector(".title");
    title.innerHTML=videoTitle.value;
    let btn=document.createElement("button")
    let ankerTag=document.createElement("a")

    btn.className="btn-wide btn-normal";    //add download button
    btn.innerHTML="Download";
    ankerTag.appendChild(btn);
    title.appendChild(ankerTag);

    ankerTag.href="https://en.savefrom.net/65/";
    ankerTag.target="_blank";
  

    if(localStorage.getItem('videoList')===null){
      videoList=[];
      count=videoList.length;
    }
    else{
    videoList=JSON.parse(localStorage.getItem('videoList'))
    count=videoList.length;
    }
    
    videoList.push({id: count,title: videoTitle.value,url:videoUrl})
    console.log(videoList)
    localStorage.setItem("videoList",JSON.stringify(videoList));

    
    serialNo.innerHTML= `<i class="fa-solid fa-circle-play"></i>`;
    name.innerHTML= videoTitle.value;
    delBtn.innerHTML= `<i class="fa-solid fa-xmark"></i>`

          /* Creating Playlist */
          playlistItem.id=count;               //unique id for every playlist item
    
    playlistItem.appendChild(serialNo);
    playlistItem.appendChild(name)
    playlistItem.appendChild(delBtn);
    playlist.appendChild(playlistItem)


    //count++;
}
 vUrl.value="";
 videoTitle.value="";  
}

function embedUrl(urlValue){      

    let len= urlValue.length;
    let url;

    //like youtube or vimeo we can add more video site url we just need to design the logic a/c to its url.

    if(urlValue.includes("youtube.com")){                     //youtube videos 

        if(urlValue.includes("m.youtube.com")){               //for mobile
            url=`https://m.youtube.com/embed/${urlValue.slice(31,len)}`;
        }
        else{                                                //for desktop
         url = urlValue.slice(0,24).concat(`embed/${urlValue.slice(32,len)}?autoplay=1&mute=1`);
         console.log(url);
        }
    }
    else if(urlValue.includes("https://youtu.be")){
        url = `https://www.youtube.com/embed/${urlValue.slice(17,len)}?autoplay=1&mute=1`;
         console.log(url);
    }
    else if(urlValue.includes("vimeo.com")){                              //vimeo videos
        url=`https://player.vimeo.com/video/${urlValue.slice(18,len)}`;
        console.log(url)
    }
    else{
        alert("paste the correct url\n Hint: https://www.youtube.com/watch?v=PoRJizFvM7s or https://vimeo.com/176513811")
    }
  
    return url;

}

function validateInput(url,title){


    if(url ==="" && title ===""){
       alert("Please Enter Both the fields");
    }
    else if(url ===""){
        alert("Enter a url");
    }
    else if(title ===""){
        alert("Enter a title");
    }
    
    else{
        return true;
    }

    return false;
}




function playVideo(){

    let eventFlag=0;
    let video=document.getElementById("video");
    let title=document.querySelector(".title")
    let btn=document.createElement("button")
    let ankerTag=document.createElement("a")
    var id;

    btn.className="btn-wide btn-normal";    //add download button
    btn.innerHTML="Download";
    ankerTag.appendChild(btn);
    ankerTag.href="https://en.savefrom.net/65/";
    ankerTag.target="_blank";

    document.body.addEventListener('click',(e)=>{                //event delegation
        
        if(e.target.parentElement.classList.contains("playlist-item")){

            
            id=e.target.parentElement.id;                       //get the target element id so that we can play that video.
             
            if(localStorage.getItem("videoList")!==null){
                videoList=JSON.parse(localStorage.getItem("videoList"))
            }

            video.src=videoList[id].url;   
            title.innerHTML=videoList[id].title;                        
            title.appendChild(ankerTag);
        }

        if(e.target.parentElement.classList.contains("del-btn") && eventFlag===0){

       
            eventFlag=1;
            let flag=0;
            let itemId=e.target.parentElement.parentElement.id;
            let nextItem=e.target.parentElement.parentElement.nextSibling;
            var nItem=nextItem;
    
    
            // console.log("itemId"+itemId);
            // console.log("nextItem"+nextItem);
            // console.log("item"+nItem);
    
    
    
            if(localStorage.getItem("videoList")!==null){
                videoList=JSON.parse(localStorage.getItem("videoList"))
            }
          
    
           
    
            e.target.parentElement.parentElement.remove();            //remove from ui
            
             
    
            const result = videoList.filter((e) => {                   //remove from local storage (by using filtering)
                return e.id !== Number(itemId);                         //converting string to number
            });
            console.log(result);
            
    
    
            if(nextItem!==null){

    
                result.forEach((e)=>{
    
    
                    if(e.id === Number(nextItem.id) || flag===1){
                        e.id=e.id-1;                                 //changing id fro LS
                        nItem.id=e.id;
                        nItem=nItem.nextSibling;                     //changing id in UI
                        flag=1;
                    }
                })
                flag=0;
              }
    
    
    
              
    
           
            localStorage.setItem("videoList",JSON.stringify(result));   //set the updated data to local storage
            
        }
       
       
      
     

    })
}




/*  UI   */

var theme;
var themeCount=0;

function themeChange(){
     
    let body=document.querySelector("body");
    let videoPlayer=document.querySelector(".video-player");
    let playlist=document.querySelector(".playlist");
   

    let hover = document.querySelectorAll('.playlist-item'); 
   

    for (let elem of hover) {                             //working for hover in playlist item
        elem.addEventListener('mouseenter', () => {
            elem.style.background= `${theme  ? "hsl(0, 0%, 100%)": "hsl(0, 0%, 20%)"}`;
            elem.style.color= `${theme ? "hsl(0, 0%, 20%)": "hsl(0, 0%, 100%)"}`;
        })
        elem.addEventListener('mouseleave', () => {
            elem.style.background= `${theme  ? "hsl(0, 0%, 20%)": "hsl(0, 0%, 100%)"}`;
            elem.style.color= `${theme ? "hsl(0, 0%, 100%)": "hsl(0, 0%, 20%)"}`;
        })
    };

   
    
    

    if(localStorage.getItem("theme")!==null){
        theme=JSON.parse(localStorage.getItem("theme"));
    }
    if(themeCount===0){
        theme=false;
        themeCount=1;
    }
    
    
    body.style.background= `${theme  ? "hsl(0, 0%, 20%)": "hsl(0, 0%, 100%)"}`;
    body.style.color= `${theme ? "hsl(0, 0%, 100%)": "hsl(0, 0%, 20%)"}`;
    
    videoPlayer.style.background= `${theme  ? "hsl(0, 0%, 30%)": "hsl(0, 0%, 85%)"}`;
    videoPlayer.style.color= `${theme ? "hsl(0, 0%, 100%)": "hsl(0, 0%, 20%)"}`;

    playlist.style.background= `${theme  ? "hsl(0, 0%, 20%)": "hsl(0, 0%, 100%)"}`;
    playlist.style.color= `${theme ? "hsl(0, 0%, 100%)": "hsl(0, 0%, 20%)"}`;

  
     
    

    localStorage.setItem("theme",JSON.stringify(!theme));
    
    
}



