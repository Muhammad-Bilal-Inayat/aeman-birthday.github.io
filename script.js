// Shared behaviour: nav, countdown, floating hearts, confetti, tilt, flip, cake, gift, typewriter.
(function(){
  // Floating hearts / petals — gentle, decorative only.
  var emojis=['💖','🌸','✨','💕'];
  function fall(){
    var s=document.createElement('span'); s.className='fall'; s.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left=Math.random()*96+'vw'; s.style.fontSize=(16+Math.random()*18)+'px';
    s.style.animationDuration=(6+Math.random()*5)+'s'; document.body.appendChild(s);
    setTimeout(function(){s.remove()},12000);
  }
  setInterval(fall,2200); fall();

  // Confetti on any big tap button.
  function confetti(x,y){
    var colors=['#ff4d8d','#8b5cf6','#f5c542','#ff8fab','#ffffff'];
    for(var i=0;i<28;i++){
      var s=document.createElement('span'); s.className='spark'; s.textContent='✦';
      s.style.left=(x||innerWidth/2)+'px'; s.style.top=(y||200)+'px'; s.style.color=colors[i%colors.length];
      s.style.transform='translate('+(Math.random()*140-70)+'px,'+(Math.random()*40-20)+'px)';
      document.body.appendChild(s); setTimeout((function(el){return function(){el.remove()}})(s),850);
    }
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest('.btn,.gift,.flip');
    if(b && b.classList.contains('btn')) confetti(e.clientX,e.clientY);
  });

  // Countdown to 1 November, next occurrence. On 1 Nov: IT'S TODAY!
  var el=document.getElementById('countdown');
  if(el){
    function tick(){
      var now=new Date(); var year=now.getFullYear();
      var target=new Date(year,10,1,0,0,0);
      var isToday=now.getMonth()===10 && now.getDate()===1;
      if(isToday){ el.innerHTML='<div class="today">🎉 IT\'S TODAY! 🎉<br>Happy Birthday, Aeman Fatima!</div>'; return; }
      if(target<=now) target=new Date(year+1,10,1,0,0,0);
      var d=Math.max(0,target-now);
      var days=Math.floor(d/86400000), hrs=Math.floor(d/3600000)%24, min=Math.floor(d/60000)%60, sec=Math.floor(d/1000)%60;
      var out=function(n,l){return '<div><b>'+n+'</b><span>'+l+'</span></div>'};
      el.innerHTML=out(days,'DIN')+out(hrs,'GHANTE')+out(min,'MINUTE')+out(sec,'SECOND');
    }
    tick(); setInterval(tick,1000);
  }

  // 3D tilt on hero photo (tap / move friendly, no hover-only content).
  var hero=document.querySelector('.hero-photo');
  if(hero){
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect(); var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      hero.style.transform='rotateY('+(x*14)+'deg) rotateX('+(-y*14)+'deg) scale(1.03)';
    });
    hero.addEventListener('pointerleave',function(){hero.style.transform='rotate(-1.5deg)'});
  }

  // Flip gallery cards on tap.
  document.querySelectorAll('.flip').forEach(function(card){
    card.addEventListener('click',function(){card.classList.toggle('flipped')});
  });

  // Cake: blow out all 5 candles.
  var blow=document.getElementById('blow');
  if(blow){
    blow.addEventListener('click',function(){
      document.querySelectorAll('.flame').forEach(function(f){f.classList.add('out')});
      blow.textContent='🎉 Wish Maang Li!';
      document.getElementById('cake-msg').classList.remove('hidden');
      confetti(innerWidth/2,240);
    });
  }

  // Gift: open to the dua message.
  var gift=document.getElementById('gift');
  if(gift){
    var openGift=function(){
      gift.classList.add('open'); gift.textContent='🎁✨';
      document.getElementById('gift-msg').classList.remove('hidden');
      document.getElementById('open-gift').textContent='🎉 Khul Gaya!';
      confetti(innerWidth/2,260);
    };
    gift.addEventListener('click',openGift);
    var btn=document.getElementById('open-gift');
    if(btn) btn.addEventListener('click',openGift);
  }

  // Typewriter love letter (full text stays readable even if JS is slow: it is in the page below).
  var tw=document.getElementById('typewriter');
  if(tw){
    var text=tw.getAttribute('data-text')||''; var i=0;
    (function type(){
      if(i<=text.length){ tw.textContent=text.slice(0,i); i++; setTimeout(type,22); }
    })();
  }
})();
