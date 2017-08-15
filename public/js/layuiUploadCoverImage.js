layui.use('upload', function(){
    layui.upload({
        url: '/upload/coverImage',
        elem:'#testPicture'
        ,success: function(res){
            console.log(res); //上传成功返回值，必须为json格式
            $('#LAY_demo_upload_picture').attr('src', res.url);
        }
    });
});
function setLayuiUploadImage() {
    let coverImageUrl = JSON.parse(localStorage.getItem('CoverImageUrl'));
    console.log(coverImageUrl);
    $('#LAY_demo_upload_picture').attr('src', coverImageUrl);
}
function saveCoverImageUrl() {
    localStorage.setItem('CoverImageUrl', JSON.stringify($('#LAY_demo_upload_picture').attr('src')));
}