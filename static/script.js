let filter_source = $("#filter-template").html();

$(document).ready(function(){
  getrecommended();
  getpopular();
  getjazwood();
  bollywood();

  /*Function for movie mouse over*/
  $(document).on('mouseover',".movie", function() {
    $(".text").removeClass('summary');
    var id = $(this).data('id');
    if(id != undefined){
      $(".text_"+id).addClass('summary');
    }
  });

  $(document).on('click','.playvideo',function(){
    var elem = document.getElementById("myvideo");
    if (elem.webkitRequestFullscreen) {
      $("#myvideo").addClass('mui--show').removeClass('mui--hide');
      elem.webkitRequestFullscreen();
    }
  })
  
  /*Function for filtering movie*/
  $(document).on('click','.sortfilter',function(){
    let template = Handlebars.compile(filter_source);
    let id = $(this).attr('id');
    var text = this.outerText;
    let url = 'http://dummycatalog.icflix.io/api/v1/assets/?ordering='+id
    $.ajax({
      method:'GET',
      crossDomain: true,
      url :url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
      },
      ContentType: 'application/json',
      success : function(data,section) {
        var response = data.results;
        $(".homepagewrapper").html('');
        $('.filterresult').html(template({data_resp:response,isSorted:text}));
      }
    })
  });

  /*Function for movie detail*/
  $(document).on('click','.movie',function(e){
    e.preventDefault();
    getasset(this)
    getmore(this)
  });
});

function getasset(item){
  let asset_source = $("#assetpage-template").html();
  let template = Handlebars.compile(asset_source);
  let id = $(item).data('id');
  let section = $(item).data('section');
  let url = 'https://dummycatalog.icflix.io/api/v1/assets/?section='+section
  $.ajax({
    method:'GET',
    crossDomain: true,
    url :url,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
    },
    ContentType: 'application/json',
    success : function(data,section) {
      var response = data.results;
      $(".homepagewrapper").html('');
      $('.filterresult').html('');
      $.each(response, function(i, v) {
        if (v.id == id) {
          $('.assetpagewrapper').html(template(v));
        }
      });
    }
  })
}

function getmore(item){
  let morelikethis_source = $("#morelikehis-template").html();
  let template = Handlebars.compile(morelikethis_source);
  let section = $(item).data('section');
  let url = 'https://dummycatalog.icflix.io/api/v1/assets/?limit=07&section='+section
  $.ajax({
    method:'GET',
    crossDomain: true,
    url :url,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
    },
    ContentType: 'application/json',
    success : function(data,section) {
      var response = data.results;
      $(".homepagewrapper").html('');
      $('.filterresult').html('');
      $('.morelikethis').html(template({data_resp:response}));
    }
  })
}

function getrecommended(){
  let source = $("#homepage-template").html(); 
  let template = Handlebars.compile(source);
  $.ajax({
    method:'GET',
    crossDomain: true,
    url :'https://dummycatalog.icflix.io/api/v1/assets/?limit=07&offset=100',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
    },
    ContentType: 'application/json',
    success : function(data) {
      var response = data.results;
      $('.recommended').html(template({data_resp:response,homepageview:true}));
    }
  });
  Handlebars.registerHelper('times', function(n, block) {
      var accum = '';
      for(var i = 0; i < n; ++i)
          accum += block.fn(i);
      return accum;
  });
}

function getpopular(){
  let source = $("#hollywood-template").html(); 
  let template = Handlebars.compile(source);
  $.ajax({
    method:'GET',
    crossDomain: true,
    url :'https://dummycatalog.icflix.io/api/v1/assets/?limit=07&section=hollywood',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
    },
    ContentType: 'application/json',
    success : function(data) {
      var response = data.results;
      $('.hollywood').html(template({data_resp:response,homepageview:true}));
    }
  });
  Handlebars.registerHelper('times', function(n, block) {
      var accum = '';
      for(var i = 0; i < n; ++i)
          accum += block.fn(i);
      return accum;
  });
}

function getjazwood(){
  let source = $("#jazwood-template").html(); 
  let template = Handlebars.compile(source);
  $.ajax({
    method:'GET',
    crossDomain: true,
    url :'https://dummycatalog.icflix.io/api/v1/assets/?limit=07&section=jazwood',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
    },
    ContentType: 'application/json',
    success : function(data) {
      var response = data.results;
      $('.jazwood').html(template({data_resp:response,homepageview:true}));
    }
  });
  Handlebars.registerHelper('times', function(n, block) {
      var accum = '';
      for(var i = 0; i < n; ++i)
          accum += block.fn(i);
      return accum;
  });
}

function bollywood(){
  let source = $("#bollywood-template").html(); 
  let template = Handlebars.compile(source);
  $.ajax({
    method:'GET',
    crossDomain: true,
    url :'https://dummycatalog.icflix.io/api/v1/assets/?limit=07&section=bollywood',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'GET,POST,PUT,OPTIONS,DELETE,HEAD',
    },
    ContentType: 'application/json',
    success : function(data) {
      var response = data.results;
      $('.bollywood').html(template({data_resp:response,homepageview:true}));
    }
  });
  Handlebars.registerHelper('times', function(n, block) {
      var accum = '';
      for(var i = 0; i < n; ++i)
          accum += block.fn(i);
      return accum;
  });
}