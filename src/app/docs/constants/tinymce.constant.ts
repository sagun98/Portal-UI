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

export const TINYCMCE_CONFIG = {
    skin_url: 'assets/skins/lightgray',
    plugins: 'colorpicker print preview image searchreplace autolink directionality link codesample table code charmap hr anchor insertdatetime lists textcolor wordcount contextmenu colorpicker textpattern help',
    toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor  colorpicker | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | link image',
    height: 350
}