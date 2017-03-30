;(function($){

	$("#fileupload").click(function(){
		$.ajaxFileUpload({
			url:'hbs-ajax-file-upload',
			type:'post',
			data:{param1:'zhangsan',param2:'lisi'},
			secureuri: false,
			dataType:'json',
			fileElementId:'myfile',
			complete:function(data){
				console.log(data)
			},
			success:function(data){
				console.log(data);
				alert(data.status);
			},
			error:function(data){
				console.log(data)
			}
		})
	})

})(jQuery);