window.Air={Models:{},Collections:{},Views:{},Routers:{},init:function(){"use strict";Air.router=new Air.Routers.App,Backbone.history.start()}},$(document).ready(function(){"use strict";Air.init()}),this.JST=this.JST||{},Air.Models=Air.Models||{},function(){"use strict";Air.Models.Station=Backbone.Model.extend({defaults:{},url:"local/fake-stations.json",parse:function(a){return a}})}(),Air.Routers=Air.Routers||{},function(){"use strict";Air.Routers.App=Backbone.Router.extend({routes:{"":"fresh"},fresh:function(){Air.map=Air.map||L.mapbox.map("paulo-map","devseed.j586d1hp").setView([-23.557,-46.656],11);var a=new Air.Models.Station,b=new Air.Collections.Hours;$(".modal").each(function(){new Air.Views.Modal({el:"#"+this.id})}),new Air.Views.Score({el:"#scorecard",id:"scorecard",collection:b}),new Air.Views.Chart({el:"#hourly-chart",id:"hourly-chart",collection:b,wait:!0}),new Air.Views.Localtime({el:"#local-time",id:"local-time"}),Air.map.whenReady(function(){new Air.Views.Map({el:"#paulo-map",id:"paulo-map",model:a}),new Air.Views.Haze({model:a}),a.fetch({reset:!0})});var c=[];Air.map.on("popupopen",function(){c.push(new Air.Views.Chart({el:"#pop-chart-container",id:"pop-chart-container",collection:b,wait:!1}))}),Air.map.on("popupclose",function(){_.each(c,function(a){a.remove()})}),$(window).resize(function(){this.resizeTo&&clearTimeout(this.resizeTo),this.resizeTo=setTimeout(function(){$(this).trigger("resizeEnd"),Air.map.closePopup()},300)}),b.fetch({reset:!0})}})}(),Air.Views=Air.Views||{},function(){"use strict";Air.Views.Map=Backbone.View.extend({initialize:function(){this.listenTo(this.model,"change",this.render);var a=$.proxy(this.resetSvg,this);Air.map.on("viewreset",a)},render:function(){var a=d3.geo.transform({point:function(a,b){var c=Air.map.latLngToLayerPoint([b,a]);this.stream.point(c.x,c.y)}}),b=d3.max(_.map(this.model.get("features"),function(a){return a.properties["pm_2.5"]}));this.popup=L.popup({closeOnClick:!1,className:"map-pop",autoPanPaddingTopLeft:[0,70]}),this.r=d3.scale.quantize().domain([0,b]).range([10,30,50]),this.path=d3.geo.path().projection(a),this.svg=d3.select(Air.map.getPanes().overlayPane).append("svg:svg"),this.g=this.svg.append("svg:g").attr("class","leaflet-zoom-hide");var c=$.proxy(this.click,this);this.points=this.g.selectAll(".station").data(this.model.get("features")).enter().append("circle").attr("class","station").attr("r",0).on("click",c),this.resetSvg()},template:_.template($("#popup-template").html()),click:function(a){var b=Air.map.layerPointToLatLng([a.x,a.y]);this.popup.setLatLng(b).setContent(this.template({place:a.properties.name,src:"images/fake-station.jpg"})).openOn(Air.map)},translatePoint:function(a){var b=a.geometry.coordinates,c=Air.map.latLngToLayerPoint(new L.latLng([b[1],b[0]]));return"translate("+c.x+","+c.y+")"},getPoint:function(a){var b=a.geometry.coordinates,c=Air.map.latLngToLayerPoint(new L.latLng([b[1],b[0]]));return c},resetSvg:function(){var a=this.path.bounds(this.model.attributes),b=a[0],c=a[1];this.svg.attr("width",c[0]-b[0]+100).attr("height",c[1]-b[1]+100).style("left",b[0]-50+"px").style("top",b[1]-50+"px");var d=[-b[0]+50,-b[1]+50];this.g.attr("transform","translate("+d[0]+","+d[1]+")");for(var e=this.model.get("features"),f=[],g=0,h=e.length;h>g;++g)f.push(this.getPoint(e[g]));this.points.attr("cx",function(a,b){return a.x=f[b].x,a.x}).attr("cy",function(a,b){return a.y=f[b].y,a.y});var i=this.r;this.points.transition().delay(function(a,b){return 600+200*b}).duration(600).attr("r",function(a){return i(a.properties["pm_2.5"])})}})}(),Air.Views=Air.Views||{},function(){"use strict";Air.Views.Modal=Backbone.View.extend({events:{"click .close":"close"},initialize:function(){var a=$.proxy(this.close,this);$("body").one("click",a)},close:function(){var a=this.$el;a.fadeOut(200,function(){a.remove()})}})}(),Air.Views=Air.Views||{},function(){"use strict";Air.Views.Haze=Backbone.View.extend({events:{},template:'<div id="haze"></div>',initialize:function(){this.listenTo(this.model,"change",this.render),$(Air.map.getPanes().mapPane).before(this.template),this.$el=$("#haze")},render:function(){var a=this.$el;window.setTimeout(function(){a.addClass("poor")},1500)}})}(),Air.Views=Air.Views||{},function(){"use strict";Air.Views.Score=Backbone.View.extend({events:{},initialize:function(){this.$now=this.$("#condition-now"),this.render()},render:function(){this.$now.css({"background-color":"#FFDC73"}).text("Poor")}})}(),Air.Models=Air.Models||{},function(){"use strict";Air.Models.Hour=Backbone.Model.extend({defaults:{pm25:-1,pm10:-1,day:-1,hour:-1},parse:function(a){return a}})}(),Air.Collections=Air.Collections||{},function(){"use strict";Air.Collections.Hours=Backbone.Collection.extend({model:Air.Models.Hour,url:"local/fake-hourly.json",parse:function(a){return a}})}(),Air.Views=Air.Views||{},function(){"use strict";Air.Views.Chart=Backbone.View.extend({events:{},initialize:function(a){$(window).bind("resizeEnd",$.proxy(this.resizeHandler,this)),!a.wait&&this.collection.length?this.render():this.listenTo(this.collection,"reset",this.render)},resizeHandler:function(){this.$el.fadeOut(150,function(){this.resize(),this.$el.fadeIn(250)}.bind(this))},dragmove:function(){this.pos-=d3.event.dx,this.pos<this.limit||this.pos>20?this.bounceBack=!0:this.lastpos=this.pos,this.base.style("right",this.pos+"px")},dragend:function(){this.bounceBack&&(this.bounceBack=!1,this.pos=this.lastpos,this.base.transition().duration(200).style("right",this.pos+"px"))},resize:function(){if(!this.$el.is(":visible")){var a=this.collection.length/24,b=this.$el.width()*a;this.x.range([0,b]);var c=this.x,d=c(2)-c(1),e=Math.floor(d/2)-2;0>e&&(e=Math.floor(d/2)||1),this.base.attr("width",b),this.bars[0].attr("x",function(a,b){return c(b)-e}).attr("width",e),this.bars[1].attr("x",function(a,b){return c(b)}).attr("width",e),this.xAxis.attr("transform",function(a){return"translate("+c(a.index)+",14)"}),this.pos=b*this.pos/this.width,this.base.style("right",this.pos+"px"),this.limit=-b/a*(a-1)-50,this.width=b}},render:function(){var a=this.collection.length,b=a/24,c=this.margin=[5,15,20,15],d=this.width=this.$el.width()*b-c[1]-c[3],e=120-c[0]-c[2];this.pos=0,this.nextpos=0,this.limit=-d/b*(b-1)-50;var f=$.proxy(this.dragmove,this),g=$.proxy(this.dragend,this),h=d3.behavior.drag().on("drag",f).on("dragend",g),i=this.base=d3.select("#"+this.id).append("svg:svg").attr("width",d+c[1]+c[3]).attr("height",e+c[0]+c[2]).attr("class","slider drag").call(h),j=i.append("g").attr("class","bar-chart").attr("transform","translate("+c[3]+","+c[0]+")"),k=d3.max(this.collection.pluck("pm10").concat(this.collection.pluck("pm25"))),l=this.x=d3.scale.linear().domain([0,a]).range([0,d]),m=d3.scale.linear().range([e,0]).domain([0,k]),n=l(1)-l(0),o=Math.floor(n/2)-2;0>o&&(o=Math.floor(n/2)||1);var p=[];_.each(this.collection.models,function(a,b){a.attributes.hour%6===0&&p.push({hour:a.attributes.hour+":00",index:b})}),this.xAxis=i.append("g").attr("class","x axis").attr("transform","translate("+c[3]+","+(e+c[0])+")").selectAll(".tick").data(p).enter().append("text").attr("class","tick").attr("text-anchor","middle").attr("transform",function(a){return"translate("+l(a.index)+",14)"}).text(function(a){return a.hour}),$("#hourly-max").html(Math.ceil(k)+" &ndash;"),$("#hourly-mid").html(Math.ceil(k/2)+" &ndash;"),$("#hourly-min").html("0 &ndash;");var q=_.template("<h3><%= date %></h3><p>PM 2.5: <%= pm25 %><br />PM10: <%= pm10 %></p>"),r=d3.tip().attr("class","d3-tip").html(function(a){return q({date:["August",a.get("day"),a.get("hour")+":00"].join(" "),pm25:a.get("pm25"),pm10:a.get("pm10")})});j.call(r);var s=j.selectAll(".pm25").data(this.collection.models).enter().append("rect").attr("class","pm25").attr("x",function(a,b){return l(b)-o}).attr("y",e).attr("width",o).attr("height",0).on("mouseover",r.show).on("mouseout",r.hide),t=j.selectAll(".pm10").data(this.collection.models).enter().append("rect").attr("class","pm10").attr("x",function(a,b){return l(b)}).attr("y",e).attr("width",o).attr("height",0).on("mouseover",r.show).on("mouseout",r.hide);s.transition().duration(200).delay(function(b,c){return 30*(a-c)}).attr("y",function(a){return m(a.attributes.pm25)}).attr("height",function(a){return e-m(a.attributes.pm25)}),t.transition().duration(200).delay(function(b,c){return 30*(a-c)}).attr("y",function(a){return m(a.attributes.pm10)}).attr("height",function(a){return e-m(a.attributes.pm10)}),this.bars=[s,t]}})}(),Air.Views=Air.Views||{},function(){"use strict";Air.Views.Localtime=Backbone.View.extend({events:{},template:_.template('<h3 class="local"><%= local %></h3> <label class="gray">last updated <%= last %></label>'),initialize:function(){this.render()},render:function(){var a=this.$el,b=new Date,c=b.getUTCMinutes(),d=b.getUTCHours()-3;0>d&&(d=24-d),10>c&&(c="0"+c),a.html(this.template({local:d+":"+c,last:d+":00"}));var e=this.$(".local");window.setInterval(function(){c=parseInt(c,10)+1,c>59?(c="00",d=d>24?0:d+1):10>c&&(c="0"+c),e.html(d+":"+c)},6e4)}})}();