const node = document.querySelector('#yourNodeId');
if (node && node.parentNode) {
    const range = document.createRange();
    range.selectNode(node);
} else {
    console.error('Node not found or does not have a parent.');
}
function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation() {
  var tl = gsap.timeline();

 

  tl.from(".line h1", {
    y: 120,
    stagger: 0.2,
    duration: 1.5,
    delay: 0.5,
  });

  gsap.from(".captainSheild",{
    rotate: 360,
    duration: 6,
    // delay: 1.7,
  })
//   gsap.from(".spideyWeb",{
//     rotate: 90,
//     delay: 2,

//   })

  gsap.from(".spidermanImg",{
    x: 250,
    duration: 2,
    ease: Power4,
    opacity: 0,
    delay: 1.7
  })
//   gsap.from(".ironmanImg",{
//     x: 250,
//     y: -200,
//     duration: 2,
//     ease: Power4,
//     opacity: 0,
//     delay: 1.7
//   })


  tl.from("#line1-part1, .line h2", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 30);
    },
  });
  



  tl.to(".line h2", {
    opacity: 1,
    animationName: "anime",
  });


  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 4, //we have to give 4 here
    y: -100
  });

  tl.from("#page1", {
    // delay: 0.2,
    y: 1600,
    opacity: 0,
    ease: Power4,
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("#navbar",{
    opacity: 0
  })

  tl.from(".hero h1",{
    y: 120,
    opacity: 0,
    duration: 1,
    stagger: 0.2
  })

  tl.from(".hero-first-h1 #page2",{
    opacity: 0,

  },"-=1.2")
  tl.from("#playBtn-cursor",{
    opacity: 1,
    y: 15
  })
}



function sheryImageAnimation(){
    Shery.imageEffect(".image-div",{
    style: 5,
    config: {"a":{"value":0.46,"range":[0,30]},"b":{"value":-0.8,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749782049553},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":5.06,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.31,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":1.68,"range":[0,10]},"metaball":{"value":0.44,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":7.63,"range":[0,100]}},
    gooey: true,
   })
}

function cursorAnimation(){
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.5,
  });
  Shery.makeMagnet("#navbar h4", {});
  Shery.makeMagnet(".hero2Mcu", {});

  var videoContainer = document.querySelector('#video-container')
  var video =  document.querySelector("#video-container video")
  videoContainer.addEventListener("mouseenter",function(){
     videoContainer.addEventListener("mousemove", function(dets){
      gsap.to(".mousefollower", {
        opacity: 0
      })
      gsap.to("#playBtn-cursor",{
        left: dets.x-390,
        y: dets.y - 100
      })
     }
     )
  })

  videoContainer.addEventListener("mouseleave", function(){
    gsap.to(".mousefollower",{
      opacity: 1
    })
    gsap.to("#playBtn-cursor",{
     left: "70%" 
    })
  })
  
  var flag = 0
  videoContainer.addEventListener("click", function(){
    if(flag == 0){
      video.play()
      video.style.opacity = 1;
      document.querySelector("#playBtn-cursor").innerHTML = `<i class="ri-pause-fill"></i>`
      gsap.to("#playBtn-cursor",{
        scale: 0.5
      })
      flag = 1
    } else{
      video.pause()
      video.style.opacity = 0;
      document.querySelector("#playBtn-cursor").innerHTML = `<i class="ri-play-fill"></i>`
      gsap.to("#playBtn-cursor",{
        scale: 1
      })
      flag = 0
    }
   
  })

}

loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryImageAnimation();

document.addEventListener('mousemove', function(dets){
  gsap.to("#flag",{
    x : dets.x,
    y : dets.y
  })
})

document.querySelector(".hero3").addEventListener("mouseenter",function(){
  gsap.to("#flag",{
    opacity: 1
  })

})
document.querySelector(".hero3").addEventListener("mouseleave",function(){
  gsap.to("#flag",{
    opacity: 0
  })

})




