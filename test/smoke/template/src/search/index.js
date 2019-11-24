import $ from 'jquery';
// import {common} from '../common/common'

function asyncLoad () {
  import('./text.js').then((text) => {
    // console.log(text);
    text.default();
  });
}

$(function () {
  $('#button').on('click', function () {
    asyncLoad();
  });
});
