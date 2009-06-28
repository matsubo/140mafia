// ==UserScript==
// @name           140mafia
// @namespace      http://www.tymy.net/~matsu/blog/
// @description    140mafia background link fetcher. cvtUrlToLink.user.js is required.
// @include        http://140mafia.com/profile?id=*
// ==/UserScript==
/**
 * CHANGELOG:
 * v1.0 09/6/27 publish
 * v1.1 09/6/28 disable multi post on the same porfile page
 * v1.2 09/6/28 disable iframe load when submiting invitation link
 * 
 * TODOS:
 * Work independently
 * 
 * @version $Id:$
 */


(function(){
  
  /** Modify our invitation URL */
  var my_invitation = 'http://140mafia.com/invite/direct_link?uid=1000196995';
  
  
  var aTags = document.getElementsByTagName("a");
  var max = aTags.length;
  
  
  // post if my invitation url is not post.
  var is_post = false;
  for(var index = 0; index < max; index++){
    var element = aTags[index];
    var url = element.getAttribute("href");

    if(url == my_invitation){
      is_post = true;
    }
  }
  
  if(!is_post){
    var comment = document.getElementById("message");
    comment.innerHTML = my_invitation;
    
    var send = document.getElementById("send");
    send.parentNode.submit();
    
    return;
  }

  
  for(var index = 0; index < max; index++){
    var pattern = /^http:\/\/140mafia\.com\/invite\/direct_link\?uid=/;
    var element = aTags[index];
    var url = element.getAttribute("href");
    
    if (pattern.test(url)){
     var iframe =  document.createElement('iframe');
     iframe.style.border = '1px solid #FF0000';
     iframe.frameBorder = '0';
     iframe.style.display = 'hidden';
     iframe.style.height = '1px';
     iframe.style.width = '1px';
     iframe.src = url;
     
     aTags[index].parentNode.appendChild(iframe);
    }
  }

  
})();

