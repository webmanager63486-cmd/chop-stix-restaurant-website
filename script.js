const toggle=document.querySelector('.menu-toggle'), mobile=document.querySelector('.mobile-nav');
if(toggle){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});}
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
