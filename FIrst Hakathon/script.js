const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAEnFHkVo3M7bvcYR6pv14R96mrWQFTq-o";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'US'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        ChannelIcon(item);
    })
})
.catch(err => console.log(err));

const ChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        VideoCard(video_data);
    })
}

const VideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}



const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

  
    const subCount= document.getElementById('Subscriberid');
    const viewCount = document.getElementById('views');
    const vid_Count = document.getElementById('videocount');
    
   
    let searchData = () => {
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${'UCY6KjrDBN_tIRFT_QNqQbRQ'}&key=${api_key}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            subCount.value = data["items"][0].statistics.subCount;
            viewCount.value = data["items"][0].statistics.viewCount;
            vid_Count.value = data["items"][0].statistics.vid_Count;
            
    
            
        })
    }
   searchData();

   // ***********************************************************************

   