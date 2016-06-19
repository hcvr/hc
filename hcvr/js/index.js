var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

/*$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});
*/
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
	
  msg = $('.message-input').val();
  
  if ($.trim(msg) == '') {
    return false;
  }
  
  console.log('insertMessage  msg  '+msg);
  
  if (IF_NET) {
											
			
			ajaxRequest(false, "POST", 'sendmsg', msg, function(result) {
			
			
						if (result.code != 10000) {
							
							
							Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);
						
						
						} else {
							
							
							Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'调取 发表留言 接口 成功  '
							    }
							);
							
							 
						  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
						  
						  setDate();
						  
						  $('.message-input').val(null);
						  
						  updateScrollbar();
						  
						  fakeMessage();
						    
							  
						}
						
				
					}, errorReturn);
			
		}	
  
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

// 调取 获取留言接口
function fakeMessage() {
	
	$('<div class="message loading new"><figure class="avatar"><img src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80_4.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
							  
  	updateScrollbar();
							
  	if (IF_NET) {
											
			
			ajaxRequest(false, "get", 'getmsg', '', function(result) {
			
			
						if (result.code != 10000) {
							
							
							Lobibox.alert(
							    'error', // Any of the following
							    {
							        msg:result.msg
							    }
							);
						
						
						} else {
							
							
							Lobibox.alert(
							    'success', // Any of the following
							    {
							        msg:'调取 获取留言 接口 成功  '
							    }
							);
							
							  /*if ($('.message-input').val() != '') {
							    return false;
							  }*/
							 
						    $('.message.loading').remove();
							 
							for (var i = 0; i < result.data.length; i++) {
								
							    $('<div class="message new"><figure class="avatar"><img src="'+ result.data[i].avatar_large +'" /></figure>' + result.data[i].msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
							    setDate();
							    updateScrollbar();
								
							} 
						    
							  
						}
						
				
					}, errorReturn);
			
		}	
	
  
}