(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ce35a44"],{1010:function(t,a,s){"use strict";s("d20a")},"86bf":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t._self._c;t._self._setupProxy;return a("div",{staticClass:"gallery"},t._l(t.rawData.photoset,(function(s){return a("div",{staticClass:"image-grid"},[a("div",{staticClass:"image-wrap",style:{"background-image":"url("+s.primary_photo_extras.url_m+")"}},[a("span",{staticClass:"image-title"},[t._v(t._s(s.title._content))]),a("div",{staticClass:"image-inner",on:{click:function(a){return t.goToAlbum(s.id)}}})])])})),0)},i=[],r=s("9ab4"),o=s("1b40"),n=s("79f6");let l=class extends o["c"]{constructor(){super(...arguments),this.rawData={}}created(){this.getAlbumGo()}async getAlbumGo(){const{data:t}=await Object(n["a"])({primary_photo_extras:"owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o"});t&&(this.rawData=t.photosets)}goToAlbum(t){this.$router.push({name:"Album",query:{id:t}})}};l=Object(r["a"])([o["a"]],l);var u=l,c=u,_=(s("1010"),s("2877")),m=Object(_["a"])(c,e,i,!1,null,"1a7ac54e",null);a["default"]=m.exports},d20a:function(t,a,s){}}]);
//# sourceMappingURL=chunk-5ce35a44.80f82705.js.map