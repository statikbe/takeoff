// Avoid `console` errors in browsers that lack a console.
(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();

// Place any jQuery/helper plugins in here.

/**
 * equalHeights plugin
 */
(function(b){b.fn.equalHeights=function(c){var i={columns:false};var c=b.extend({},i,c);if(!c.columns){var a=0,f=this;b(f).each(function(){var d=b(this).height();if(d>a)a=d});b(f).css({'height':a+'px'})}else{var a=0,g=this,j=[];for(var e=0;e<g.length;e+=c.columns){var h=g.slice(e,e+c.columns),a=0;h.each(function(){var d=b(this).height();if(d>=a)a=d});h.css({'height':a+'px'})}}}})(jQuery);

/**
 * fancyfy plugin
 */
(function(a){a.fn.fancyfy=function(j){var o={radio:true,checkbox:true,text:false,select:true,file:true,textarea:false,not:[]};var j=a.extend({},o,j);return this.each(function(){var l=a(this);if(j.select){a('select',l).not(j.not.join(',')).each(function(h,d){var c=a(document.createElement('span')),b=a(document.createElement('ul')),k=a(document.createElement('div')),p=['fancyfied-select'],i=a(d),n=a('label[for='+i.attr('id')+']');if(i.attr('multiple'))return;b.hide();a(this).hide();var m=0;i.children().each(function(){if(this.tagName=='OPTGROUP'){var g=a(document.createElement('li'));g.html('<span class="optgroup">'+a(this).attr('label')+'</span>');b.append(g);a('option',this).each(function(){var f=a(document.createElement('li'));f.html('<a href="#" index="'+m+'" data-value="'+a(this).attr('value')+'">'+a(this).html()+'</a>');b.append(f);m++})}else{var g=a(document.createElement('li'));g.html('<a href="#" index="'+m+'" data-value="'+a(this).attr('value')+'">'+a(this).html()+'</a>');b.append(g);m++}});k.addClass('fancyfied-select-wrapper');k[0].style.zIndex=500-h;c.addClass(p.join(' ')).html('select');c.appendTo(k);b.appendTo(k);k.insertBefore(this);c.html(b.find('a').eq(i[0].selectedIndex).html());b.find('a').eq(i[0].selectedIndex).addClass('selected');b.find('a').click(function(f){f.preventDefault();a('a.selected',b).removeClass('selected');a(this).addClass('selected');if(i[0].selectedIndex!=a(this).attr('index')&&i[0].onchange){i[0].selectedIndex=a(this).attr('index');i[0].onchange()}i[0].selectedIndex=a(this).attr('index');c.html(a(this).html());b.hide();i.change();return false});n&&n.click(function(f){f.stopPropagation();f.preventDefault();c.trigger('click')});c.click(function(){if(i.attr('disabled')){return false}b.slideToggle('fast',function(){var f=a('li',b),g=a('a.selected',b).parents('li'),e=g.outerHeight()})});a(document).click(function(f){if(a(f.target).parents().index(k)==-1){if(b.is(':visible')){b.slideUp()}}})})}if(j.checkbox){a('input[type="checkbox"]',l).not(j.not.join(',')).each(function(f,g){var e=a(document.createElement('span')),h=['fancyfied-checkbox'],d=a(g),c=a('label[for='+d.attr('id')+']');if(g.checked)h.push('fancyfied-checked');e.addClass(h.join(' '));e.insertBefore(this);c&&c.click(function(){e.trigger('change')});e.click(function(){if(d.attr('disabled')){return false}d.trigger('click').trigger("change")});d.addClass('fancyfied').change(function(){this.checked&&e.addClass('fancyfied-checked')||e.removeClass('fancyfied-checked')})})}if(j.radio){a('input[type="radio"]',l).not(j.not.join(',')).each(function(g,e){var h=a(document.createElement('span')),d=['fancyfied-radio'],c=a(e).addClass('fancyfied'),b=c.attr('name'),k=a('label[for="'+c.attr('id')+'"]');if(e.checked)d.push('fancyfied-checked');h.addClass(d.join(' '));h.insertBefore(this);h.click(function(){if(c.attr('disabled'))return false;c.trigger('click')});c.change(function(){var f=a('input[name="'+b+'"]',l).prev('span.fancyfied-checked');f.removeClass('fancyfied-checked');this.checked&&h.addClass('fancyfied-checked')||h.removeClass('fancyfied-checked')})})}if(j.file){a('input[type="file"]',l).not(j.not.join(',')).each(function(f,g){var e=a(document.createElement('div')),h=['fancyfied-file'],d=a(g),c=d.attr('name'),b=a('label[for="'+d.attr('id')+'"]');d.addClass('fancyfied');e.addClass(h.join(' '));e.insertBefore(this);if(b.length!=0){e.html(a.trim(b.text()))}b.hide();b&&b.click(function(){d.trigger('click').trigger("change")});e.click(function(){d.trigger('click').trigger("change")})})}})}})(jQuery);

/**
 * placeholder plugin
 */
(function(e){var t=function(){var e=document.createElement("input");return"placeholder"in e}();var n={init:function(n){return this.each(function(){var r=e(this);if(!t){r.submit(function(){e.each(n,function(t,n){e(n,r).each(function(){var t=e(this),n=e.trim(t.attr("value")),r=e.trim(e('label[for="'+t.attr("id")+'"]').text());e('label[for="'+t.attr("id")+'"]').hide();if(n==r){t.attr("value","");return}})})})}e.each(n,function(n,i){e(i,r).each(function(){var n=e(this),r=e.trim(n.val()),i=e.trim(e('label[for="'+n.attr("id")+'"]').text());e('label[for="'+n.attr("id")+'"]').hide();if(!t){n.addClass("no-focus").attr("value",i);n.focusin(function(){n.removeClass("no-focus");if(n.attr("value")==i){n.attr("value","")}console.log(i)}).focusout(function(){if(n.attr("value")==""){n.attr("value",i);n.addClass("no-focus")}console.log(r)})}else{n.attr("placeholder",i)}})})})},attributes:function(n){if(!t){return this.each(function(){var r=e(this);if(!t){r.submit(function(){e.each(n,function(e,t){var n=t,r=$elem.attr("placeholder");if(n.val()==r){n.val("");return}})})}e.each(n,function(t,n){e(n,r).each(function(){var t=e(this),n=t.attr("placeholder");t.addClass("no-focus").attr("value",n);t.focusin(function(){t.removeClass("no-focus");if(t.val()==n){t.val("")}}).focusout(function(){if(t.val()==""){t.val(n);t.addClass("no-focus")}})})})})}else{return this}}};e.fn.placeholder=function(t){var r={method:"init",elements:['input[type="text"]','input[type="password"]','input[type="email"]','input[type="search"]',"textarea"]};var t=e.extend({},r,t);var i=t.method;if(i&&n[i]){return n[i].apply(this,[t.elements])}else if(i==="init"||!i){return n.init.apply(this,[t.elements])}e.error("Method "+i+" does not exist on jQuery.lettering");return this}})(jQuery)
