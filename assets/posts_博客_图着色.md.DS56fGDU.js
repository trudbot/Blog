import{_ as l,c as i,j as s,a as t,a4 as e,o as a}from"./chunks/framework.Da5du0GI.js";const $=JSON.parse('{"title":"图着色","description":"","frontmatter":{"title":"图着色","mathjax":true,"tags":["图着色"],"categories":"图论","abbrlink":23124,"date":"2023-02-28 05:46:38","lastUpdated":"2023-02-28 05:46:38"},"headers":[],"relativePath":"_posts/博客/图着色.md","filePath":"_posts/博客/图着色.md","lastUpdated":1718520894000}'),n={name:"_posts/博客/图着色.md"},h={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},r={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"5.428ex",height:"1.645ex",role:"img",focusable:"false",viewBox:"0 -705 2399 727","aria-hidden":"true"},p=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D441" d="M234 637Q231 637 226 637Q201 637 196 638T191 649Q191 676 202 682Q204 683 299 683Q376 683 387 683T401 677Q612 181 616 168L670 381Q723 592 723 606Q723 633 659 637Q635 637 635 648Q635 650 637 660Q641 676 643 679T653 683Q656 683 684 682T767 680Q817 680 843 681T873 682Q888 682 888 672Q888 650 880 642Q878 637 858 637Q787 633 769 597L620 7Q618 0 599 0Q585 0 582 2Q579 5 453 305L326 604L261 344Q196 88 196 79Q201 46 268 46H278Q284 41 284 38T282 19Q278 6 272 0H259Q228 2 151 2Q123 2 100 2T63 2T46 1Q31 1 31 10Q31 14 34 26T39 40Q41 46 62 46Q130 49 150 85Q154 91 221 362L289 634Q287 635 234 637Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(888,0)"><path data-c="1D443" d="M287 628Q287 635 230 637Q206 637 199 638T192 648Q192 649 194 659Q200 679 203 681T397 683Q587 682 600 680Q664 669 707 631T751 530Q751 453 685 389Q616 321 507 303Q500 302 402 301H307L277 182Q247 66 247 59Q247 55 248 54T255 50T272 48T305 46H336Q342 37 342 35Q342 19 335 5Q330 0 319 0Q316 0 282 1T182 2Q120 2 87 2T51 1Q33 1 33 11Q33 13 36 25Q40 41 44 43T67 46Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628ZM645 554Q645 567 643 575T634 597T609 619T560 635Q553 636 480 637Q463 637 445 637T416 636T404 636Q391 635 386 627Q384 621 367 550T332 412T314 344Q314 342 395 342H407H430Q542 342 590 392Q617 419 631 471T645 554Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(1639,0)"><path data-c="1D436" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q484 659 454 652T382 628T299 572T226 479Q194 422 175 346T156 222Q156 108 232 58Q280 24 350 24Q441 24 512 92T606 240Q610 253 612 255T628 257Q648 257 648 248Q648 243 647 239Q618 132 523 55T319 -22Q206 -22 128 53T50 252Z" style="stroke-width:3;"></path></g></g></g>',1),o=[p],k=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mi",null,"N"),s("mi",null,"P"),s("mi",null,"C")])],-1),d={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},g={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.955ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 2190 1000","aria-hidden":"true"},Q=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D712" d="M576 -125Q576 -147 547 -175T487 -204H476Q394 -204 363 -157Q334 -114 293 26L284 59Q283 58 248 19T170 -66T92 -151T53 -191Q49 -194 43 -194Q36 -194 31 -189T25 -177T38 -154T151 -30L272 102L265 131Q189 405 135 405Q104 405 87 358Q86 351 68 351Q48 351 48 361Q48 369 56 386T89 423T148 442Q224 442 258 400Q276 375 297 320T330 222L341 180Q344 180 455 303T573 429Q579 431 582 431Q600 431 600 414Q600 407 587 392T477 270Q356 138 353 134L362 102Q392 -10 428 -89T490 -168Q504 -168 517 -156T536 -126Q539 -116 543 -115T557 -114T571 -115Q576 -118 576 -125Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(626,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(1015,0)"><path data-c="1D43A" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q492 659 471 656T418 643T357 615T294 567T236 496T189 394T158 260Q156 242 156 221Q156 173 170 136T206 79T256 45T308 28T353 24Q407 24 452 47T514 106Q517 114 529 161T541 214Q541 222 528 224T468 227H431Q425 233 425 235T427 254Q431 267 437 273H454Q494 271 594 271Q634 271 659 271T695 272T707 272Q721 272 721 263Q721 261 719 249Q714 230 709 228Q706 227 694 227Q674 227 653 224Q646 221 643 215T629 164Q620 131 614 108Q589 6 586 3Q584 1 581 1Q571 1 553 21T530 52Q530 53 528 52T522 47Q448 -22 322 -22Q201 -22 126 55T50 252Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(1801,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g></g></g>',1),T=[Q],E=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mi",null,"χ"),s("mo",{stretchy:"false"},"("),s("mi",null,"G"),s("mo",{stretchy:"false"},")")])],-1),c=s("h2",{id:"寻找图着色问题可行解——welsh-powell算法",tabindex:"-1"},[t("寻找图着色问题可行解——Welsh-Powell算法 "),s("a",{class:"header-anchor",href:"#寻找图着色问题可行解——welsh-powell算法","aria-label":'Permalink to "寻找图着色问题可行解——Welsh-Powell算法"'},"​")],-1),m={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},y={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.955ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 2190 1000","aria-hidden":"true"},_=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D712" d="M576 -125Q576 -147 547 -175T487 -204H476Q394 -204 363 -157Q334 -114 293 26L284 59Q283 58 248 19T170 -66T92 -151T53 -191Q49 -194 43 -194Q36 -194 31 -189T25 -177T38 -154T151 -30L272 102L265 131Q189 405 135 405Q104 405 87 358Q86 351 68 351Q48 351 48 361Q48 369 56 386T89 423T148 442Q224 442 258 400Q276 375 297 320T330 222L341 180Q344 180 455 303T573 429Q579 431 582 431Q600 431 600 414Q600 407 587 392T477 270Q356 138 353 134L362 102Q392 -10 428 -89T490 -168Q504 -168 517 -156T536 -126Q539 -116 543 -115T557 -114T571 -115Q576 -118 576 -125Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(626,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(1015,0)"><path data-c="1D43A" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q492 659 471 656T418 643T357 615T294 567T236 496T189 394T158 260Q156 242 156 221Q156 173 170 136T206 79T256 45T308 28T353 24Q407 24 452 47T514 106Q517 114 529 161T541 214Q541 222 528 224T468 227H431Q425 233 425 235T427 254Q431 267 437 273H454Q494 271 594 271Q634 271 659 271T695 272T707 272Q721 272 721 263Q721 261 719 249Q714 230 709 228Q706 227 694 227Q674 227 653 224Q646 221 643 215T629 164Q620 131 614 108Q589 6 586 3Q584 1 581 1Q571 1 553 21T530 52Q530 53 528 52T522 47Q448 -22 322 -22Q201 -22 126 55T50 252Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(1801,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g></g></g>',1),w=[_],x=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mi",null,"χ"),s("mo",{stretchy:"false"},"("),s("mi",null,"G"),s("mo",{stretchy:"false"},")")])],-1),u=e(`<p><strong>算法流程</strong></p><ol><li>将所有未着色的顶点集按度降序排序</li><li>为度最大的顶点染一个未被使用过的颜色<code>color</code></li><li>遍历未着色的所有顶点， 若其不与任何被染成<code>color</code>的顶点相邻， 则将其染成<code>color</code></li><li>若仍有未着色的顶点， 重复123步骤， 否则结束</li></ol><h3 id="举例" tabindex="-1">举例 <a class="header-anchor" href="#举例" aria-label="Permalink to &quot;举例&quot;">​</a></h3><p>以下无向图举例</p><p><img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202307091802878.png" alt="graph0"></p><p>根据度数降序排序后， 如下表所示</p><table tabindex="0"><thead><tr><th style="text-align:center;">顶点编号</th><th style="text-align:center;">5</th><th style="text-align:center;">4</th><th style="text-align:center;">9</th><th style="text-align:center;">2</th><th style="text-align:center;">0</th><th style="text-align:center;">12</th><th style="text-align:center;">10</th><th style="text-align:center;">6</th><th style="text-align:center;">3</th><th style="text-align:center;">1</th><th style="text-align:center;">8</th><th style="text-align:center;">7</th><th style="text-align:center;">11</th></tr></thead><tbody><tr><td style="text-align:center;">度数</td><td style="text-align:center;">5</td><td style="text-align:center;">5</td><td style="text-align:center;">4</td><td style="text-align:center;">4</td><td style="text-align:center;">4</td><td style="text-align:center;">3</td><td style="text-align:center;">3</td><td style="text-align:center;">3</td><td style="text-align:center;">3</td><td style="text-align:center;">3</td><td style="text-align:center;">2</td><td style="text-align:center;">2</td><td style="text-align:center;">1</td></tr></tbody></table><ul><li>第一轮染色， 5、9、2、6、7被染成相同颜色</li></ul><p><img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202307091803948.png" alt="graph1"></p><ul><li>第二轮染色， 4、12、10、3、11被染成相同颜色</li></ul><p><img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202307091802880.png" alt="graph2"></p><ul><li>第三轮染色， 0、1、8被染成相同颜色</li></ul><p><img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202307091807605.png" alt="graph3"></p><blockquote><p>以上图示使用网站工具<a href="https://csacademy.com/app/graph_editor/" target="_blank" rel="noreferrer">Graph Editor (csacademy.com)</a>绘制</p></blockquote><h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">welsh_powell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  vector</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;int&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(n, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  vector</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;int&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> v;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) v.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push_back</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  sort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(v.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">begin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), v.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> auto</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> auto</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g[a].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g[b].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cnt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; v.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">size</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); cnt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    vector</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;int&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">auto</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">u : v) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (color[u] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        t.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push_back</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(u);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        color[u] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cnt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">auto</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">adj : g[u]) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (color[adj] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) color[adj] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">auto</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">x : t) color[x] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    v </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> color;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="饱和度算法" tabindex="-1">饱和度算法 <a class="header-anchor" href="#饱和度算法" aria-label="Permalink to &quot;饱和度算法&quot;">​</a></h2><p>饱和度算法(DSatur Algorithm)是对Welsh-Powell算法的改进， 它除了考虑考虑顶点的度外， 还考虑顶点的饱和度(已着色的邻接点数量)。</p><p>DSatur算法同样不能保证得到最小着色数， 但表现上比Welsh-Powell算法更好。</p><p>详见<a href="https://www.geeksforgeeks.org/dsatur-algorithm-for-graph-coloring/" target="_blank" rel="noreferrer">DSatur Algorithm for Graph Coloring - GeeksforGeeks</a></p><h2 id="四色定理" tabindex="-1">四色定理 <a class="header-anchor" href="#四色定理" aria-label="Permalink to &quot;四色定理&quot;">​</a></h2><blockquote><p><strong>四色定理</strong>（英语：four color theorem）又称为<strong>四色地图定理</strong>（英语：four color map theorem），是一个著名的<a href="https://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%A6" target="_blank" rel="noreferrer">数学</a><a href="https://zh.wikipedia.org/wiki/%E5%AE%9A%E7%90%86" target="_blank" rel="noreferrer">定理</a>[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-pyx-1" target="_blank" rel="noreferrer">1]</a>：如果在<a href="https://zh.wikipedia.org/wiki/%E5%B9%B3%E9%9D%A2_(%E6%95%B0%E5%AD%A6)" target="_blank" rel="noreferrer">平面</a>上划出一些邻接的有限区域，那么可以用四种颜色来给这些区域染色，使得每两个邻接区域染的颜色都不一样[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-Fritsch-2" target="_blank" rel="noreferrer">2]</a>[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-soifer-3" target="_blank" rel="noreferrer">3]</a></p></blockquote><p><img src="https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202307091809944.gif" alt=""></p><blockquote><p>四色定理是第一个主要由电脑验证成立的著名数学定理。这一证明刚开始并不被所有的数学家接受。1979年，逻辑哲学和数学哲学家<a href="https://zh.wikipedia.org/w/index.php?title=%E6%89%98%E9%A9%AC%E6%96%AF%C2%B7%E8%92%82%E8%8E%AB%E5%85%B9%E4%BD%90&amp;action=edit&amp;redlink=1" target="_blank" rel="noreferrer">托马斯·蒂莫兹佐</a>在《四色定理及其哲学意义》一文中提出，四色定理与其证明能否称之为“定理”和“证明”，尚有疑问。“证明”的定义也需要进行再次审视。蒂莫兹佐的理由包括两点：一方面，计算机辅助下的证明无法由人力进行核查审阅，因为人无法重复计算机的所有运算步骤；另一方面，计算机辅助的证明无法形成逻辑上正则化的表述，因为其中的机器部分依赖于现实经验的反馈，无法转换为抽象的逻辑过程[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-22" target="_blank" rel="noreferrer">22]</a>[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-23" target="_blank" rel="noreferrer">23]</a>。即便在数学界中，对四色定理证明的误解也存在着。有的数学家认为证明是杰出的进展，也有人认为依赖计算机给出的证明很难令人满意[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-soifer-3" target="_blank" rel="noreferrer">3]</a>:197。也有人认为，计算机辅助证明数学定理不过是对人的能力进行延伸的结果，因为电子计算机不过是依照人的逻辑来进行每一步的操作，实际上只是将人能够完成的工作用更短的时间来完成[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-soifer-3" target="_blank" rel="noreferrer">3]</a>:198。还有人将计算机辅助证明和传统证明的差别比喻为借助<a href="https://zh.wikipedia.org/wiki/%E5%A4%A9%E6%96%87%E6%9C%9B%E8%BF%9C%E9%95%9C" target="_blank" rel="noreferrer">天文望远镜</a>发现新星和用肉眼发现新星的区别[<a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86#cite_note-pck-24" target="_blank" rel="noreferrer">24]</a>。</p></blockquote>`,24),f={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},b={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.778ex",height:"1.645ex",role:"img",focusable:"false",viewBox:"0 -705 786 727","aria-hidden":"true"},A=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mi"},[s("path",{"data-c":"1D43A",d:"M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q492 659 471 656T418 643T357 615T294 567T236 496T189 394T158 260Q156 242 156 221Q156 173 170 136T206 79T256 45T308 28T353 24Q407 24 452 47T514 106Q517 114 529 161T541 214Q541 222 528 224T468 227H431Q425 233 425 235T427 254Q431 267 437 273H454Q494 271 594 271Q634 271 659 271T695 272T707 272Q721 272 721 263Q721 261 719 249Q714 230 709 228Q706 227 694 227Q674 227 653 224Q646 221 643 215T629 164Q620 131 614 108Q589 6 586 3Q584 1 581 1Q571 1 553 21T530 52Q530 53 528 52T522 47Q448 -22 322 -22Q201 -22 126 55T50 252Z",style:{"stroke-width":"3"}})])])],-1),F=[A],B=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mi",null,"G")])],-1),v={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},D={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"1.778ex",height:"1.645ex",role:"img",focusable:"false",viewBox:"0 -705 786 727","aria-hidden":"true"},C=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mi"},[s("path",{"data-c":"1D43A",d:"M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q492 659 471 656T418 643T357 615T294 567T236 496T189 394T158 260Q156 242 156 221Q156 173 170 136T206 79T256 45T308 28T353 24Q407 24 452 47T514 106Q517 114 529 161T541 214Q541 222 528 224T468 227H431Q425 233 425 235T427 254Q431 267 437 273H454Q494 271 594 271Q634 271 659 271T695 272T707 272Q721 272 721 263Q721 261 719 249Q714 230 709 228Q706 227 694 227Q674 227 653 224Q646 221 643 215T629 164Q620 131 614 108Q589 6 586 3Q584 1 581 1Q571 1 553 21T530 52Q530 53 528 52T522 47Q448 -22 322 -22Q201 -22 126 55T50 252Z",style:{"stroke-width":"3"}})])])],-1),H=[C],L=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mi",null,"G")])],-1),M={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},z={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"9.103ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 4023.6 1000","aria-hidden":"true"},P=e('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D712" d="M576 -125Q576 -147 547 -175T487 -204H476Q394 -204 363 -157Q334 -114 293 26L284 59Q283 58 248 19T170 -66T92 -151T53 -191Q49 -194 43 -194Q36 -194 31 -189T25 -177T38 -154T151 -30L272 102L265 131Q189 405 135 405Q104 405 87 358Q86 351 68 351Q48 351 48 361Q48 369 56 386T89 423T148 442Q224 442 258 400Q276 375 297 320T330 222L341 180Q344 180 455 303T573 429Q579 431 582 431Q600 431 600 414Q600 407 587 392T477 270Q356 138 353 134L362 102Q392 -10 428 -89T490 -168Q504 -168 517 -156T536 -126Q539 -116 543 -115T557 -114T571 -115Q576 -118 576 -125Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(626,0)"><path data-c="28" d="M94 250Q94 319 104 381T127 488T164 576T202 643T244 695T277 729T302 750H315H319Q333 750 333 741Q333 738 316 720T275 667T226 581T184 443T167 250T184 58T225 -81T274 -167T316 -220T333 -241Q333 -250 318 -250H315H302L274 -226Q180 -141 137 -14T94 250Z" style="stroke-width:3;"></path></g><g data-mml-node="mi" transform="translate(1015,0)"><path data-c="1D43A" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q492 659 471 656T418 643T357 615T294 567T236 496T189 394T158 260Q156 242 156 221Q156 173 170 136T206 79T256 45T308 28T353 24Q407 24 452 47T514 106Q517 114 529 161T541 214Q541 222 528 224T468 227H431Q425 233 425 235T427 254Q431 267 437 273H454Q494 271 594 271Q634 271 659 271T695 272T707 272Q721 272 721 263Q721 261 719 249Q714 230 709 228Q706 227 694 227Q674 227 653 224Q646 221 643 215T629 164Q620 131 614 108Q589 6 586 3Q584 1 581 1Q571 1 553 21T530 52Q530 53 528 52T522 47Q448 -22 322 -22Q201 -22 126 55T50 252Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(1801,0)"><path data-c="29" d="M60 749L64 750Q69 750 74 750H86L114 726Q208 641 251 514T294 250Q294 182 284 119T261 12T224 -76T186 -143T145 -194T113 -227T90 -246Q87 -249 86 -250H74Q66 -250 63 -250T58 -247T55 -238Q56 -237 66 -225Q221 -64 221 250T66 725Q56 737 55 738Q55 746 60 749Z" style="stroke-width:3;"></path></g><g data-mml-node="mo" transform="translate(2467.8,0)"><path data-c="2264" d="M674 636Q682 636 688 630T694 615T687 601Q686 600 417 472L151 346L399 228Q687 92 691 87Q694 81 694 76Q694 58 676 56H670L382 192Q92 329 90 331Q83 336 83 348Q84 359 96 365Q104 369 382 500T665 634Q669 636 674 636ZM84 -118Q84 -108 99 -98H678Q694 -104 694 -118Q694 -130 679 -138H98Q84 -131 84 -118Z" style="stroke-width:3;"></path></g><g data-mml-node="mn" transform="translate(3523.6,0)"><path data-c="34" d="M462 0Q444 3 333 3Q217 3 199 0H190V46H221Q241 46 248 46T265 48T279 53T286 61Q287 63 287 115V165H28V211L179 442Q332 674 334 675Q336 677 355 677H373L379 671V211H471V165H379V114Q379 73 379 66T385 54Q393 47 442 46H471V0H462ZM293 211V545L74 212L183 211H293Z" style="stroke-width:3;"></path></g></g></g>',1),S=[P],V=s("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("mi",null,"χ"),s("mo",{stretchy:"false"},"("),s("mi",null,"G"),s("mo",{stretchy:"false"},")"),s("mo",null,"≤"),s("mn",null,"4")])],-1),j=e('<h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://zh.wikipedia.org/wiki/%E5%9B%BE%E7%9D%80%E8%89%B2%E9%97%AE%E9%A2%98" target="_blank" rel="noreferrer">图着色问题 - 维基百科，自由的百科全书 (wikipedia.org)</a></p><p><a href="https://zh.wikipedia.org/wiki/%E5%9B%9B%E8%89%B2%E5%AE%9A%E7%90%86" target="_blank" rel="noreferrer">四色定理 - 维基百科，自由的百科全书 (wikipedia.org)</a></p><p><a href="https://zh.wikipedia.org/wiki/%E7%8B%AC%E7%AB%8B%E9%9B%86" target="_blank" rel="noreferrer">独立集 - 维基百科，自由的百科全书 (wikipedia.org)</a></p><p><a href="https://zh.wikipedia.org/wiki/NP%E5%AE%8C%E5%85%A8" target="_blank" rel="noreferrer">NP完全 - 维基百科，自由的百科全书 (wikipedia.org)</a></p><p><a href="https://betterprogramming.pub/demystify-graph-coloring-algorithms-9ae51351ea5b" target="_blank" rel="noreferrer">Demystify Graph Coloring Algorithms | by Edward Huang | Better Programming</a></p><p><a href="https://oi-wiki.org/graph/color/#welshpowell-%E7%AE%97%E6%B3%95" target="_blank" rel="noreferrer">图的着色 - OI Wiki (oi-wiki.org)</a></p><p><a href="https://www.geeksforgeeks.org/welsh-powell-graph-colouring-algorithm/" target="_blank" rel="noreferrer">Welsh Powell Graph colouring Algorithm - GeeksforGeeks</a></p><p><a href="https://zhuanlan.zhihu.com/p/385512430" target="_blank" rel="noreferrer">图论--图的着色 - 知乎 (zhihu.com)</a></p>',9);function Z(G,q,I,N,J,R){return a(),i("div",null,[s("p",null,[t("图着色问题(Graph Coloring Problem)是一个著名的"),s("mjx-container",h,[(a(),i("svg",r,o)),k]),t("问题， 其内容是， 对于给定的无向图， 为每个顶点指定一颜色， 且使得相邻的顶点颜色不相同。")]),s("p",null,[t("将图G以如上规则着色所需要的最少颜色数表示为"),s("mjx-container",d,[(a(),i("svg",g,T)),E]),t(", 被称为最小着色数。")]),c,s("p",null,[t("welsh-powell算法用于找出一个"),s("mjx-container",m,[(a(),i("svg",y,w)),x]),t("不超过 图的最大度 + 1 的图着色问题的解。")]),u,s("p",null,[t("**平面图：**如果无向图"),s("mjx-container",f,[(a(),i("svg",b,F)),B]),t("能在平面上画出图解， 且没有任何边存在交叉， 则"),s("mjx-container",v,[(a(),i("svg",D,H)),L]),t("是一个平面图。")]),s("p",null,[t("一张地图即可抽象为一个平面图， 四色定理也就说明， 对于平面图， "),s("mjx-container",M,[(a(),i("svg",z,S)),V]),t(".")]),j])}const O=l(n,[["render",Z]]);export{$ as __pageData,O as default};
