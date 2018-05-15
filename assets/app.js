$(function () {
	var client = ZAFClient.init();
	client.invoke('resize', { width: '100%', height: '120px' });
	client.get('ticket.requester.id').then(
		function (data) {
			var user_id = data['ticket.requester.id'];
			requestUserInfo(client, user_id);
		});

	client.get('ticket').then(function (data) {
		// showInfo(data);
	});
});

function requestUserInfo(client, id) {
	var settings = {
		url: '/api/v2/users/' + id + '.json',
		type: 'GET',
		dataType: 'json',
	};

	client.request(settings).then(
		function (data) {
			// showInfo(data);
		},
		function (response) {
			showError(response);
		}
	);
}

// function showInfo(data) {
// 	var requester_data = {
// 		'author': data.ticket.comments[0].author.name,
// 		'device': data.ticket.comments[0].channelDisplayInfo.UserComment.device,
// 		'android': data.ticket.comments[0].channelDisplayInfo.UserComment.android_os_version,
// 	};
// 	var source = $("#requester-template").html();
// 	var template = Handlebars.compile(source);
// 	var html = template(requester_data);
// 	$("#content").html(html);
// }

function showError(response) {
	var error_data = {
		'status': response.status,
		'statusText': response.statusText
	};
	var source = $("#error-template").html();
	var template = Handlebars.compile(source);
	var html = template(error_data);
	$("#content").html(html);
}

function formatDate(date) {
	var cdate = new Date(date);
	var options = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};
	date = cdate.toLocaleDateString("en-us", options);
	return date;
}
