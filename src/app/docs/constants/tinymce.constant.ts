import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/fullpage';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/link';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/table';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/help';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/code';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/image';
import { environment } from 'src/environments/environment';


export const TINYCMCE_CONFIG = {
    get authToken() {
        return localStorage.getItem('pearson.devportal.authToken') || '';
      },
    skin_url: '/assets/skins/lightgray',
    plugins: 'colorpicker print preview image searchreplace autolink directionality link table code charmap hr anchor insertdatetime lists textcolor wordcount contextmenu colorpicker textpattern help',
    toolbar1: 'insertfile undo redo | formatselect | bold italic strikethrough forecolor backcolor  colorpicker | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image',
    automatic_uploads: true,
    images_upload_credentials: true,
    paste_data_images: true,
    file_browser_callback_types: 'image',
    convert_urls: true,
    relative_urls : false,
    remove_script_host : false,
    height: 350,
    images_upload_handler: function (blobInfo, success, failure) {
        var xhr, formData;
    
        xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('POST', `${environment.restBase}/uploads`);
        xhr.setRequestHeader('pearsonssosession', TINYCMCE_CONFIG.authToken); // manually set header
    
        xhr.onload = function() {
          var json;
          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
    
          json = JSON.parse(xhr.responseText);
    
          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
    
          success(json.location);
        };
    
        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
    
        xhr.send(formData);
      }
}