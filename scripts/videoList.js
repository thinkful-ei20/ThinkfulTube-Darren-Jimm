'use strict';
/* global store api*/
//eslint-disable-next-line no-unused-vars
const videoList = (function (){

  const generateListItem = function(video) {
    return `
    <li>
      <h3>${video.title}</h3>
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank"><img src="${video.thumbnail}"/></a>
      <!--iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe-->
      <a href="https://www.youtube.com/channel/${video.channel}"><p>More from this channel</p></a>
    </li>
  `;
   
  };

  const render = function() {
    
    const completeHtml = store.videos.map(item => generateListItem(item)).join('');
    $('.results').html(completeHtml);
  }; 

  const handleFormSubmit = function() {
    $('.js-search-form').on('submit', event => {
      event.preventDefault();
      const searchInput = $('#search-term').val();    
      $('#search-term').val('');
  
      api.fetchVideos(searchInput, '');

    });
  };

  const handleShowMore = function(){
    $('.js-show-more').on('click', event => {
      console.log('show more pressed');
      if(store.videos[0] !== undefined){
        api.fetchVideos(store.originalSearchQuery , store.next_page);
      } else {
        console.log('no initial results are shown');
      }
    });
  };

  const bindEventListeners = function(){
    handleFormSubmit();
    handleShowMore();
  };


  return {
    render, bindEventListeners 
  };



})();




