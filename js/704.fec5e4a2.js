"use strict";(self["webpackChunkcaitvi"]=self["webpackChunkcaitvi"]||[]).push([[704],{3704:function(t,i,o){o.r(i),o.d(i,{default:function(){return r}});var e=function(){var t=this,i=t._self._c;return i("header",{staticClass:"h-16 bg-gray-950 flex items-center justify-center"},[i("h1",{staticClass:"text-white text-xl font-bold cursor-pointer",on:{click:function(i){t.showSound=!t.showSound}}},[t._v("CaitVi")]),t.showSound?[i("i",{staticClass:"el-icon-video-play text-white cursor-pointer ml-2 text-[18px]",on:{click:t.playSound}}),i("i",{staticClass:"el-icon-video-pause text-white cursor-pointer ml-2 text-[18px]",on:{click:t.pauseSound}}),i("i",{staticClass:"el-icon-refresh-right text-white cursor-pointer ml-2 text-[18px]",on:{click:t.stopSound}})]:t._e()],2)},s=[],u={name:"HeaderLayout",data(){return{audio:null,showSound:!1}},mounted(){this.audio=new Audio("/sound/caitvi.mp3")},methods:{async playSound(){try{this.audio||(this.audio=new Audio("/sound/caitvi.mp3")),await this.audio.play()}catch(t){console.error("播放音效失敗:",t)}},pauseSound(){this.audio&&this.audio.pause()},stopSound(){this.audio&&(this.audio.pause(),this.audio.currentTime=0)}},beforeUnmount(){this.audio&&(this.audio.pause(),this.audio=null)}},a=u,n=o(1656),c=(0,n.A)(a,e,s,!1,null,null,null),r=c.exports}}]);
//# sourceMappingURL=704.fec5e4a2.js.map