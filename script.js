gsap.registerPlugin(ScrollTrigger);

const $=s=>document.querySelector(s); const $$=s=>document.querySelectorAll(s);
window.addEventListener('load',()=>{setTimeout(()=>$('.loader').classList.add('done'),700);gsap.to('.reveal',{opacity:1,y:0,duration:1.1,stagger:.08,ease:'power3.out',delay:.75});});

const cursor=$('.cursor-glow'); let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
(function tick(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(tick)})();

$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.18,y=(e.clientY-r.top-r.height/2)*.18;el.style.transform=`translate(${x}px,${y}px)`});el.addEventListener('pointerleave',()=>el.style.transform='translate(0,0)')});

$$('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,rx=(.5-y/r.height)*9,ry=(x/r.width-.5)*9;card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(5px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});

$$('.effect-card').forEach(card=>card.addEventListener('click',()=>{card.animate([{filter:'brightness(1)'},{filter:'brightness(2)'},{filter:'brightness(1)'}],{duration:420})}));

gsap.to('.hero-copy',{y:-130,opacity:.35,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
gsap.to('.hero-stat',{y:-220,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.5}});
gsap.utils.toArray('.effect-card').forEach((c,i)=>gsap.from(c,{y:80,opacity:0,rotateX:8,duration:1,scrollTrigger:{trigger:c,start:'top 85%',once:true},delay:i*.06}));
gsap.to('.marquee span',{xPercent:-25,scrollTrigger:{trigger:'.marquee-section',start:'top bottom',end:'bottom top',scrub:1}});
gsap.from('.closing h2',{letterSpacing:'-.02em',scrollTrigger:{trigger:'.closing',start:'top 80%',end:'center center',scrub:1}});

const stage=$('#labStage'),target=$('.stage-target'),pos=$('#pos'),vel=$('#velocity'),depth=$('#depth');let lastX=0,lastY=0,lastT=performance.now();
stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const dx=x-lastX,dy=y-lastY,now=performance.now(),v=Math.min(999,Math.round(Math.hypot(dx,dy)/Math.max(1,now-lastT)*100));lastX=x;lastY=y;lastT=now;const rx=(y/r.height-.5)*-16,ry=(x/r.width-.5)*18;target.style.transform=`translate(-50%,-50%) translate(${(x-r.width/2)*.12}px,${(y-r.height/2)*.12}px) rotateX(${rx}deg) rotateY(${ry}deg)`;pos.textContent=`${String(Math.round(x)).padStart(2,'0')} : ${String(Math.round(y)).padStart(2,'0')}`;vel.textContent=String(v).padStart(3,'0');depth.textContent=(42+Math.round((x/r.width-.5)*30)).toString().padStart(3,'+');});
stage.addEventListener('pointerleave',()=>target.style.transform='translate(-50%,-50%)');

const sound=$('.sound');sound.addEventListener('click',()=>{const b=sound.querySelector('b');b.textContent=b.textContent==='OFF'?'ON':'OFF';sound.animate([{opacity:1},{opacity:.35},{opacity:1}],{duration:300})});

const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';$$('.scramble').forEach(el=>{const original=el.innerHTML;el.addEventListener('mouseenter',()=>{let i=0;const text=el.textContent;const timer=setInterval(()=>{el.textContent=text.split('').map((c,n)=>n<i?c:chars[Math.floor(Math.random()*chars.length)]).join('');i+=1.8;if(i>text.length){clearInterval(timer);el.innerHTML=original}},45)})});

// Lightweight Three.js particle universe: intentionally self-contained and CDN-powered.
const canvas=$('#scene');const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,100);camera.position.z=8;
const count=1800,geo=new THREE.BufferGeometry(),pts=new Float32Array(count*3),vels=new Float32Array(count);for(let i=0;i<count;i++){const r=5*Math.pow(Math.random(),.55),a=Math.random()*Math.PI*2, z=(Math.random()-.5)*7;pts[i*3]=Math.cos(a)*r;pts[i*3+1]=Math.sin(a)*r;pts[i*3+2]=z;vels[i]=.15+Math.random()*.7}geo.setAttribute('position',new THREE.BufferAttribute(pts,3));const mat=new THREE.PointsMaterial({color:0xb8aaff,size:.018,transparent:true,opacity:.7,blending:THREE.AdditiveBlending});const points=new THREE.Points(geo,mat);scene.add(points);
let px=0,py=0;addEventListener('pointermove',e=>{px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2});
(function render(t){const a=geo.attributes.position.array;for(let i=0;i<count;i++){const j=i*3,phase=t*.00025*vels[i]+i*.01;a[j]+=Math.sin(phase+a[j+1])*.0007;a[j+1]+=Math.cos(phase+a[j])*.0007;}points.rotation.y+=.0007;points.rotation.x+=.0002;points.position.x+=(px*.35-points.position.x)*.02;points.position.y+=(-py*.25-points.position.y)*.02;camera.position.x+=(px*.45-camera.position.x)*.015;camera.position.y+=(-py*.25-camera.position.y)*.015;camera.lookAt(0,0,0);renderer.render(scene,camera);requestAnimationFrame(render)})(0);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
