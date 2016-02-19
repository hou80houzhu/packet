/*!
 * @packet opensite.mobi.util.file;
 */var file=function(e){this.file=e,this.request=null};file.prototype.getFile=function(){return this.file},file.prototype.fileName=function(){return this.file?this.file.name:""},file.prototype.fileSize=function(){return this.file.size||-1},file.prototype.fileType=function(){return this.file?this.file.type:""},file.prototype.clean=function(){for(var e in this)this[e]=null;return this},file.prototype.getURI=function(e){var t=this,i=new FileReader;i.onload=function(i){e&&e.call(t,i.target.result)},i.readAsDataURL(this.file)},file.prototype.getImage=function(e){var t=this;-1!==this.file.type.indexOf("image")&&this.getURI(function(i){$.loader().image(i,function(){e&&e.call(t,this)})})},file.prototype.getCanvasImage=function(e,t,i){-1!==this.file.type.indexOf("image")&&this.getURI(function(n){$.loader().image(n,function(){var n=document.createElement("canvas");n.width=e,n.height=t;var o,a,r,l,s=n.getContext("2d");r=this.width/this.height*t,e>=r?(l=t,o=(e-r)/2,a=0):(l=this.height/this.width*e,t>=l?(r=e,o=0,a=(t-l)/2):(r=this.width,l=this.height,o=(e-this.width)/2,a=(t-this.height)/2)),s.drawImage(this,o,a,r,l),i&&i(n)})})},file.prototype.getBlob=function(e){this.getURI(function(t){var i=getBlobFromURI(t);e&&e.call(this,i)})},file.prototype.saveAs=function(e){this.getBlob(function(t){saveAs(t,e)})},file.prototype.upload=function(e){var t=this,i=new FormData;i.append(e.name,this.file),i.append("filename",this.file.name),i.append("filesize",this.file.size),i.append("filetype",this.file.type);for(var n in e.data)i.append(n,e.data[n]);$.ajax({url:e.url||null,data:i,method:"post",dataType:"json",asysn:e.asysn,out:e.out,headers:{},events:{load:function(i){if(e.success){var n=this.response.responseText;if("json"===e.dataType)try{n=window.JSON.parse(n)}catch(i){n={}}e.success.call(t,n)}},progress:function(i){e.progress&&e.progress.call(t,{total:i.total,loaded:i.loaded,percent:Math.round(100*i.loaded/i.total)})},error:function(i){e.error&&e.error.call(t,i)}}})};var getBlobFromURI=function(e){var t=";base64,";if(-1===e.indexOf(t)){var i=e.split(","),n=i[0].split(":")[1],o=i[1];return new Blob([o],{type:n})}for(var i=e.split(t),n=i[0].split(":")[1],a=atob(i[1]),r=new ArrayBuffer(a.length),l=new Uint8Array(r),s=0;s<a.length;s++)l[s]=a.charCodeAt(s);return new Blob([r],{type:n})},saveAs=function(e,t){var i=e.type,n="application/octet-stream";if(i&&i!==n){var o=e.slice||e.webkitSlice||e.mozSlice;e=o.call(e,0,e.size,n)}var a=URL.createObjectURL(e);$().create("a").attr("href",a).attr("download",t).trigger("click")};module.exports={set:function(e){return new file(e)},getBlobFromURI:function(e){return getBlobFromURI(e)},saveAs:function(e,t){saveAs(e,t)}};