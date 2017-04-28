
 window.slides = function(element){
   var $el = $(element)
   let $view = $el.children('.view')
   var width = $el.width()
   //console.log(width)
   var count = $el.find('.slide').length
   var currentIndex = 0
   let timerId 
   
   var $ol = $('<ol class="controls"></ol>')
   for(let i=0;i<count;i++){
     $ol.append(`<li>${i+1}</li>`)
    }
    $el.append($ol)
    $ol.on('click','li',function(e){
      let $li = $(e.currentTarget)
      let index = $li.index()
      //console.log(index)
      goToSlide(index)
    })
    $view.on('mouseenter',function(){
      window.clearInterval(timerId)
    })
    $view.on('mouseleave',function(){
      autoPlay()
    })
    
    function goToSlide(index){
      if(index<0){
        index = count -1
      }else if(index>= count){
        index = 0;
      }
      if(index === 0){
        let $li = $el.find('.slide').eq(0).clone()
        $li.appendTo($view)
        let number = -width * count
        $view.one("transitionend",function(){
          $li.remove()
          let oldTransition = $view.css('transition')
          $view.css({
            transition:'none',
            transform:`translateX(0px)`
          })
          $view.offset()
          $view.css('transition',oldTransition)
          currentIndex = index
        })
        $view.css({
          transform:`translateX(${number}px)`
        })
        return
      }
      let number = -width * index
      $view.css({      
        transform:`translateX(${number}px)`
      })
      currentIndex = index
    }
   function autoPlay(){
       timerId = setInterval(function(){
       goToSlide(currentIndex+1)
       },3000)
   }
   autoPlay()
 }
 
 
 
 
 
 //用户代码
 slides(document.querySelector('.slides'))