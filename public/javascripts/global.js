var playersListData = [];

$(document).ready(function() {
	loadData();

	$('#box').keyup(function(){
	   var valThis = $(this).val();
	   filterTable(valThis);
	});

	$('#playerList table tbody').on('click', 'td a.linkshowplayer', showUserInfo);
});

function populateTable(data){
	var tableContent = '';

	$.each(data, function(){
		tableContent += '<tr>';
		tableContent += '<td><a href="#" class="linkshowplayer" rel="'+ this.player +'" title="Show more details">' + this.player + '</a></td>';
		tableContent += '<td>' + this.nationality + '</td>';
		tableContent += '<td>' + this.birthday + '</td>';
		tableContent += '<td>' + this.caps + '</td>';
		tableContent += '<td>' + this.goals + '</td>';
		tableContent += '</tr>';
	});

	$('#playerList table tbody').html(tableContent);
};

function loadData(){
	$.getJSON('/players/playerslist', function(data){
		playersListData = data;
		populateTable(data);
	});
};

function filterTable(word){
	var arr = $.map(playersListData, function(n) {
		if(n.player.toLowerCase().toLowerCase().indexOf(word) > -1){
			return n;
		}
	});

	populateTable(arr);
};

function showUserInfo(event){
	event.preventDefault();

	var thisPlayerName = $(this).attr('rel');
	var arrayPosition = playersListData.map(function(arrayItem){return arrayItem.player;}).indexOf(thisPlayerName);
	var thisPlayerObject = playersListData[arrayPosition];

	var imgPath = 'https://usercontent.googleapis.com/freebase/v1/image/';

	$('#playerImage').html('<img src="'+imgPath+thisPlayerObject.img+'?maxwidth=225&maxheight=225&mode=fillcropmid" />');
    $('#playerInfoName').text(thisPlayerObject.player);
    $('#playerInfoAge').text(calculateAge(thisPlayerObject.birthday));
    $('#playerInfoPos').text(thisPlayerObject.position);
    $('#playerInfoNumber').text(thisPlayerObject.number);
    $('#playerInfoCaps').text(thisPlayerObject.caps+" ("+thisPlayerObject.goals+")");
    $('#playerInfoClub').text(thisPlayerObject.club);
    $('#playerInfoNationality').text(thisPlayerObject.nationality);

    if(thisPlayerObject.website === undefined){ 
    	$('#playerInfoWebsite').hide();
    	$("#playerInfoWebsite").prev().hide();
    } else {
    	$('#playerInfoWebsite').show();
    	$("#playerInfoWebsite").prev().show();
    	$('#playerInfoWebsite').html('<a href="'+thisPlayerObject.website+'">'+thisPlayerObject.website+'</a>');
    }
   
    if(thisPlayerObject.height === undefined){ 
    	$('#playerInfoHeight').hide();
    	$("#playerInfoHeight").prev().hide();
    } else {
    	$('#playerInfoHeight').show();
    	$("#playerInfoHeight").prev().show();
    	$('#playerInfoHeight').text(thisPlayerObject.height+'m');
    }
   
    if(thisPlayerObject.weight === undefined){ 
    	$('#playerInfoWeight').hide();
    	$("#playerInfoWeight").prev().hide();
    } else {
    	$('#playerInfoWeight').show();
    	$("#playerInfoWeight").prev().show();
    	$('#playerInfoWeight').text(thisPlayerObject.weight+'kg');
    }

    if(thisPlayerObject.info === undefined){ 
    	$('#playerInfoDescription').hide();
    	$("#playerInfoDescription").prev().hide();
    } else {
    	$('#playerInfoDescription').show();
    	$("#playerInfoDescription").prev().show();
    	$('#playerInfoDescription').text(thisPlayerObject.info);
    }
    
};

function calculateAge(date){
    var now = new Date();
    var birthday = date.split("/");
    var diff = now.getTime() -  new Date(birthday[1]+'/'+birthday[0]+'/'+birthday[2]);

    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};