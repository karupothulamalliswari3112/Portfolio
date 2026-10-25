(function(){
  const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
  const root=document.documentElement;

  // Theme
  const tbtn=$('#theme'), icon=tbtn.querySelector('i');
  const setIcon=()=>{icon.className=root.dataset.theme==='dark'?'fas fa-sun':'fas fa-moon'};
  if(!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme='dark';
  setIcon();
  tbtn.addEventListener('click',()=>{
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}
    setIcon();
  });

  // Mobile menu
  const nav=$('#nav'), menu=$('#menu');
  const closeMenu=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')};
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',open);
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

  // Typing effect
  const words=['Java applications','Python tools','responsive web pages','solutions to DSA problems'];
  const el=$('#typed'); let w=0,c=0,del=false;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=words[0]}
  else (function tick(){
    const word=words[w];
    el.textContent=word.slice(0,c);
    if(!del&&c===word.length){del=true;return setTimeout(tick,1600)}
    if(del&&c===0){del=false;w=(w+1)%words.length}
    c+=del?-1:1;
    setTimeout(tick,del?35:70);
  })();

  // Scroll progress, back-to-top
  const bar=$('#progress'), top=$('#top');
  addEventListener('scroll',()=>{
    const h=root.scrollHeight-innerHeight;
    bar.style.width=(h>0?scrollY/h*100:0)+'%';
    top.classList.toggle('show',scrollY>500);
  },{passive:true});
  top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  // Active nav link
  const links=[...$$('.nav a')];
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting) links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id));
  }),{rootMargin:'-40% 0px -55% 0px'});
  $$('main section[id]').forEach(s=>io.observe(s));

  // Project filter
  $$('.chip').forEach(ch=>ch.addEventListener('click',()=>{
    $$('.chip').forEach(x=>x.classList.remove('on'));
    ch.classList.add('on');
    $$('.proj').forEach(p=>{p.hidden=!(ch.dataset.f==='all'||p.dataset.cat===ch.dataset.f)});
  }));

  // Contact form: validate, then open the visitor's email app
  $('#form').addEventListener('submit',e=>{
    e.preventDefault();
    const n=$('#name').value.trim(), m=$('#email').value.trim(), g=$('#msg').value.trim(), err=$('#err');
    if(!n||!m||!g){err.textContent='Please fill in your name, email and message.';return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)){err.textContent='Enter a valid email address, for example name@company.com.';return}
    err.textContent='';
    const body=`${g}\n\nFrom: ${n} (${m})`;
    location.href=`mailto:malliswarikarupothula@gmail.com?subject=${encodeURIComponent('Internship opportunity for Malliswari')}&body=${encodeURIComponent(body)}`;
  });

  $('#year').textContent=new Date().getFullYear();
})();
